import * as ng from 'angular';

import { IPost} from '../../../../shared/entities/post';
import { IPostDataService } from '../../../core/post/post.service';
import { PostModel } from '../../../core/post/post.model';
import { MessageBoxController } from '../message-box/message-box.controller';

interface IPostRouteParams extends ng.route.IRouteParamsService {
    id: string;
}

export class PostController {
    static $inject = ['$routeParams', '$uibModal', '$location', 'postDataService'];

    model = new PostModel();

    constructor(
        private $routeParams: IPostRouteParams,
        private $uibModal: ng.ui.bootstrap.IModalService,
        private $location: ng.ILocationService,
        private postDataService: IPostDataService
    ) {
        this.model.postId = $routeParams && $routeParams.id ? Number($routeParams.id) : undefined;
        this.refreshModel();
    }

    private refreshModel() {
        if (this.model.postId !== undefined) {
            let postResource = this.postDataService.getPostResource();
            postResource.get(
                { id: this.model.postId },
                (result: IPost) => {
                    this.model.refreshFrom(result);
                },
                (err) => {
                    MessageBoxController.showError(this.$uibModal, err);
                });
        }
    }

    save(): void {
        let postResource = this.postDataService.getPostResource();
        let post = this.model.saveTo();
        postResource.save({}, post,
            () => {
                this.$location.path('/posts');
            },
            (err) => {
                MessageBoxController.showError(this.$uibModal, err);
            });
    }
};

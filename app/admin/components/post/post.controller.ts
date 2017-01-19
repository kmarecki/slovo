import * as ng from 'angular';

import { IPost } from '../../../../shared/entities/post';
import { IPostDataService } from '../../../core/post/post.service';
import { PostModel } from '../../../core/post/post.model';
import { MessageBoxController } from '../message-box/message-box.controller';

interface IPostRouteParams extends ng.route.IRouteParamsService {
    id: string;
}

export class PostController {
    static $inject = ['$routeParams', '$uibModal', '$state', 'postDataService'];

    model = new PostModel();

    constructor(
        private $routeParams: IPostRouteParams,
        private $uibModal: ng.ui.bootstrap.IModalService,
        private $state: ng.ui.router.IStateService,
        private postDataService: IPostDataService
    ) {
        this.model.postId = $routeParams && $routeParams.id ? Number($routeParams.id) : undefined;
        this.refreshModel();
    }

    private refreshModel() {
        this.postDataService.getPost(
            this.model.postId,
            (post) => {
                this.model.refreshFrom(post);
            },
            (err) => {
                MessageBoxController.showError(this.$uibModal, err);
            });
    }

    save(): void {
        let post = this.model.saveTo();
        this.postDataService.savePost(
            post,
            () => {
                this.$state.go('panel.posts');
            },
            (err) => {
                MessageBoxController.showError(this.$uibModal, err);
            });
    }

    publish(): void {
        this.model.published = true;
        this.save();
    }

    hide(): void {
        this.model.published = false;
        this.save();
    }
};

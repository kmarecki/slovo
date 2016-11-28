import * as ng from 'angular';

import { IPost, IPostDataService } from '../../../core/post/post.service';
import { MessageBoxController } from '../message-box/message-box.controller';

interface IPostRouteParams extends ng.route.IRouteParamsService {
    id: string;
}

export class PostController {
    static $inject = ['$routeParams', '$uibModal', 'postDataService'];

    postId: number;
    title: string;
    text: string;

    constructor(
        private $routeParams: IPostRouteParams,
        private $uibModal: ng.ui.bootstrap.IModalService,
        private postDataService: IPostDataService
    ) {
        this.postId = $routeParams && $routeParams.id ? Number($routeParams.id) : undefined;
        this.refreshModel();
    }

    private refreshModel() {
        let postResource = this.postDataService.getPostResource();
        postResource.get(
            { id: this.postId },
            (result: IPost) => {
                this.title = result.title;
                this.text = result.text;
            },
            (err) => {
                if (this.postId !== undefined) {
                    MessageBoxController.showError(this.$uibModal, err);
                } else {
                    this.title = 'First Title';
                    this.text = 'Bla bla';
                }
            });
    }

    save(): void {
        let postResource = this.postDataService.getPostResource();
        postResource.save({}, this.toModel(), undefined, (err) => {
            MessageBoxController.showError(this.$uibModal, err);
        });
    }

    private toModel(): IPost {
        let model: IPost = {
            postId: this.postId,
            date: new Date(Date.now()),
            text: this.text,
            title: this.title,
        };
        return model;
    }
};

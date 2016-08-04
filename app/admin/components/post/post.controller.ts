import * as ng from 'angular';

import {IPost, PostDataService} from '../../../core/post/post.service';
import {MessageBoxType, MessageBoxController} from '../message-box/message-box.controller';

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
        private postDataService: PostDataService
    ) {
        this.postId = $routeParams && $routeParams.id ? Number($routeParams.id) : undefined;
        this.title = 'First Title';
        this.text = 'Bla bla';
    }

    save(): void {
        let postResource = this.postDataService.getPostResource();
        postResource.save({}, this.toModel(), undefined, (err) => {
            MessageBoxController.show(this.$uibModal, MessageBoxType.Error, 'Error', this.formatError(err));
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

    private formatError(err: any): string {
        return `Status Code ${err.status}: ${err.statusText}<br/>${err.data.error}`;
    }
};

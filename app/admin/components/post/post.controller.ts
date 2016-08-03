import * as ng from 'angular';

import {IPost, PostDataService} from '../../../core/post/post.service';
import {MessageBoxType, MessageBoxController} from '../message-box/message-box.controller';

interface IPostRouteParams extends ng.route.IRouteParamsService {
    id: string;
}

export class PostController {
    static $inject = ['$routeParams', '$uibModal', 'postDataService'];

    id: string;
    title: string;
    text: string;

    constructor(
        private $routeParams: IPostRouteParams,
        private $uibModal: ng.ui.bootstrap.IModalService,
        private postDataService: PostDataService
    ) {
        this.id = $routeParams && $routeParams.id ? $routeParams.id : '0';
        this.title = 'First Title';
        this.text = 'Bla bla';
    }

    save(): void {
        this.title = `${this.title} has been changed`;
        this.text = `${this.text} has been changed`;
        let postResource = this.postDataService.getPostResource();
        postResource.save({}, this, undefined, (err) => {
            MessageBoxController.show(this.$uibModal, MessageBoxType.Error, 'Error', this.formatError(err));
        });
    }

    private formatError(err: any): string {
        return `Status Code ${err.status}: ${err.statusText}<br/>${err.data.error}`;
    }
};

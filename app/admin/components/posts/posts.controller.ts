import * as ng from 'angular';
import * as _ from 'lodash';

import { IPost} from '../../../../shared/entities/post';
import { IPostHeaderResource, PostDataService } from '../../../core/post/post.service';
import { PostsModel } from './posts.model';
import { MessageBoxController } from '../message-box/message-box.controller';

export class PostsController {
    static $inject = ['$uibModal', '$location', 'postDataService'];

    model = new PostsModel();

    constructor(
        private $uibModal: ng.ui.bootstrap.IModalService,
        private $location: ng.ILocationService,
        private postDataService: PostDataService
    ) {
        this.refreshModel();
    }

    private refreshModel() {
        let postHeaderResource = this.postDataService.getPostHeaderResource();
        postHeaderResource.query(
            (headers) => {
                this.model.refreshHeaders(headers);
                let firstHeader = _.first(this.model.headers);
                if (firstHeader) {
                    this.selectPost(firstHeader.postId);
                }
            },
            (err) => MessageBoxController.showError(this.$uibModal, err));
    }

    selectPost(postId: number): void {
        let postResource = this.postDataService.getPostResource();
        postResource.get(
            { id: postId },
            (result: IPost) => {
                this.model.selectPost(result);
            },
            (err) => MessageBoxController.showError(this.$uibModal, err));
    }

    editPost(postId: number): void {
        this.$location.path(`/posts/${postId}`).replace();
    }

    removePost(postId: number): void {
        let postResource = this.postDataService.getPostResource();
        postResource.delete(
            { id: postId },
            (result) => {
                this.refreshModel();
            });
    }
}

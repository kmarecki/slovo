import * as ng from 'angular';
import * as _ from 'lodash';

import { IPost, IPostHeader, IPostHeaderResource, PostDataService } from '../../../core/post/post.service';
import { MessageBoxController } from '../message-box/message-box.controller';

export class PostsController {
    static $inject = ['$uibModal', '$location', 'postDataService'];

    headers: IPostHeader[];
    selectedPost: IPost;

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
                this.headers = headers;
                let firstHeader = _.first(this.headers);
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
            (result) => {
                this.selectedPost = result;
            },
            (err) => MessageBoxController.showError(this.$uibModal, err));
    }

    editPost(postId: number): void {
        this.$location.path(`/post/${postId}`);
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

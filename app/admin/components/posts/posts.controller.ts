import * as ng from 'angular';
import * as _ from 'lodash';

import {IPost, IPostHeader, PostDataService} from '../../../core/post/post.service';
import {MessageBoxController} from '../message-box/message-box.controller';

export class PostsController {
    static $inject = ['$uibModal', 'postDataService'];

    headers: IPostHeader[];
    selectedPost: IPost;

    constructor(
        private $uibModal: ng.ui.bootstrap.IModalService,
        private postDataService: PostDataService
    ) {
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
        let postReasource = this.postDataService.getPostResource();
        postReasource.get(
            { id: postId },
            (result) => {
                this.selectedPost = result;
            },
            (err) => MessageBoxController.showError(this.$uibModal, err));
    }
}

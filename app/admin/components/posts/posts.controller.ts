import * as ng from 'angular';
import * as _ from 'lodash';

import { IPost } from '../../../../shared/entities/post';
import { IPostHeaderResource, IPostDataService } from '../../../core/post/post.service';
import { PostsModel } from './posts.model';
import { MessageBoxController } from '../message-box/message-box.controller';

export class PostsController {
    static $inject = ['$uibModal', '$state', 'postDataService'];

    model = new PostsModel();

    constructor(
        private $uibModal: ng.ui.bootstrap.IModalService,
        private $state: ng.ui.IStateService,
        private postDataService: IPostDataService,
    ) {
        this.refreshModel();
    }

    private refreshModel() {
        this.postDataService.getPostHeaders(false)
            .then((headers) => {
                this.model.refreshHeaders(headers);
                let firstHeader = _.first(this.model.headers);
                if (firstHeader) {
                    this.selectPost(firstHeader.postId);
                }
            })
            .catch((err) => MessageBoxController.showError(this.$uibModal, err));

    }

    selectPost(postId: number): void {
        this.postDataService.getPost(
            postId,
            (result) => {
                this.model.selectPost(result);
            },
            (err) => MessageBoxController.showError(this.$uibModal, err));
    }

    editPost(postId: number): void {
        this.$state.go('panel.posts-edit', { id: postId});
    }

    removePost(postId: number): void {
        this.postDataService.deletePost(
            postId, 
            (result) => {
                this.refreshModel();
            });
    }

    private setPublished(postId, published: boolean): void {
         this.postDataService.getPost(
            postId, 
            (post) => {
                post.published = published;
                this.postDataService.savePost(
                    post,
                    () => {
                        this.refreshModel();
                    },
                    (err) => MessageBoxController.showError(this.$uibModal, err));
            },
            (err) => MessageBoxController.showError(this.$uibModal, err));
    }

    publish(postId: number): void {
        this.setPublished(postId, true);
    }

    hide(postId: number): void {
       this.setPublished(postId, false);
    }

}

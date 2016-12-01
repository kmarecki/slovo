import * as angular from 'angular';
import * as showdown from 'showdown';

import {IPost, PostDataService} from '../../core/post/post.service';
import {PostModel} from '../../core/post/post.model';

export class ArticlesController {
    static $inject = ['postDataService'];

    posts: PostModel[];

    constructor(private postDataService: PostDataService) {
        this.posts = [];
        let postResource = this.postDataService.getPostResource();
         postResource.query((posts: IPost[]) => {
            for (let post of posts) {
                let model = PostModel.toModel(post);
                this.posts.push(model);
            }
        });
    }
}
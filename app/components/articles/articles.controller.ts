import * as angular from 'angular';
import {IPost, PostDataService} from '../../core/post/post.service';

export class ArticlesController {
    static $inject = ['postDataService'];

    posts: IPost[];

    constructor(private postDataService: PostDataService) {
        this.posts = [];
        let postResource = this.postDataService.getPostResource();
         postResource.query((posts: IPost[]) => {
            for (let post of posts) {
                this.posts.push(post);
            }
        });
    }
}
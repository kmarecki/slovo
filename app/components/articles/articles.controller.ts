import * as angular from 'angular';
import * as showdown from 'showdown';

import {IPost, PostDataService} from '../../core/post/post.service';
import {ArticlesModel} from './articles.model';

export class ArticlesController {
    static $inject = ['postDataService'];

    model = new ArticlesModel();

    constructor(private postDataService: PostDataService) {
        this.refreshModel();
    }

    private refreshModel() {
        let postResource = this.postDataService.getPostResource();
            postResource.query((posts: IPost[]) => {
            this.model.refresh(posts);
        });
    }
}
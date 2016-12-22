import * as angular from 'angular';
import * as showdown from 'showdown';

import { IPost } from '../../../shared/entities/post';
import { PostDataService } from '../../core/post/post.service';
import { ArticlesModel } from './articles.model';

export class ArticlesController {
    static $inject = ['postDataService'];

    model = new ArticlesModel();

    constructor(private postDataService: PostDataService) {
        this.refreshModel();
    }

    private refreshModel() {
        let postResource = this.postDataService.getPostResource();
        //TODO Refactor query call to method extending IPostResource
        postResource.query(
            { published: true },
            (posts: IPost[]) => {
                this.model.refresh(posts);
            });
    }
}
import * as angular from 'angular';
import * as showdown from 'showdown';

import { IPost } from '../../../shared/entities/post';
import { IPostDataService } from '../../core/post/post.service';
import { ArticlesModel } from './articles.model';

export class ArticlesController {
    static $inject = ['postDataService'];

    model = new ArticlesModel();

    constructor(private postDataService: IPostDataService) {
        this.refreshModel();
    }

    private refreshModel() {
        this.postDataService.getPosts(true, (posts) => {
            this.model.refresh(posts);
        });
    }
}
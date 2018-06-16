import { IPost } from '@shared/entities/post';
import { IPostDataService } from '@core/post/post.service';
import { ArticlesModel } from './articles.model';

export class ArticlesController {
    static $inject = ['postDataService'];

    model = new ArticlesModel();
    refresh: ng.IPromise<any>;

    constructor(private postDataService: IPostDataService) {
        this.refreshModel();
    }

    private refreshModel(): void {
        this.refresh = this.postDataService.getPosts(true)
            .then((posts) => this.model.refresh(posts));
    }
}
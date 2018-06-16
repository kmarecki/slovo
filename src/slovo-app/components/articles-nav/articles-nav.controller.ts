import { IPostHeader } from '@shared/entities/post';
import { IPostDataService } from '@core/post/post.service';
import { ArticlesNavModel } from './articles-nav.model';
export class ArticlesNavController {
    static $inject = ['postDataService', '$q'];

    model = new ArticlesNavModel();
    refresh: ng.IPromise<any>;

    constructor(
        private postDataService: IPostDataService,
        private $q: ng.IQService) {
        this.refreshModel();
    }

    private refreshModel(): void {
        this.refresh = this.postDataService.getPostHeaders(true)
            .then((headers) => this.model.refresh(headers));
    }
}

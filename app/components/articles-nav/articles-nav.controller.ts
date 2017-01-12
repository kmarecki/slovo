import { IPostHeader } from '../../../shared/entities/post';
import { IPostDataService } from '../../core/post/post.service';
import { ArticlesNavModel } from './articles-nav.model';
export class ArticlesNavController {
    static $inject = ['postDataService'];

    model = new ArticlesNavModel();

    constructor(private postDataService: IPostDataService) {
        this.refreshModel();
    }

    private refreshModel(): void {
        this.postDataService.getPostHeaders(true, (headers) => {
            this.model.refresh(headers);
        });
    }
}

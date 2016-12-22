import { IPostHeader } from '../../../shared/entities/post';
import { PostDataService } from '../../core/post/post.service';
import { ArticlesNavModel } from './articles-nav.model';
export class ArticlesNavController {
    static $inject = ['postDataService'];

    model = new ArticlesNavModel();

    constructor(private postDataService: PostDataService) {
        this.refreshModel();
    }

    private refreshModel(): void {
        let postHeaderResource = this.postDataService.getPostHeaderResource();
        postHeaderResource.query(
            { published: true },
            (headers: IPostHeader[]) => {
                this.model.refresh(headers);
            });
    }
}

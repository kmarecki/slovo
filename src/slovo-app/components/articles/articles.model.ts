import { IPost} from '@shared/entities/post';
import { PostModel } from '@core/post/post.model';

export class ArticlesModel {
    posts: PostModel[];

    refresh(posts: IPost[]): void {
        this.posts = [];
        for (let post of posts) {
            let model = new PostModel();
            model.refreshFrom(post);
            this.posts.push(model);
        }
    }
}
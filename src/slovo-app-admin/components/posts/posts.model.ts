import * as _ from 'lodash';
import { IPost, IPostHeader} from '@shared/entities/post';
import { PostModel, PostHeaderModel } from '@core/post/post.model';

export class PostsModel {
    headers: PostHeaderModel[];
    selectedPost: PostModel;


    refreshHeaders(headers: IPostHeader[]): void {
        this.headers = [];
        for(let header of headers) {
            let model = new PostHeaderModel();
            model.refreshFrom(header);
            this.headers.push(model);
        };
    }

    selectPost(post: IPost): void {
        let model = new PostModel();
        model.refreshFrom(post);
        this.selectedPost = model;
    }
}
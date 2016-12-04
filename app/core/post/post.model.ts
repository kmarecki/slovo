import * as showdown from 'showdown';
import { IPost, IPostHeader} from '../../../shared/entities/post';

export class PostHeaderModel {
    postId: number;
    date: string;
    title: string;

    refreshFrom(header: IPostHeader): void {
        this.postId = header.postId;
        this.date = header.date.toString();
        this.title = header.title;
    }
}

export class PostModel {
    postId; number;
    title: string;
    text: string;

    refreshFrom(post: IPost): void {
        this.title = post.title;

        let converter = new showdown.Converter();
        this.text = converter.makeHtml(post.text);
    }

    saveTo(): IPost {
        let post: IPost = {
            postId: this.postId,
            date: new Date(Date.now()),
            text: this.text,
            title: this.title,
        };
        return post;
    }
}
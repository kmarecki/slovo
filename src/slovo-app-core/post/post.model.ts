import * as showdown from 'showdown';
import { IPost, IPostHeader} from '@shared/entities/post';

export class PostHeaderModel {
    postId: number;
    date: string;
    title: string;
    published: boolean;

    refreshFrom(header: IPostHeader): void {
        this.postId = header.postId;
        this.date = header.date.toString();
        this.title = header.title;
        this.published = header.published;
    }
}

export class PostModel {
    postId; number;
    title: string;
    text: string;
    textToDisplay: string;
    published: boolean;

    refreshFrom(post: IPost): void {
        this.title = post.title;
        this.text = post.text;
        this.published = post.published;

        let converter = new showdown.Converter();
        this.textToDisplay = converter.makeHtml(this.text);
    }

    saveTo(): IPost {
        let post: IPost = {
            postId: this.postId,
            date: new Date(Date.now()),
            text: this.text,
            title: this.title,
            published: this.published
        };
        return post;
    }
}
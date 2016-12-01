import * as showdown from 'showdown';
import {IPost} from './post.service';

export class PostModel {
    title: string;
    text: string;

    static toModel(post: IPost) {
        let model = new PostModel();
        model.title = model.title;

        let converter = new showdown.Converter();
        model.text = converter.makeHtml(post.text);
        return model;
    }
}
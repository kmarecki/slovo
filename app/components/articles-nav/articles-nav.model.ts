import { IPostHeader } from '../../core/post/post.service';

export class ArticlesNavModel {
    links: string[];

    refresh(headers: IPostHeader[]): void {
        this.links = [];
        for (let header of headers) {
            this.links.push(`${header.date}: ${header.title}`);
        }
    }
}
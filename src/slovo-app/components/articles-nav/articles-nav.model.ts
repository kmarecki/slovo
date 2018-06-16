import { IPostHeader } from '@shared/entities/post';
import { LinkModel} from '@core/link/link.model';


export class ArticlesNavModel {
    links: LinkModel[];

    refresh(headers: IPostHeader[]): void {
        this.links = [];
        for (let header of headers) {
            let text = `${header.date}: ${header.title}`;
            let href = `#${header.title}`;
            let link = new LinkModel(text, href);
            this.links.push(link);
        }
    }
}
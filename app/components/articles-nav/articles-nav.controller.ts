import {IPostHeader, PostDataService} from '../../core/post/post.service';

export class ArticlesNavController {
    static $inject = ['postDataService'];

    links: string[];

    constructor(private postDataService: PostDataService) {
        this.links = []
        let postHeaderResource = postDataService.getPostHeaderResource();
        postHeaderResource.query((headers: IPostHeader[]) => {
            for (let header of headers) {
                this.links.push(`${header.date}: ${header.title}`);
            }
        });
    }
}

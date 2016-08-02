import * as ng from 'angular';

import {IPost, PostDataService} from '../../../core/post/post.service';

interface IPostRouteParams extends ng.route.IRouteParamsService {
    id: string;
}

export class PostController {
    static $inject = ['$routeParams', 'postDataService'];

    id: string;
    title: string;
    text: string;

    constructor(
        private $routeParams: IPostRouteParams,
        private postDataService: PostDataService
    ) {
        this.id = $routeParams && $routeParams.id ? $routeParams.id : '0';
        this.title = 'First Title';
        this.text = 'Bla bla';
    }

    save(): void {
        this.title = `${this.title} has been changed`;
        this.text = `${this.text} has been changed`;
        let postResource = this.postDataService.getPostResource();
        postResource.save({}, this);
    }
};

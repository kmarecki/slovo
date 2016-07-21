import * as angular from 'angular';
import {ArticlesNavController} from './articles-nav.controller';

// export class ArticlesNavController {
//     links: string[];

//     constructor() {
//         this.links = [ 'June', 'April', 'March', 'January'];
//     }
// }

let module = angular.module('articlesNav', []);

module.component('articlesNav', {
    controller: ArticlesNavController,
    templateUrl: 'components/articles-nav/articles-nav.template.html',
});

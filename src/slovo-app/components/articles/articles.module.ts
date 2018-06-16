import * as angular from 'angular';
import {ArticlesController} from './articles.controller';

const module = angular.module('articles', []);
module.component('articles', {
    controller: ArticlesController,
    templateUrl: 'components/articles/articles.template.html',
});
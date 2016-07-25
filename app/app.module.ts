import * as angular from 'angular';
import {AppController} from './app.controller';

let app = angular.module('blogApp', [
    'articles',
    'articlesNav',
    'core.post'
]);
app.controller('AppController', AppController);

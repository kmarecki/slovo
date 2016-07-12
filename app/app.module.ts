import * as angular from 'angular';
import {AppController} from './app.controller';

let app = angular.module('blogApp', [
    'articles',
    'articlesNav',
]);
app.controller('AppController', AppController);

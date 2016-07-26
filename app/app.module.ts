import * as ng from 'angular';
import 'angular-resource';

import {AppController} from './app.controller';

let app = ng.module('blogApp', [
    'articles',
    'articlesNav',
    'core',
]);
app.controller('AppController', AppController);

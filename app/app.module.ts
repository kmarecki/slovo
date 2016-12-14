import * as ng from 'angular';
import 'angular-resource';
import 'angular-sanitize';

import './core/core.module';
import './components/components.module';

import {AppController} from './app.controller';

let app = ng.module('blogApp', [
    'ngSanitize',
    'core',
    'components',
]);
app.component('app', {
    controller: AppController,
    templateUrl: './app.template.html',
});

import * as ng from 'angular';
import 'angular-resource';
import 'angular-sanitize';

import {AppController} from './app.controller';

let module = ng.module('app', []);

module.component('app', {
    controller: AppController,
    templateUrl: 'components/app/app.template.html',
});

import * as ng from 'angular';
import 'angular-resource';

import './core/core.module';
import './components/components.module';

import {AppController} from './app.controller';

let app = ng.module('blogApp', [
    'core',
    'components',
]);
app.controller('AppController', AppController);

import * as ng from 'angular';
import { LoginController } from './login.controller';

let module = ng.module('components.login', []);

module.component('login', {
    controller: LoginController,
    templateUrl: 'components/login/login.template.html',
    
});
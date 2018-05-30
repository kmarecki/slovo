import * as ng from 'angular';
import { SignupController } from './signup.controller';

const module = ng.module('components.signup', []);

module.component('signup', {
    controller: SignupController,
    templateUrl: 'components/signup/signup.template.html',
});
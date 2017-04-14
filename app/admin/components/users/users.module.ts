import * as ng from 'angular';

import { UsersController } from './users.controller';

let module = ng.module('components.users', []);

module.component('users', {
    controller: UsersController,
    templateUrl: 'components/users/users.template.html',
});

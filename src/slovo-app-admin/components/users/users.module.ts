import * as ng from 'angular';

import { UsersController } from './users.controller';

const module = ng.module('components.users', []);

module.component('users', {
    controller: UsersController,
    templateUrl: 'components/users/users.template.html',
});

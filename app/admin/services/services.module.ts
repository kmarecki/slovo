import * as ng from 'angular';

import { AuthService } from './auth.service';
import { UserDataService } from './user.service';

export let module = ng.module('services', []);
module.service('services.auth', AuthService);
module.service('services.user', UserDataService);
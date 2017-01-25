import * as ng from 'angular';

import { AuthService } from './auth.service';

export let module = ng.module('services', []);
module.service('services.auth', AuthService);
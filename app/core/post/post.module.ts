import * as ng from 'angular';

import {PostDataService} from './post.service';

let module = ng.module('core.post', ['ngResource']);
module.service('postDataService', PostDataService);

import * as ng from 'angular';

import './post/post.module';
import './settings/settings.module';

const module = ng.module('core', [
    'core.post', 
    'core.settings'
]);

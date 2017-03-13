import * as ng from 'angular';
import 'angular-resource';
import 'angular-sanitize';

import './core/core.module';
import './components/components.module';

let app = ng.module('siteApp', [
    'ngSanitize',
    'core',
    'components',
]);

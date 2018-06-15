import * as ng from 'angular';

import { TopNavController } from './topnav.controller';

const module = ng.module('components.topnav', []);

module.component('topnav', {
    controller: TopNavController,
    templateUrl: 'components/topnav/topnav.template.html',
});

import * as ng from 'angular';

import { PanelController } from './panel.controller';

const module = ng.module('components.panel', []);

module.component('panel', {
    controller: PanelController,
    templateUrl: 'components/panel/panel.template.html',
});

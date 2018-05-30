import * as ng from 'angular';
import { SettingsController } from './settings.controller';

const module = ng.module('components.settings', []);

module.component('settings', {
    controller: SettingsController,
    templateUrl: 'components/settings/settings.template.html',
});

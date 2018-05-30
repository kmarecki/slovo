import * as ng from 'angular';

import { SettingsDataService } from './settings.service';

const module = ng.module('core.settings', ['ngResource']);
module.service('settingsDataService', SettingsDataService);

import * as ng from 'angular';

export let module = ng.module('components.settings', []);

module.component('settings', {
    templateUrl: 'components/settings/settings.template.html',
});

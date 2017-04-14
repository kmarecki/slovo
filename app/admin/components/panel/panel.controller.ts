import * as ng from 'angular';

export class PanelController {
    static $inject = ['$state']

    constructor(
        private $state: ng.ui.IStateService
    ) {
    }

    public isActive(state: string): boolean {
        return this.$state.current.name.substring(0, state.length) === state;
    }
}
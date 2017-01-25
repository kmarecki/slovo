export class Run {
    static inject = ['$rootScope', '$state', '$stateParams'];

    constructor(
        $rootScope: any, //ng.IRootScopeService,
        $state: ng.ui.IStateProvider,
        $stateParams: ng.ui.IStateParamsService) {

    }
}
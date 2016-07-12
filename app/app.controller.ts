export interface IAppScope extends ng.IScope {
    name: string;
}

export class AppController {
    constructor($scope: IAppScope) {
        $scope.name = 'world2';
    }
}

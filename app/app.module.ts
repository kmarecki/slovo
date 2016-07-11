import * as angular from 'angular';

interface IAppScope extends ng.IScope {
    name: string;
}

class AppController {
    // private $scope: IAppScope;

    constructor($scope: IAppScope) {
        $scope.name = 'world2';
    }
}

let app = angular.module('blogApp', []);
app.controller('AppController', AppController);

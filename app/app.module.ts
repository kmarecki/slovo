import * as angular from 'angular';

interface IAppScope extends ng.IScope {
    name: string;
}

class AppController {
    constructor($scope: IAppScope) {
        $scope.name = 'world2';
    }
}

let app = angular.module('blogApp', []);
app.controller('AppController', AppController);

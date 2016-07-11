import * as angular from 'angular';

interface IAdminScope extends ng.IScope {
    name: string;
}

class AdminController {
    constructor($scope: IAdminScope) {
        $scope.name = 'admin';
    }
}

let app = angular.module('adminApp', []);
app.controller('AdminController', AdminController);

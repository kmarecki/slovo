import * as ng from 'angular';
import 'angular-route';

import '../core/core.module';
import './components/components.module';

interface IAdminScope extends ng.IScope {
    name: string;
}

class AdminController {
    constructor($scope: IAdminScope) {
        $scope.name = 'admin';
    }
}

let app = ng.module('adminApp', [
    'ngRoute',
    'core',
    'components',
]);
app.config(['$routeProvider', '$locationProvider', function (
    $routeProvider: ng.route.IRouteProvider,
    $locationProvider: ng.ILocationProvider) {

    $routeProvider.
        when('/comments', {
            template: '<comments></comments>',
        }).
        when('/posts', {
            template: '<posts></posts>',
        }).
        when('/post', {
            template: '<post></post>',
        }).
        when('/settings', {
            template: '<settings></settings>',
        }).
        when('/users', {
            template: '<users></users>',
        });
    $locationProvider.html5Mode(true);
}]);
app.controller('AdminController', AdminController);

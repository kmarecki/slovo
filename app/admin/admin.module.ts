import * as ng from 'angular';

import 'angular-resource';
import 'angular-route';
import 'angular-sanitize';
import 'angular-ui-bootsrap';

import '../core/core.module';
import './components/components.module';
import './directives/directives.module';

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
    'ngSanitize',
    'ui.bootstrap',
    'core',
    'components',
    'directives',
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
        when('/posts/create', {
            template: '<post></post>',
        }).
        when('/posts/:id', {
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

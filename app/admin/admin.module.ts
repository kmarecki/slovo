import * as ng from 'angular';

import 'angular-resource';
import 'angular-route';
import 'angular-sanitize';
import 'angular-ui-bootsrap';
import 'angular-ui-router';

import '../core/core.module';
import './directives/directives.module';
import './services/services.module';

import './components/components.module';


import { Run } from './run';

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
    'ui.router',
    'core',
    'directives',
    'services',
    'components',
]);
app.config(['$routeProvider', '$locationProvider', '$stateProvider', function (
    $routeProvider: ng.route.IRouteProvider,
    $locationProvider: ng.ILocationProvider,
    $stateProvider: ng.ui.IStateProvider) {

    $stateProvider
        .state('login', {
            url: '/login',
            template: '<login></login>'
        })
        .state('panel', {
            url: '/',
            template: '<panel></panel>'
        })
        .state('panel.comments', {
            url: 'comments',
            template: '<comments></comments>',
        })
        .state('panel.posts', {
            url: 'posts',
            template: '<posts></posts>',
        })
        .state('panel.post-create', {
            url: 'posts/create',
            template: '<post></post>',
        })
        .state('panel.post-edit', {
            url: 'posts/:id',
            template: '<post></post>',
        })
        .state('panel.settings', {
            url: 'settings',
            template: '<settings></settings>',
        })
        .state('panel.users', {
            url: 'users',
            template: '<users></users>',
        });

    $locationProvider.html5Mode(true);
}]);
app.controller('AdminController', AdminController);

//app.run(['$rootScope', '$state', '$stateParams', Run]);



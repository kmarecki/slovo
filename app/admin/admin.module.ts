import * as ng from 'angular';

import 'angular-messages';
import 'angular-resource';
import 'angular-route';
import 'angular-sanitize';
import 'angular-ui-bootstrap';
import 'angular-ui-router';

import '../core/core.module';
import './directives/directives.module';
import './services/services.module';

import './components/components.module';


//import { Run } from './run';
import { IAuthService } from './services/auth.service';

const app = ng.module('adminApp', [
    'ngRoute',
    'ngSanitize',
    'ngMessages',
    'ui.bootstrap',
    'ui.router',
    'core',
    'directives',
    'services',
    'components',
]);

//TODO Move config and run function to seperate classes
app.config(['$routeProvider', '$locationProvider', '$stateProvider', (
    $routeProvider: ng.route.IRouteProvider,
    $locationProvider: ng.ILocationProvider,
    $stateProvider: ng.ui.IStateProvider)  => {

    $stateProvider
        .state('login', {
            url: '/login',
            template: '<login></login>'
        })
        .state('signup', {
            url: '/signup',
            template: '<signup></signup>'
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
        .state('panel.posts-create', {
            url: 'posts/create',
            template: '<post></post>',
        })
        .state('panel.posts-edit', {
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

app.run(['$rootScope', '$state', '$stateParams', 'services.auth', (
        $rootScope: ng.IRootScopeService,
        $state: ng.ui.IStateService,
        $stateParams: ng.ui.IStateParamsService,
        authService: IAuthService) => {
            
        $rootScope.$on('$stateChangeStart', (event, next, nextParams, fromState) => {
            if (!authService.isAuthenticated()) {
                if (next.name !== 'login' && next.name !== 'signup') {
                    event.preventDefault();
                    $state.go('login');
                }
            }
        });
}]);



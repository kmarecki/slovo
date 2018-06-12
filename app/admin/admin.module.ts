import 'jquery';
import 'bootstrap';

import 'angular-messages';
import 'angular-resource';
import 'angular-sanitize';
import 'angular-ui-bootstrap';
import 'angular-ui-router';

import '../core/core.module';
import './directives/directives.module';
import './services/services.module';

import './components/components.module';

import * as ng from 'angular';
import { TransitionService } from '@uirouter/angularjs';

//import { Run } from './run';
import { IAuthService } from './services/auth.service';

const app = ng.module('adminApp', [
    'ngSanitize',
    'ngMessages',
    'ui.bootstrap',
    'ui.router',
    'core',
    'directives',
    'services',
    'components'
]);

//TODO Move config and run function to seperate classes
app.config([
    '$locationProvider',
    '$stateProvider',
    ($locationProvider: ng.ILocationProvider, $stateProvider: ng.ui.IStateProvider) => {
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
                template: '<comments></comments>'
            })
            .state('panel.posts', {
                url: 'posts',
                template: '<posts></posts>'
            })
            .state('panel.posts-create', {
                url: 'posts/create',
                template: '<post></post>'
            })
            .state('panel.posts-edit', {
                url: 'posts/:id',
                template: '<post></post>'
            })
            .state('panel.settings', {
                url: 'settings',
                template: '<settings></settings>'
            })
            .state('panel.users', {
                url: 'users',
                template: '<users></users>'
            });

        $locationProvider.html5Mode(true);
    }
]);

app.run([
    '$transitions',
    ($transitions: TransitionService) => {
        $transitions.onStart({}, (trans) => {
            const authService: IAuthService = trans.injector().get('services.auth');
            if (!authService.isAuthenticated()) {
                const next = trans.to().name;
                if (next !== 'login' && next !== 'signup') {
                    return trans.router.stateService.target('login');
                }
            }
        });
    }
]);

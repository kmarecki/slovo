import * as ng from 'angular';
import 'angular-route';

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
    'components',
]);
app.config(['$routeProvider', function ($routeProvider: ng.route.IRouteProvider) {
    $routeProvider.
        when('/posts', {
            template: '<posts></posts>',
        }).
        when('/post', {
            template: '<post></post>',
        }).
        when('/comments', {
            template: '<comments></comments>',
        }).
        when('/users', {
            template: '<users></users>',
        });
}]);
app.controller('AdminController', AdminController);

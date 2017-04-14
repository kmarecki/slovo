import 'angular';
import 'angular-mocks';
import '../../admin.module';

import { UsersController } from './users.controller';
import { IUser } from '../../../../shared/entities/user';

import * as chai from 'chai';
import * as sinon from 'sinon';
let expect = chai.expect;

describe('users', () => {
    beforeEach(angular.mock.module('adminApp'));

    describe('UsersController', () => {
        let ctrl: UsersController;
        let $scope: ng.IScope;
        let httpLocalBackend: ng.IHttpBackendService;


        beforeEach(angular.mock.inject([
            '$componentController', '$rootScope', '$httpBackend',
            ($componentController, $rootScope, $httpBackend, $state) => {
                ctrl = <UsersController>$componentController('users');
                $scope = $rootScope;
                httpLocalBackend = $httpBackend;
            }]));

        const users = [
            {
                authId: 1,
                authStrategy: 1,
                email: 'xxx@xxx.xx',
                password: '',
                userName: 'Test1',
                userId: 1
            },
            {
                authId: 2,
                authStrategy: 2,
                email: 'yyy@yyy.yy',
                password: '',
                userName: 'Test2',
                userId: 2
            }
        ];

        it('load users', (done) => {
            httpLocalBackend.whenGET('/api/users')
                .respond(users);
            ctrl.refresh
                .then(() => {
                    expect(ctrl.users.length).eq(users.length);
                    expect(ctrl.users[0].userId).eq(users[0].userId);
                    expect(ctrl.users[0].userName).eq(users[0].userName);
                    expect(ctrl.users[0].email).eq(users[0].email);
                    expect(ctrl.users[1].userId).eq(users[1].userId);
                    expect(ctrl.users[1].userName).eq(users[1].userName);
                    expect(ctrl.users[1].email).eq(users[1].email);
                    done();
                })
                .catch((err) => done(err))
            httpLocalBackend.flush();
            $scope.$apply();
        });

    });
});
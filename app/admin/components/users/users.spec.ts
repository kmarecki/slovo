import { UsersController } from './users.controller';
import { IUser } from '../../../../shared/entities/user';

import * as ng from 'angular';
import * as chai from 'chai';
import * as sinon from 'sinon';
let expect = chai.expect;

describe('users', () => {
    beforeEach(ng.mock.module('adminApp'));

    describe('UsersController', () => {
        let ctrl: UsersController;
        let $scope: ng.IScope;
        let httpLocalBackend: ng.IHttpBackendService;


        beforeEach(ng.mock.inject([
            '$componentController', '$rootScope', '$httpBackend',
            ($componentController, $rootScope, $httpBackend) => {
                ctrl = <UsersController>$componentController('users');
                $scope = $rootScope;
                httpLocalBackend = $httpBackend;
            }]));

        afterEach(() => httpLocalBackend.verifyNoOutstandingExpectation(false));

        const users = [
            {
                authId: '1',
                authStrategy: 1,
                email: 'xxx@xxx.xx',
                password: '',
                userName: 'Test1',
                userId: 1
            },
            {
                authId: '2',
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
                    expect(ctrl.readonly).is.true;
                    done();
                })
                .catch((err) => done(err))
            httpLocalBackend.flush();
            $scope.$apply();
        });

        it('select user', (done) => {
            httpLocalBackend.whenGET('/api/users')
                .respond(users);
            ctrl.refresh
                .then(() => {
                    expect(ctrl.selected.userId).eq(users[0].userId);
                    expect(ctrl.selected.userName).eq(users[0].userName);

                    ctrl.selectUser(users[1].userId);

                    expect(ctrl.selected.userId).eq(users[1].userId);
                    expect(ctrl.selected.userName).eq(users[1].userName);
                    expect(ctrl.readonly).is.true;
                    done();
                })
                .catch((err) => done(err))
            httpLocalBackend.flush();
            $scope.$apply();
        });

        it('save selected user', (done) => {

            const modifiedUser = {
                email: 'modified@yyy.yy',
                userName: 'Test2 modified',
                userId: 2
            };

            httpLocalBackend.whenGET('/api/users')
                .respond(users);
            httpLocalBackend.whenPOST('/api/users')
                .respond((method, url, data, headers) => {
                    const posted = <IUser>ng.fromJson(data.toString());
                    expect(posted.userId).eq(modifiedUser.userId);
                    expect(posted.userName).eq(modifiedUser.userName);
                    expect(posted.email).eq(modifiedUser.email);
                    return [201, {}, {}, ''];
                });

            ctrl.refresh
                .then(() => {
                    expect(ctrl.readonly).is.true;
                    ctrl.editUser(modifiedUser.userId);
                    expect(ctrl.readonly).is.false;
                    ctrl.selected.userName = modifiedUser.userName;
                    ctrl.selected.email = modifiedUser.email;
                    return ctrl.saveSelectedUser();
                })
                .then(() => {
                    expect(ctrl.readonly).is.true;
                    done();
                })
                .catch((err) => done(err));

            httpLocalBackend.flush();
            $scope.$apply();
        });

        it('delete user', (done) => {

            httpLocalBackend.whenGET('/api/users')
                .respond(users);
            httpLocalBackend.whenDELETE('/api/users/2')
                .respond(204);

            ctrl.refresh
                .then(() => {
                    expect(ctrl.users.length).eq(users.length);
                    const usersCopy = users.slice();
                    const last = usersCopy.pop();
                    httpLocalBackend.expectGET('/api/users')
                        .respond(usersCopy);
                    return ctrl.removeUser(last.userId);
                })
                .then(() => {
                    expect(ctrl.users.length).eq(users.length - 1);
                    done();
                })
                .catch((err) => done(err));

            httpLocalBackend.expectDELETE('/api/users/2');

            httpLocalBackend.flush();
            $scope.$apply();
        });

        it('new user', (done) => {

            const newUser = {
                email: 'zzzz@zzz.zz',
                userName: 'Test3',
            };
            const newId = 3;

            httpLocalBackend.whenGET('/api/users')
                .respond(users);
            httpLocalBackend.whenPOST('/api/users')
                .respond((method, url, data, headers) => {
                    const posted = <IUser>ng.fromJson(data.toString());
                    expect(posted.userId).is.undefined;
                    expect(posted.userName).eq(newUser.userName);
                    expect(posted.email).eq(newUser.email);

                    const usersCopy = users.slice();
                    usersCopy.push(<any> {
                        userName: newUser.userName,
                        email: newUser.email,
                        userId: newId
                    })
                    httpLocalBackend.expectGET('/api/users')
                        .respond(usersCopy);

                    return [201, {}, {}, ''];
                });

            ctrl.refresh
                .then(() => {
                    expect(ctrl.users.length).eq(users.length);

                    ctrl.newUser();
                    ctrl.selected.userName = newUser.userName;
                    ctrl.selected.email = newUser.email;
                    return ctrl.saveSelectedUser();
                })
                .then(() => {
                    expect(ctrl.users.length).eq(users.length + 1);
                    ctrl.selectUser(newId);
                    expect(ctrl.selected.userName).eq(newUser.userName);
                    expect(ctrl.selected.email).eq(newUser.email);
                    done();
                })
                .catch((err) => done(err));


            httpLocalBackend.flush();
            $scope.$apply();
        });
    });
});
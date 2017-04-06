import 'angular';
import 'angular-mocks';
import '../../admin.module';

import { SignupController } from './signup.controller';
import { IAuthService } from '../../services/auth.service';
import { ISignupRequest, ISignupResponse } from '../../../../shared/contracts/signup';

import * as chai from 'chai';
import * as sinon from 'sinon';
let expect = chai.expect;

describe('signup', () => {
    beforeEach(angular.mock.module('adminApp'));

    describe('SignupController', () => {
        let ctrl: SignupController;
        let $scope: ng.IScope;
        let httpLocalBackend: ng.IHttpBackendService;
        let state: ng.ui.IStateService;
        let authService: IAuthService;

        beforeEach(angular.mock.inject([
            '$componentController', '$rootScope', '$httpBackend', '$state', 'services.auth',
            ($componentController, $rootScope, $httpBackend, $state, _authService_) => {
                ctrl = <SignupController>$componentController('signup');
                $scope = $rootScope;
                httpLocalBackend = $httpBackend;
                state = $state;
                authService = _authService_;
            }]));

        it('signup a new user', (done) => {
            const username = 'Test';
            const password = 'q';
            const email = 'joe@xxx.com';

            httpLocalBackend.whenPOST('/api/signup')
                .respond((method, url, data, headers) => {
                    const request = <ISignupRequest>angular.fromJson(data.toString());
                    expect(request.email).eq(email);
                    expect(request.password).eq(password);
                    expect(request.username).eq(username);
                    const response: ISignupResponse = {
                        success: true,
                        msg: ''
                    }
                    return [200, response, {}, ''];
                });
            const go = sinon.spy(state, 'go');
            ctrl.username = username;
            ctrl.password = password;
            ctrl.email = email;
            ctrl.signup()
                .then(() => {
                    expect(authService.isAuthenticated()).is.false;
                    sinon.assert.calledWith(go, 'login');
                    expect(state.current.name).eq('login');
                    done();
                })
                .catch((err) => done(err));
            httpLocalBackend.flush();
            $scope.$apply();
        });
    });
});
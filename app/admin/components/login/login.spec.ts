import 'angular';
import 'angular-mocks';
import '../../admin.module';

import { LoginController } from './login.controller';
import { IAuthService } from '../../services/auth.service';
import { IAuthenticateRequest, IAuthenticateResponse } from '../../../../shared/contracts/authenticate';

import * as chai from 'chai';
import * as sinon from 'sinon';
let expect = chai.expect;

describe('login', () => {
    beforeEach(angular.mock.module('adminApp'));

    describe('LoginController', () => {
        let ctrl: LoginController;
        let $scope: ng.IScope;
        let httpLocalBackend: ng.IHttpBackendService;
        let state: ng.ui.IStateService;
        let authService: IAuthService;

        beforeEach(angular.mock.inject([
            '$componentController', '$rootScope', '$httpBackend', '$state', 'services.auth', 
            ($componentController, $rootScope, $httpBackend, $state, _authService_) => {
            ctrl = <LoginController>$componentController('login');
            $scope = $rootScope;
            httpLocalBackend = $httpBackend;
            state = $state;
            authService = _authService_;
        }]));

        it('login successfull', (done) => {
            const username = 'Test';
            const password = 'q';

            httpLocalBackend.whenPOST('/api/authenticate')
                .respond((method, url, data, headers) => {
                    const request = <IAuthenticateRequest>angular.fromJson(data.toString());
                    expect(request.password).eq(password);
                    expect(request.username).eq(username);
                    const token = 'qwerty';
                    const response: IAuthenticateResponse = {
                        success: true,
                        msg: '',
                        token: `JWT ${token}`
                    }
                    return [200, response, {}, ''];
                });
            const go = sinon.spy(state, 'go');
            ctrl.username = username;
            ctrl.password = password;
            ctrl.login()
                .then(() => {
                    expect(authService.isAuthenticated()).is.true;
                    sinon.assert.calledWith(go, 'panel');
                    expect(state.current.name).eq('panel');
                    done();
                })
                .catch((err) => done(err));
            httpLocalBackend.flush();
            $scope.$apply();
        });

        it('login failed', (done) => {
            const username = 'Test';
            const password = 'q';

            httpLocalBackend.whenPOST('/api/authenticate')
                .respond((method, url, data, headers) => {
                    const request = <IAuthenticateRequest>angular.fromJson(data.toString());
                    expect(request.password).eq(password);
                    expect(request.username).eq(username);
                    const response: IAuthenticateResponse = {
                        success: false,
                        msg: '',
                        token: ''
                    }
                    return [200, response, {}, ''];
                });
            const go = sinon.spy(state, 'go');
            ctrl.username = username;
            ctrl.password = password;
            ctrl.login()
                .then(() => {
                    expect(authService.isAuthenticated()).is.false;
                    expect(state.current.name).eq('login');
                    done();
                })
                .catch((err) => done(err));
            httpLocalBackend.flush();
            $scope.$apply();
        });
    });
});

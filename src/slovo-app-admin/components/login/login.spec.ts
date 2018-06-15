import { LoginController } from './login.controller';
import { IAuthService } from '@services/auth.service';
import { IAuthenticateRequest, IAuthenticateResponse } from '@shared/contracts/authenticate';

import * as ng from 'angular';
import * as chai from 'chai';
import * as sinon from 'sinon';
let expect = chai.expect;

describe('login', () => {
    beforeEach(ng.mock.module('adminApp'));

    describe('LoginController', () => {
        let ctrl: LoginController;
        let $scope: ng.IScope;
        let httpLocalBackend: ng.IHttpBackendService;
        let state: ng.ui.IStateService;
        let authService: IAuthService;

        beforeEach(ng.mock.inject([
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
                    const request = <IAuthenticateRequest>ng.fromJson(data.toString());
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
                    sinon.assert.calledWith(go, 'panel.posts');
                    expect(state.current.name).eq('panel.posts');
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
                    const request = <IAuthenticateRequest>ng.fromJson(data.toString());
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

import { SettingsController } from './settings.controller';
import { ISettings } from '@shared/entities/settings';

import * as ng from 'angular';
import * as chai from 'chai';
import * as sinon from 'sinon';
let expect = chai.expect;

describe('settings', () => {
    beforeEach(ng.mock.module('adminApp'));

    describe('SettingsController', () => {
        let ctrl: SettingsController;
        let $scope: ng.IScope;
        let httpLocalBackend: ng.IHttpBackendService;
        let state: ng.ui.IStateService;

        beforeEach(ng.mock.inject([
            '$componentController', '$rootScope', '$httpBackend', '$state', 'services.auth',
            ($componentController, $rootScope, $httpBackend, $state, _authService_) => {
                ctrl = <SettingsController>$componentController('settings');
                $scope = $rootScope;
                httpLocalBackend = $httpBackend;
                state = $state;
                sinon.stub(_authService_, 'isAuthenticated').returns(true);
            }]));

        const settings: ISettings = {
            blogDescription: "Some description",
            blogName: "Some name"
        }

        it('load settings', (done) => {
            httpLocalBackend.whenGET('/api/settings')
                .respond(settings);
            ctrl.refresh
                .then(() => {
                    expect(ctrl.settings.blogDescription).eq(settings.blogDescription);
                    expect(ctrl.settings.blogName).eq(settings.blogName);
                    done();
                })
                .catch((err) => done(err))
            httpLocalBackend.flush();
            $scope.$apply();
        });

        const modifiedSettings: ISettings = {
            blogDescription: "Some description modified",
            blogName: "Some name modified"
        }

        it('save settings', (done) => {
            httpLocalBackend.whenGET('/api/settings')
                .respond(settings);
            httpLocalBackend.whenPOST('/api/settings')
                .respond((method, url, data, headers) => {
                    const posted = <ISettings>ng.fromJson(data.toString());
                    expect(posted.blogDescription).eq(modifiedSettings.blogDescription);
                    expect(posted.blogName).eq(modifiedSettings.blogName);
                    return [201, {}, {}, ''];
                });
            const go = sinon.spy(state, 'go');
            ctrl.settings = modifiedSettings;
            ctrl.save()
                .then(() => {
                    sinon.assert.calledWith(go, 'panel.posts');
                    expect(state.current.name).eq('panel.posts');
                    done();
                })
                .catch((err) => done(err));
            httpLocalBackend.flush();
            $scope.$apply();
        });
    });
});

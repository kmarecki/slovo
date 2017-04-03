import 'angular';
import 'angular-mocks';
import 'angular-resource';
import 'angular-ui-bootstrap';
import '../../admin.module';

import { SettingsController } from './settings.controller';
import { ISettings } from '../../../../shared/entities/settings';

import * as chai from 'chai';
let expect = chai.expect;

describe('settings', () => {
    beforeEach(angular.mock.module('adminApp'));

    describe('SettingsController', () => {
        let ctrl: SettingsController;
        let $scope: ng.IScope;
        let httpLocalBackend: ng.IHttpBackendService;

        beforeEach(angular.mock.inject(($componentController, $rootScope, $httpBackend) => {
            ctrl = <SettingsController>$componentController('settings');
            $scope = $rootScope;
            httpLocalBackend = $httpBackend;
        }));

        it('load settings', (done) => {
            const settings: ISettings = {
                blogDescription: "Some description",
                blogName: "Some name"
            }
            httpLocalBackend.whenGET('/api/siteSettings').respond(settings);
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
    });
});

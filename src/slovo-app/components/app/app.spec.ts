import { AppController } from './app.controller';
import { ISettings } from '@shared/entities/settings';

import * as ng from 'angular';
import * as chai from 'chai';
let expect = chai.expect;

describe('articlesNav', () => {

    beforeEach(ng.mock.module('siteApp'));

    describe('AppController', () => {
        let ctrl: AppController;
        let $scope: ng.IScope;
        let httpLocalBackend: ng.IHttpBackendService;


        beforeEach(ng.mock.inject(($componentController, $rootScope, $httpBackend) => {
            ctrl = <AppController>$componentController('app');
            $scope = $rootScope;
            httpLocalBackend = $httpBackend;
        }));

        it('refresh', (done) => {
            const settings: ISettings = {
                blogDescription: "Some description",
                blogName: "Some name"
            }
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
        })

    });
});
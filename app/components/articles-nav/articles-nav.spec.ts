import 'angular';
import 'angular-mocks';
import 'angular-resource';
import '../../site.module';

import { ArticlesNavController } from './articles-nav.controller';
import { IPostHeader } from '../../../shared/entities/post';

import * as chai from 'chai';
let expect = chai.expect;

describe('articlesNav', () => {
    beforeEach(angular.mock.module('siteApp'));
    describe('ArticlesNavController', () => {
        let ctrl: ArticlesNavController;
        let $scope: ng.IScope;
        let httpLocalBackend: ng.IHttpBackendService;


        beforeEach(angular.mock.inject(($componentController, $rootScope, $httpBackend) => {
            ctrl = <ArticlesNavController>$componentController('articlesNav');
            $scope = $rootScope;
            httpLocalBackend = $httpBackend;
        }));

        it('should be 2 links', (done) => {
            const now = new Date();
            const headers: IPostHeader[] = [
                { title: "Title1", postId: 1, date: now, published: true },
                { title: "Title2", postId: 2, date: now, published: true },
            ];
            httpLocalBackend.whenGET('/api/postHeaders?published=true').respond(headers);
            ctrl.refresh
                .then(() => {
                    expect(ctrl.model.links.length).eq(2);
                    expect(ctrl.model.links[0].href).eq(`#${headers[0].title}`);
                    expect(ctrl.model.links[1].href).eq(`#${headers[1].title}`);
                    expect(ctrl.model.links[0].text).eq(`${now}: ${headers[0].title}`);
                    expect(ctrl.model.links[1].text).eq(`${now}: ${headers[1].title}`);
                    done();
                })
                .catch((err) => done(err))
            httpLocalBackend.flush();
            $scope.$apply();
        });
    });
});


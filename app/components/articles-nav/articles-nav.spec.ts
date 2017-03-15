import 'angular';
import 'angular-mocks';
import 'angular-resource';
import '../../core/post/post.module';
import './articles-nav.module';

import { ArticlesNavController } from './articles-nav.controller';
import { IPostHeader } from '../../../shared/entities/post';

describe('articlesNav', () => {
    beforeEach(angular.mock.module('core.post', 'articlesNav'));
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
                    expect(ctrl.model.links.length).toEqual(2);
                    expect(ctrl.model.links[0].href).toEqual(`#${headers[0].title}`);
                    expect(ctrl.model.links[1].href).toEqual(`#${headers[1].title}`);
                    expect(ctrl.model.links[0].text).toEqual(`${now}: ${headers[0].title}`);
                    expect(ctrl.model.links[1].text).toEqual(`${now}: ${headers[1].title}`);
                    done();
                })
                .catch((err) => done.fail(err))
            httpLocalBackend.flush();
            $scope.$apply();
        });
    });
});


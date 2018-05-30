import { ArticlesController } from './articles.controller';
import { IPost } from '../../../shared/entities/post';

import * as ng from 'angular';
import * as chai from 'chai';
let expect = chai.expect;

describe('articlesNav', () => {
    beforeEach(ng.mock.module('siteApp'));

    describe('ArticlesNavController', () => {
        let ctrl: ArticlesController;
        let $scope: ng.IScope;
        let httpLocalBackend: ng.IHttpBackendService;

        beforeEach(ng.mock.inject(($componentController, $rootScope, $httpBackend) => {
            ctrl = <ArticlesController>$componentController('articles');
            $scope = $rootScope;
            httpLocalBackend = $httpBackend;
        }));

        it('should be 2 postss', (done) => {
            const now = new Date();
            const posts: IPost[] = [
                { postId: 1, date: now, published: true, text: "Text1", title:"Title1"},
                { postId: 2, date: now, published: true, text: "Text2", title:"Title2"},
            ];
            httpLocalBackend.whenGET('/api/posts?published=true').respond(posts);
            ctrl.refresh
                .then(() => {
                    expect(ctrl.model.posts.length).eq(2);
                    expect(ctrl.model.posts[0].textToDisplay).eq(`<p>${posts[0].text}</p>`);
                    expect(ctrl.model.posts[1].textToDisplay).eq(`<p>${posts[1].text}</p>`);
                    expect(ctrl.model.posts[0].title).eq(posts[0].title);
                    expect(ctrl.model.posts[1].title).eq(posts[1].title);
                    done();
                })
                .catch((err) => done(err))
            httpLocalBackend.flush();
            $scope.$apply();
        });
    });
});
import 'angular';
import 'angular-mocks';
import 'angular-resource';
import '../../core/post/post.module';
import './articles.module';

import { ArticlesController } from './articles.controller';
import { IPost } from '../../../shared/entities/post';

describe('articlesNav', () => {
    beforeEach(angular.mock.module('core.post', 'articles'));

    describe('ArticlesNavController', () => {
        let ctrl: ArticlesController;
        let $scope: ng.IScope;
        let httpLocalBackend: ng.IHttpBackendService;


        beforeEach(angular.mock.inject(($componentController, $rootScope, $httpBackend) => {
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
                    expect(ctrl.model.posts.length).toEqual(2);
                    expect(ctrl.model.posts[0].textToDisplay).toEqual(`<p>${posts[0].text}</p>`);
                    expect(ctrl.model.posts[1].textToDisplay).toEqual(`<p>${posts[1].text}</p>`);
                    expect(ctrl.model.posts[0].title).toEqual(posts[0].title);
                    expect(ctrl.model.posts[1].title).toEqual(posts[1].title);
                    done();
                })
                .catch((err) => done.fail(err))
            httpLocalBackend.flush();
            $scope.$apply();
        });
    });
});
import 'angular';
import 'angular-mocks';
import 'angular-resource';
import '../../core/post/post.module';
import './articles-nav.module';

import { ArticlesNavController } from './articles-nav.controller';

describe('articlesNav', () => {
    beforeEach(angular.mock.module('core.post', 'articlesNav'));
    describe('ArticlesNavController', () => {
        let ctrl: ArticlesNavController;
        let result: ng.IPromise<any>;
        let $scope: ng.IScope;


        beforeEach(angular.mock.inject(function ($componentController, $rootScope) {
            ctrl = <ArticlesNavController>$componentController('articlesNav');
            $scope = $rootScope;
        }));

        it('should be 4 links', (done) => {
            ctrl.refresh
                .then(() => {
                    expect(ctrl.model.links.length).toEqual(2);
                    done();
                })
                .catch((err) => done.fail(err))
            $scope.$apply();
        });
    });
});


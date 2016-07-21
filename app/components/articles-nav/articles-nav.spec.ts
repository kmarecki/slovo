import 'angular';
import 'angular-mocks';
import  './articles-nav.module';

import {ArticlesNavController} from './articles-nav.controller';

describe('articlesNav', () => {
    beforeEach(angular.mock.module('articlesNav'));
    describe('ArticlesNavController', () => {
        let ctrl: ArticlesNavController;
        
        beforeEach(inject(function ($componentController) {
            ctrl = <ArticlesNavController>$componentController('articlesNav');
        }));

        it('should be 4 links', () => {
            expect(ctrl.links.length).toEqual(4);
        });
    });
});


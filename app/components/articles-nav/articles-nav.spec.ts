import {ArticlesNavController} from './articles-nav.controller.ts';

describe('articlesNav', () => {
    //beforeEach(module('articlesNav'));
    describe('ArticlesNavController', () => {
        let ctrl: ArticlesNavController;

        beforeEach(inject(function ($componentController, _$httpBackend_) {
            let $httpBackend = _$httpBackend_;
            $httpBackend.expectGET('phones/phones.json')
                .respond([{ name: 'Nexus S' }, { name: 'Motorola DROID' }]);

            ctrl = <ArticlesNavController>$componentController('phoneList');
        }));

        it('should be 4 links', () => {
            expect(ctrl.links.length).toEqual(4);
        });
    });
});

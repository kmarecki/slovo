import * as ng from 'angular';

let module = ng.module('components.comments', []);

module.component('comments', {
    templateUrl: 'components/comments/comments.template.html',
});

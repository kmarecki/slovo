import * as ng from 'angular';

let module = ng.module('components.posts', []);

module.component('posts', {
    templateUrl: 'components/posts/posts.template.html',
});

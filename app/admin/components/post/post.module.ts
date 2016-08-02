import * as ng from 'angular';
import {PostController} from './post.controller';

let module = ng.module('components.post', []);

module.component('post', {
    controller: PostController,
    templateUrl: 'components/post/post.template.html',
});

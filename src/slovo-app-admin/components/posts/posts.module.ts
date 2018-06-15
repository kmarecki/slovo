import * as ng from 'angular';
import {PostsController} from './posts.controller';

const module = ng.module('components.posts', []);

module.component('posts', {
    controller: PostsController,
    templateUrl: 'components/posts/posts.template.html',
});

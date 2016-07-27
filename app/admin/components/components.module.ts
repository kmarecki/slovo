import * as ng from 'angular';

import './comments/comments.module';
import './posts/posts.module';
import './post/post.module';
import './settings/settings.module';
import './users/users.module';

ng.module('components', [
    'components.comments',
    'components.posts',
    'components.post',
    'components.settings',
    'components.users',
]);

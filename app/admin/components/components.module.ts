import * as ng from 'angular';

import './comments/comments.module';
import './login/login.module';
import './message-box/message-box.module';
import './posts/posts.module';
import './post/post.module';
import './settings/settings.module';
import './users/users.module';

ng.module('components', [
    'components.comments',
    'components.login',
    'components.messageBox',
    'components.posts',
    'components.post',
    'components.settings',
    'components.users',
]);

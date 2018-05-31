import * as ng from 'angular';

import './app/app.module';
import './comments/comments.module';
import './login/login.module';
import './message-box/message-box.module';
import './panel/panel.module';
import './posts/posts.module';
import './post/post.module';
import './settings/settings.module';
import './signup/signup.module';
import './topnav/topnav.module';
import './users/users.module';

ng.module('components', [
    'components.app',
    'components.comments',
    'components.login',
    'components.messageBox',
    'components.panel',
    'components.posts',
    'components.post',
    'components.settings',
    'components.signup',
    'components.topnav',
    'components.users',
]);

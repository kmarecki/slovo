import * as ng from 'angular';

import './app/app.module';
import './articles/articles.module';
import './articles-nav/articles-nav.module';

const module = ng.module('components', [
    'app',
    'articles',
    'articlesNav',
]);

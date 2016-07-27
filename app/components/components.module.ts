import * as ng from 'angular';

import './articles/articles.module';
import './articles-nav/articles-nav.module';

ng.module('components', [
    'articles',
    'articlesNav',
]);

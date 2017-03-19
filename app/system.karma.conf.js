System.config({
    baseURL: '/',
    defaultJSExtensions: true,
    transpiler: 'none',
    paths: {
        'systemjs': 'app/bower_components/system.js/dist/system.js'
    },
    map: {
         'lodash': 'app/bower_components/lodash/dist/lodash.js',
         'jquery': 'app/bower_components/jquery/dist/jquery.js',
         'angular': 'app/bower_components/angular/angular.js',
         'angular-resource': 'app/bower_components/angular-resource/angular-resource.js',
         'bootsrap': 'app/bower_components/bootstrap/dist/js/bootstrap.js',
         'showdown': 'app/bower_components/showdown/dist/showdown.js',
         'chai' : 'app/bower_components/chai/chai.js',
    },
    meta: {
        'lodash': { format: 'global', exports: '_' },
        'showdown': { format: 'global', exports: 'showdown' },
        'jquery': { format: 'global', exports: 'jquery' },
        'bootsrap': { format: 'global', deps: ['jquery'] },
        'angular': { format: 'global', exports: 'angular' },
        'angular-resource': { format: 'global', deps: ['angular'] },
        'angular-sanitize': { format: 'global', deps: ['angular'] },
        'chai': { format: 'global', exports: 'chai' },
    }
});
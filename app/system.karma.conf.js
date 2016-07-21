System.config({
    baseURL: '/',
    defaultJSExtensions: true,
    transpiler: 'none',
    paths: {
        'systemjs': 'app/bower_components/system.js/dist/system.js'
    },
    map: {
        'jquery': 'bower_components/jquery/dist/jquery.js',
        'angular': 'app/bower_components/angular/angular.js',
        'bootsrap': 'bower_components/bootstrap/dist/js/bootstrap.js',
    },
    meta: {
        'jquery': {
            format: 'global',
            exports: 'jquery'
        },
        'angular': {
            format: 'global',
            exports: 'angular'
        },
        'bootsrap': {
            deps: ['jquery']
        }
    }
});
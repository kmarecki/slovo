System.config({
    baseURL: '/',
    defaultJSExtensions: true,
    transpiler: 'none',
    paths: {
        'systemjs': 'app/bower_components/system.js/dist/system.js'
    },
    map: {
        'jquery': 'app/bower_components/jquery/dist/jquery.js',
        'angular': 'app/bower_components/angular/angular.js',
        'angular-resource': 'app/bower_components/angular-resource/angular-resource.js',            
        'bootsrap': 'app/bower_components/bootstrap/dist/js/bootstrap.js',
    },
    meta: {
        'jquery': { format: 'global', exports: 'jquery' },
        'bootsrap': { format: 'global', deps: ['jquery'] },
        'angular': { format: 'global', exports: 'angular' },
        'angular-resource': { format: 'global', deps: ['angular'] }
    }
});
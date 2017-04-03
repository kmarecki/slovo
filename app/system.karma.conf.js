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
        'angular-messages': 'app/bower_components/angular-messages/angular-messages.js',
        'angular-resource': 'app/bower_components/angular-resource/angular-resource.js',
        'angular-route': 'app/bower_components/angular-route/angular-route.js',
        'angular-sanitize': 'app/bower_components/angular-sanitize/angular-sanitize.js',
        'angular-ui-bootstrap': 'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
        'angular-ui-router': 'app/bower_components/angular-ui-router/release/angular-ui-router.js',
        'bootstrap': 'app/bower_components/bootstrap/dist/js/bootstrap.js',
        'showdown': 'app/bower_components/showdown/dist/showdown.js',
        'chai': 'app/bower_components/chai/chai.js',
    },
    meta: {
        'lodash': { format: 'global', exports: '_' },
        'showdown': { format: 'global', exports: 'showdown' },
        'jquery': { format: 'global', exports: 'jquery' },
        'bootstrap': { format: 'global', deps: ['jquery'] },
        'angular': { format: 'global', exports: 'angular' },
        'angular-messages' : { format: 'global', deps: ['angular'] },
        'angular-resource': { format: 'global', deps: ['angular'] },
        'angular-sanitize': { format: 'global', deps: ['angular'] },
        'angular-ui-bootstrap': { format: 'global', deps: ['angular'] },
        'angular-ui-router': { format: 'global', deps: ['angular'] },
        'chai': { format: 'global', exports: 'chai' },
    }
});
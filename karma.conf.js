function served(pattern) { return { pattern: pattern, included: false, served: true } };
function included(pattern) { return { pattern: pattern, included: true, served: true } };

module.exports = function (config) {
  config.set({

    basePath: './',

    frameworks: ['systemjs', 'mocha'],

    browsers: ['Chrome'],

    files: [

       //included('bower_components/angular/angular.js'),
       //'bower_components/angular/angular.js',
       served('app/**/*.js'),
       'app/components/**/*.spec.js'
      //'components/articles-nav/articles-nav.spec.js'

      //served('components/**/*.js')
      // included('test-config.js')
    ],

    // proxies: {
    //   '/bower_components/': '/base/bower_components/'
    // },

    autoWatch: true,

    plugins: [
      'karma-systemjs',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-mocha'
    ],

    systemjs: {
      configFile: 'app/system.karma.conf.js',
      serveFiles: [
        'app/**/*.js'
      ],
      config: {
        paths: {
         
          'angular-mocks': 'app/bower_components/angular-mocks/angular-mocks.js',
        }
      }
    }
  });
};
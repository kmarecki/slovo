// var tests = Object.keys(window.__karma__.files).filter(function (file) {
//   return (/spec\.js$/).test(file);
// });

// requirejs.config({
//   baseUrl: '/base',
//   paths: {
//     'angular': 'bower_components/angular/angular',
//     'angular-mocks': 'bower_components/angular-mocks/angular-mocks'
//   },
//   shim: {
//     'angular': { exports: 'angular' },
//     'angular-mocks': {
//       deps: [
//         'angular'
//       ]
//     }
//   },

//   // Ask Require.js to load these files (all our tests).
//   deps: ['/base/components/articles-nav/articles-nav.module.js', '/base/components/articles-nav/articles-nav.spec.js'],

//   // Set test to start run once Require.js is done.
//   callback: window.__karma__.start
// });
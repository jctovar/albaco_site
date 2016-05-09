angular.module('starter', ['ui.router', 'ngResource', 'ngSanitize', 'ngMaterial', 'ngAnimate', 'ngAria', 'ui.gravatar', 'main.controllers'])
.config(function( $mdThemingProvider, $mdIconProvider ){
  $mdThemingProvider.theme('default')
            .primaryPalette('deep-purple')
            .warnPalette('pink')
            .accentPalette('green');
})

.run(function ($rootScope) {
  //al cambiar de rutas
  //$rootScope.$on('$routeChangeStart', function() {
      //llamamos a checkStatus, el cual lo hemos definido en la factoria auth
      //la cuál hemos inyectado en la acción run de la aplicación
      //auth.checkStatus();
  //})
})
  
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
 
    $stateProvider
      .state('app',{
          url: '/',
          views: {
              'header': {
                  templateUrl: '/templates/partials/header.html',
                  controller: 'headerCtrl'
              },
              'content': {
                  templateUrl: '/templates/main.html',
                  controller: 'mainCtrl' 
              },
              'footer': {
                  templateUrl: '/templates/partials/footer.html'
              }
          }
      })
      .state('app.dashboard', {
          url: 'dashboard',
          views: {
              'content@': {
                  templateUrl: 'templates/dashboard.html',
                  controller: 'dashboardCtrl'
              }
          }
      })
      .state('app.profile', {
          url: 'profile',
          views: {
              'content@': {
                  templateUrl: 'templates/profile.html',
                  controller: 'profileCtrl'
              }
          }
      })
      .state('app.customers', {
          url: 'customers',
          views: {
              'content@': {
                  templateUrl: 'templates/customers.html',
                  controller: 'customersCtrl'
              }
          }
      })
 
}]);
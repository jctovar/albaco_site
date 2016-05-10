angular.module('starter', ['ui.router', 'ngResource', 'ngSanitize', 'ngMaterial', 'ngAnimate', 'ngAria', 'ui.gravatar', 'main.controllers'])
.config(function( $mdThemingProvider, $mdIconProvider ){
  $mdThemingProvider.theme('default')
            .primaryPalette('deep-purple')
            .warnPalette('pink')
            .accentPalette('green');
})

.config(function () {
  sessionStorage.account_id = 1;
  sessionStorage.profile_id = 1;
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
      .state('app.profiles', {  // listado de usuarios del sistema
          url: 'profiles',
          views: {
              'content@': {
                  templateUrl: 'templates/profiles.html',
                  controller: 'profilesCtrl'
              }
          }
      })
      .state('app.my', {
          url: 'my',
          views: {
              'content@': {
                  templateUrl: 'templates/my.html',
                  controller: 'myCtrl'
              }
          }
      })
      .state('app.password', {
          url: 'password',
          views: {
              'content@': {
                  templateUrl: 'templates/password.html',
                  controller: 'passwordCtrl'
              }
          }
      })
      .state('app.account', {   // datos de la empresa
          url: 'account',
          views: {
              'content@': {
                  templateUrl: 'templates/account.html',
                  controller: 'accountCtrl'
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
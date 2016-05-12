angular.module('starter', ['ui.router', 'ngResource', 'ngSanitize', 'ngMaterial', 'ngMdIcons', 'ngAnimate', 'ngAria', 'ui.gravatar', 'main.controllers'])
.config(function($mdThemingProvider) {
    var customBlueMap = 		$mdThemingProvider.extendPalette('light-blue', {
        'contrastDefaultColor': 'light',
        'contrastDarkColors': ['50'],
        '50': 'ffffff'
    });
    $mdThemingProvider.definePalette('customBlue', customBlueMap);
    $mdThemingProvider.theme('default')
        .primaryPalette('customBlue', {
        'default': '500',
        'hue-1': '50'
        })
        .accentPalette('pink');
    $mdThemingProvider.theme('input', 'default')
            .primaryPalette('grey')
})

.config(function () {
  sessionStorage.account_id = 1;
  sessionStorage.profile_id = 1;
})

.run(function ($rootScope, $state) {
  //al cambiar de rutas
  //$rootScope.$on('$routeChangeStart', function() {
      //llamamos a checkStatus, el cual lo hemos definido en la factoria auth
      //la cuál hemos inyectado en la acción run de la aplicación
      //auth.checkStatus();
  //})
  $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) { 
        console.log(unfoundState.to); // "lazy.state"
        console.log(unfoundState.toParams); // {a:1, b:2}
        console.log(unfoundState.options); // {inherit:false} + default options
    })
})
  
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
     // main start
    $stateProvider
      
      // app start
      .state('app', {
          url: '/app',
          views: {
              'content': { templateUrl: '/templates/partials/app.html', controller: 'menuCtrl' },
              'columnOne@app': { templateUrl: '/templates/invoices.html', controller: 'invoicesCtrl' }
          }
      })
      .state('customers', {
          url: '/customers',
          views: {
              'content': { templateUrl: '/templates/partials/app.html', controller: 'menuCtrl' },
              'columnOne@customers': { templateUrl: '/templates/customers.html', controller: 'customersCtrl' }
          }
      })
      .state('app.profiles', {  // listado de usuarios del sistema
          url: '/app/profiles',
          views: {
              'content@app': {
                  templateUrl: 'templates/profiles.html',
                  controller: 'profilesCtrl'
              }
          }
      })
      .state('app.my', {
          url: '/app/my',
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
      
      .state('app.suppliers', {
          url: 'suppliers',
          views: {
              'content@': {
                  templateUrl: 'templates/suppliers.html',
                  controller: 'suppliersCtrl'
              }
          }
      })
      .state('app.invoices', {
          url: 'invoices',
          views: {
              'content@': {
                  templateUrl: 'templates/invoices.html',
                  controller: 'invoicesCtrl'
              }
          }
      })
      .state('app.categories', {
          url: 'categories',
          views: {
              'content@': {
                  templateUrl: 'templates/categories.html',
                  controller: 'categoriesCtrl'
              }
          }
      })
      .state('app.products', {
          url: 'products',
          views: {
              'content@': {
                  templateUrl: 'templates/products.html',
                  controller: 'productsCtrl'
              }
          }
      })
      .state('main',{
          url: '/',
          views: {
              'header': {
                  templateUrl: '/templates/partials/header.html',
                  controller: 'headerCtrl'
              },
              'content': {
                  templateUrl: '/templates/main.html',
                  controller: 'mainCtrl' 
              }
          }
      })
      .state('login', {
          url: '/login',
          views: {
              'header': {
                  templateUrl: '/templates/partials/header.html',
                  controller: 'headerCtrl'
              },
              'content': {
                  templateUrl: '/templates/login.html',
                  controller: 'loginCtrl' 
              }
          }
      });
 
}]);
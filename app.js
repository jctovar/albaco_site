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
})
  
.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
     // main start
    $stateProvider
      
      // app start
      .state('app.account', {   // datos de la empresa
          url: 'account',
          views: {
              'content@': {
                  templateUrl: 'templates/account.html',
                  controller: 'accountCtrl'
              }
          }
      })
      
      
      .state('app',{
          url: '/',
          views: {
              'content': {
                  templateUrl: '/templates/main/main.html',
                  controller: 'mainCtrl' 
              }
          }
      })
      .state('app.login', {
          url: 'login',
          views: {
              'content@': {
                  templateUrl: 'templates/main/login.html',
                  controller: 'loginCtrl'
              }
          }
      })
      .state('app.signin', {
          url: 'login',
          views: {
              'content@': {
                  templateUrl: 'templates/main/login.html',
                  controller: 'loginCtrl'
              }
          }
      })
      .state('app.about', {
          url: 'about',
          views: {
              'content@': {
                  templateUrl: 'templates/main/about.html'
              }
          }
      })
      .state('app.contact', {
          url: 'contact',
          views: {
              'content@': {
                  templateUrl: 'templates/main/contact.html'
              }
          }
      })
      .state('app.dashboard', {
          url: 'dashboard',
          views: {
              'content@': { templateUrl: '/templates/partials/app.html', controller: 'menuCtrl' },
              'columnOne@app.dashboard': { templateUrl: '/templates/dashboard.html', controller: 'invoicesCtrl' }
          }
      })
      .state('app.customers', {
          url: 'customers',
          views: {
              'content@': { templateUrl: '/templates/partials/app.html', controller: 'menuCtrl' },
              'columnOne@app.customers': { templateUrl: '/templates/customers.html', controller: 'customersCtrl' }
          }
      })
      .state('app.suppliers', {
          url: 'suppliers',
          views: {
              'content@': { templateUrl: '/templates/partials/app.html', controller: 'menuCtrl' },
              'columnOne@app.suppliers': { templateUrl: '/templates/suppliers.html', controller: 'suppliersCtrl' }
          }
      })
      .state('app.profiles', {  // listado de usuarios del sistema
          url: 'profiles',
          views: {
              'content@': { templateUrl: '/templates/partials/app.html', controller: 'menuCtrl' },
              'columnOne@app.profiles': { templateUrl: '/templates/profiles.html', controller: 'profilesCtrl' }
          }
      })
      .state('app.categories', {
          url: 'categories',
          views: {
              'content@': { templateUrl: '/templates/partials/app.html', controller: 'menuCtrl' },
              'columnOne@app.categories': { templateUrl: '/templates/categories.html', controller: 'categoriesCtrl' }
          }
      })
      .state('app.products', {
          url: 'products',
          views: {
              'content@': { templateUrl: '/templates/partials/app.html', controller: 'menuCtrl' },
              'columnOne@app.products': { templateUrl: '/templates/products.html', controller: 'productsCtrl' }
          }
      })
      .state('app.stores', {
          url: 'stores',
          views: {
              'content@': { templateUrl: '/templates/partials/app.html', controller: 'menuCtrl' },
              'columnOne@app.stores': { templateUrl: '/templates/stores.html', controller: 'storesCtrl' }
          }
      })
      .state('app.invoices', {
          url: 'invoices',
          views: {
              'content@': { templateUrl: '/templates/partials/app.html', controller: 'menuCtrl' },
              'columnOne@app.invoices': { templateUrl: '/templates/invoices.html', controller: 'invoicesCtrl' }
          }
      })
      .state('app.my', {
          url: 'my',
          views: {
              'content@': { templateUrl: '/templates/partials/app.html', controller: 'menuCtrl' },
              'columnOne@app.my': { templateUrl: '/templates/my.html', controller: 'myCtrl' }
          }
      })
      .state('app.password', {
          url: 'password',
          views: {
              'content@': { templateUrl: '/templates/partials/app.html', controller: 'menuCtrl' },
              'columnOne@app.password': { templateUrl: '/templates/password.html', controller: 'passwordCtrl' }
          }
      });
});
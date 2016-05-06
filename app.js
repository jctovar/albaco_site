angular.module('starter', ['ngRoute', 'ngResource', 'ngSanitize', 'ngMaterial', 'ngAnimate', 'ngAria', 'ui.gravatar', 'main.controllers'])
  .run(function ($rootScope) {
    //al cambiar de rutas
    $rootScope.$on('$routeChangeStart', function()
    {
        //llamamos a checkStatus, el cual lo hemos definido en la factoria auth
        //la cuál hemos inyectado en la acción run de la aplicación
        //auth.checkStatus();
    })
  })
  
  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
      $routeProvider
        .when('/main', {
          templateUrl: 'templates/main.html',
          controller: 'mainCtrl'
        })   
        .when('/edit/:referenceId', {
          templateUrl: 'templates/edit.html',
          controller: 'editCtrl'
        })
        .when('/login', {
          templateUrl: 'templates/login.html',
          controller: 'loginCtrl'
        })
        .when('/accounts', {
          templateUrl: 'templates/accounts.html',
          controller: 'accountsCtrl'
        })
        .when('/customers', {
          templateUrl: 'templates/customers.html',
          controller: 'customersCtrl'
        })
        .when('/categories', {
          templateUrl: 'templates/categories.html',
          controller: 'categoriesCtrl'
        })
        .when('/products/:categoryId', {
          templateUrl: 'templates/products.html',
          controller: 'productsCtrl'
        }) 
        .otherwise({
          redirectTo: '/',
          templateUrl: 'templates/main.html',
          controller: 'mainCtrl'
        });
  }])
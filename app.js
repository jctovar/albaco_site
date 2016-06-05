angular.module('starter', ['ngRoute', 'ngResource', 'ngSanitize', 'ngAnimate', 'ngMessages', 'ngMaterial', 'ngAnimate', 'ngAria', 'ui.gravatar', 'main.controllers'])

.config(function($mdIconProvider, $mdThemingProvider) {
      // Configure URLs for icons specified by [set:]id.
      $mdIconProvider
          .icon('add', 'img/icons/ic_add_black_24px.svg')
          .icon('more_vert', 'img/icons/ic_more_vert_black_24px.svg')    // Register a specific icon (by name)
          .icon('check', 'img/icons/ic_done_black_24px.svg')
          .icon('arrow_back', 'img/icons/ic_arrow_back_black_24px.svg')
          .icon('search', 'img/icons/ic_search_black_24px.svg')
          .icon('edit', 'img/icons/ic_mode_edit_black_24px.svg')
          .icon('delete', 'img/icons/ic_delete_forever_black_24px.svg')
          .icon('clear', 'img/icons/ic_clear_black_24px.svg')
          .icon('menu', 'img/icons/ic_menu_black_24px.svg')
          .icon('users', 'img/icons/ic_supervisor_account_black_24px.svg')
          .icon('face', 'img/icons/ic_face_black_24px.svg')
          .icon('note', 'img/icons/ic_note_black_24px.svg')
          .icon('dashboard', 'img/icons/ic_dashboard_black_24px.svg')
          .icon('settings', 'img/icons/ic_settings_black_24px.svg')
          .icon('person', 'img/icons/ic_person_black_24px.svg')
          .icon('view_agenda', 'img/icons/ic_view_agenda_black_24px.svg')
          .icon('group', 'img/icons/ic_group_black_24px.svg')
          .icon('off', 'img/icons/ic_highlight_off_black_24px.svg')
          .icon('lock', 'img/icons/ic_lock_black_24px.svg')
          .icon('view_comfy', 'img/icons/ic_view_comfy_black_24px.svg')
          .icon('local_shipping', 'img/icons/ic_local_shipping_black_24px.svg')
          .icon('lock', 'img/icons/ic_lock_black_24px.svg')
          .icon('store', 'img/icons/ic_store_black_24px.svg')
          .icon('receipt', 'img/icons/ic_receipt_black_24px.svg')
          .icon('shopping_cart', 'img/icons/ic_shopping_cart_black_24px.svg')
  })

  .run(function ($rootScope, $location, auth, $http, $templateCache) {
      //al cambiar de rutas
      $rootScope.$on('$routeChangeStart', function()
      {
          //llamamos a checkStatus, el cual lo hemos definido en la factoria auth
          //la cuál hemos inyectado en la acción run de la aplicación
          auth.checkStatus();
      })
      
      $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
          $rootScope.title = current.$$route.title;
      });
      
      // Pre-fetch icons sources by URL and cache in the $templateCache...
      // subsequent $http calls will look there first.
      var urls = ['img/icons/ic_more_vert_black_24px.svg', 'img/icons/ic_mode_edit_black_24px.svg', 'img/icons/ic_delete_forever_black_24px.svg'];
      angular.forEach(urls, function(url) {
        $http.get(url, {cache: $templateCache});
      });
  })

  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
      $routeProvider
        .when('/stocks', {
          title: 'Entradas',
          templateUrl: 'templates/stocks.html',
          controller: 'StocksCtrl'
        })
        .when('/invoices', {
          title: 'Ventas',
          templateUrl: 'templates/invoices/invoices.html',
          controller: 'InvoicesCtrl'
        })
        .when('/invoice', {
          title: 'Nueva venta',
          templateUrl: 'templates/invoices/invoice.html',
          controller: 'AddInvoiceCtrl'
        })
        .when('/invoice/:supplierid', {
          title: 'Editar venta',
          templateUrl: 'templates/invoices/invoice.html',
          controller: 'EditInvoiceCtrl'
        })
        .when('/products', {
          title: 'Productos',
          templateUrl: 'templates/products/products.html',
          controller: 'ProductsCtrl'
        })
        .when('/product', {
          title: 'Nuevo producto',
          templateUrl: 'templates/products/product.html',
          controller: 'AddProductCtrl'
        })
        .when('/product/:productid', {
          title: 'Editar producto',
          templateUrl: 'templates/products/product.html',
          controller: 'EditProductCtrl'
        })
        .when('/suppliers', {
          title: 'Proveedores',
          templateUrl: 'templates/suppliers/suppliers.html',
          controller: 'SuppliersCtrl'
        })
        .when('/supplier', {
          title: 'Nuevo proveedor',
          templateUrl: 'templates/suppliers/supplier.html',
          controller: 'AddSupplierCtrl'
        })
        .when('/supplier/:supplierid', {
          title: 'Editar proveedor',
          templateUrl: 'templates/suppliers/supplier.html',
          controller: 'EditSupplierCtrl'
        })
        .when('/users', {
          title: 'Usuarios',
          templateUrl: 'templates/users/users.html',
          controller: 'UsersCtrl'
        })
        .when('/user', {
          title: 'Nuevo usuario',
          templateUrl: 'templates/users/user.html',
          controller: 'AddUserCtrl'
        })
        .when('/user/:userid', {
          title: 'Editar usuario',
          templateUrl: 'templates/users/user.html',
          controller: 'EditUserCtrl'
        })
        .when('/stores', {
          title: 'Almacenes',
          templateUrl: 'templates/stores/stores.html',
          controller: 'StoresCtrl'
        })
        .when('/store', {
          title: 'Nuevo almacen',
          templateUrl: 'templates/stores/store.html',
          controller: 'AddStoreCtrl'
        })
        .when('/store/:storeid', {
          title: 'Editar almacen',
          templateUrl: 'templates/stores/store.html',
          controller: 'EditStoreCtrl'
        })
        .when('/customers', {
          title: 'Clientes',
          templateUrl: 'templates/customers/customers.html',
          controller: 'CustomersCtrl'
        })
        .when('/customer', {
          title: 'Nuevo cliente',
          templateUrl: 'templates/customers/customer.html',
          controller: 'AddCustomerCtrl'
        })
        .when('/customer/:customerid', {
          title: 'Editar cliente',
          templateUrl: 'templates/customers/customer.html',
          controller: 'EditCustomerCtrl'
        })
        .when('/categories', {
          title: 'Categorías',
          templateUrl: 'templates/categories/categories.html',
          controller: 'CategoriesCtrl'
        })
        .when('/category', {
          title: 'Nuevo cliente',
          templateUrl: 'templates/categories/category.html',
          controller: 'AddCategoryCtrl'
        })
        .when('/category/:categoryid', {
          title: 'Editar cliente',
          templateUrl: 'templates/categories/category.html',
          controller: 'EditCategoryCtrl'
        })
        .when('/dashboard', {
          title: 'Consola',
          templateUrl: 'templates/app/dashboard.html',
          controller: 'DashboardCtrl'
        })
        .when('/my', {
          templateUrl: 'templates/profile.html',
          controller: 'MyCtrl'
        })
        .when('/password', {
          templateUrl: 'templates/password.html',
          controller: 'PasswordCtrl'
        })
        .when('/account', {
          templateUrl: 'templates/account.html',
          controller: 'AccountCtrl'
        })
        .when('/', {
          title: 'Inicio',
          templateUrl: 'templates/main/main.html',
          controller: 'MainCtrl'
        })
        .when('/login', {
          title: 'Autentificación',
          templateUrl: 'templates/main/login.html',
          controller: 'LoginCtrl'
        })
        .when('/about', {
          title: 'Acerca del sitio',
          templateUrl: 'templates/main/about.html'
        })
        .when('/credits', {
          title: 'Creditos',
          templateUrl: 'templates/main/credits.html'
        })
        .when('/contact', {
          title: 'Contacto',
          templateUrl: 'templates/main/contact.html'
        })
        .otherwise({
          redirectTo: '/',
          templateUrl: 'templates/main/main.html',
          controller: 'MainCtrl'
        });
  }])

/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
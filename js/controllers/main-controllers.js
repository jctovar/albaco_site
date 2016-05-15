angular.module('main.controllers', ['ngMessages', 'main.models', 'main.directives', 'base64',  'main.filters'])

.controller('headerCtrl', function ($scope) {
    
})
 
.controller('mainCtrl', function ($scope, $state) {
    $scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };
    
    $scope.go = function (value) {
       console.log(value);
       switch(value) {
            case 'login':
                $state.go('app.login'); 
            case 'signin':
                $state.go('app.signin'); 
       }
    };
})

.controller('menuCtrl', function ($scope, $mdSidenav) {
    $scope.toggleSidenav = function(menuId) {
        $mdSidenav(menuId).toggle();
    };
    $scope.menu = [
    {
      link : '#/dashboard',
      title: 'Panel',
      icon: 'dashboard'
    },
    {
      link : '#/customers',
      title: 'Clientes',
      icon: 'group'
    },
    {
      link : '#/suppliers',
      title: 'Proveedores',
      icon: 'local_shipping'
    },
    {
      link : '#/profiles',
      title: 'Usuarios',
      icon: 'supervisor_account'
    },
    {
      link : '#/stores',
      title: 'Almacenes',
      icon: 'store'
    },
    {
      link : '#/categories',
      title: 'Categorias',
      icon: 'label'
    },
    {
      link : '#/products',
      title: 'Productos',
      icon: 'shopping_cart'
    },
    {
      link : '#/invoices',
      title: 'Notas',
      icon: 'receipt'
    }
  ];
  $scope.admin = [
    {
      link : '#/my',
      title: 'Mi perfil',
      icon: 'face'
    },
    {
      link : '#/password',
      title: 'Contraseña',
      icon: 'lock'
    },
    {
      link : 'showListBottomSheet($event)',
      title: 'Cuenta',
      icon: 'lock'
    }
  ];
})

.controller('dashboardCtrl', function ($scope) {
    
})

.controller('accountCtrl', function ($scope, $state, $stateParams, accounts) {
    var query = accounts.get({ accountid: sessionStorage.account_id }, function () {
        $scope.account = query.accounts[0];
    });
    
    //  save data
    $scope.save = function() {
        accounts.update($scope.account, function() {
            $state.go('app.dashboard'); 
        });
    };
})

.controller('profilesCtrl', function ($scope, profiles) {
    $scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };
    
    var query = profiles.get({ accountid: sessionStorage.account_id }, function () {
        $scope.items = query.profiles;
    });
})

.controller('myCtrl', function ($scope, $state, profiles) {
    var query = profiles.get({ accountid: sessionStorage.account_id, profileid: sessionStorage.profile_id }, function () {
        $scope.profile = query.profiles[0];
    });
    
    //  save data
    $scope.save = function() {
        profiles.update($scope.profile, function() {
            $state.go('app.dashboard'); 
        });
    };
})

.controller('passwordCtrl', function ($scope, $state, profiles) {
    var query = profiles.get({ accountid: sessionStorage.account_id, profileid: sessionStorage.profile_id }, function () {
        $scope.profile = query.profiles[0];
    });
    
    //  save data
    $scope.save = function() {
        $scope.profile.profile_password = $scope.profile.profile_password_1;
        delete $scope.profile.profile_password_1;
        delete $scope.profile.profile_password_2;
        profiles.update($scope.profile, function() {
            $state.go('app.dashboard'); 
        });
    };
})

.controller('customersCtrl', function ($scope, $mdDialog, customers) {
    $scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };
    
    var query = customers.get({ accountid: sessionStorage.account_id }, function () {
        $scope.items = query.customers;
    });
    
    $scope.edit = function (index, ev) {
         var item = $scope.items[index];
         $location.path('/customers/' + item.customer_id)
    };
    
    $scope.enable = function (index, ev) {
         var item = $scope.items[index];
         console.log(item.customer_id);
         
         $mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Editar')
                .textContent(item.customer_name)
                .ariaLabel('Alert Dialog Demo')
                .ok('Got it!')
                .targetEvent(ev)
            );
    };
})

.controller('suppliersCtrl', function ($scope, $mdDialog, suppliers) {
    $scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };
    
    var query = suppliers.get({ accountid: sessionStorage.account_id }, function () {
        $scope.items = query.suppliers;
    });
    
    $scope.edit = function (index, ev) {
         var item = $scope.items[index];
         $location.path('/suppliers/' + item.customer_id)
    };
})

.controller('customerCtrl', function ($scope, $route, $routeParams, $location, customers, discounts) {
    $scope.customer = {};
    $scope.title = "Editar cliente";
    
    var query1 = discounts.get(function () {
        $scope.discounts = query1.discounts;
    });
    //  get customer
    var query2 = customers.get({ id: $routeParams.customerId }, function() {
        $scope.customer = query2.customer[0];
    })
    //  save customer
    $scope.save = function() {
        customers.update($scope.customer, function() {
            $location.path('/customers');
        });
    };
})

.controller('invoicesCtrl', function ($scope, invoices) {
    $scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };
    
    var query = invoices.get({ accountid: sessionStorage.account_id }, function () {
        $scope.items = query.invoices;
    });
})

.controller('storesCtrl', function ($scope, stores) {
    $scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };
    
    var query = stores.get({ accountid: sessionStorage.account_id }, function () {
        $scope.items = query.stores;
    });
})

.controller('invoiceCtrl', function ($scope, invoices, details, pdf_template) {
    var query1 = invoices.get({ id: $routeParams.invoiceId }, function() {
        $scope.invoice = query1.invoice[0];
    })
    
    var query2 = details.get({ id: $routeParams.invoiceId }, function() {
        $scope.items = query2.detail;
    })
    
    var docDefinition = pdf_template('hola');

    $scope.printPdf = function () {
        pdfMake.createPdf(docDefinition).print();
    };
})

.controller('categoriesCtrl', function ($scope, categories) {
    $scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };
      
      var query = categories.get({ accountid: sessionStorage.account_id }, function () {
        $scope.items = query.categories;
    })
})

.controller('productsCtrl', function ($scope, products) {
    $scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };
    
    var query = products.get({ accountid: sessionStorage.account_id }, function () {
        $scope.items = query.products;
    });
})

.controller('stocksCtrl', function ($scope, $route, $routeParams, $location, products) {
    $scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };
    
    var query = products.get({ categoryId: $routeParams.categoryId },function() {
        $scope.items = query.product;
    });
})

.controller('loginCtrl', function ($scope, $state, $stateParams, login) {
}); 
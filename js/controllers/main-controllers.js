angular.module('main.controllers', ['main.auth', 'main.models', 'main.directives', 'base64',  'main.filters'])

.controller('MainCtrl', function ($scope, $location) {
  $scope.openMenu = function ($mdOpenMenu, ev) {
    originatorEv = ev;
    $mdOpenMenu(ev);
  };
  
  $scope.go = function (value) {
       console.log(value);
       switch(value) {
            case 'login':
                $location.path('/login');
            case 'signin':
                $location.path('/login');
       }
    };
  
    $scope.login = function (index) {
        $location.path('/login');
    };
})

.controller('NavCtrl', function ($scope, $location, $mdSidenav) {
    $scope.toggleSidenav = function (menuId) {
      $mdSidenav(menuId).toggle();
    };
})

.controller('BackCtrl', function ($scope, $location, $window) {
    $scope.back = function () {
        $window.history.back();
    }
})

.controller('SideCtrl', function ($scope, $location, navigation, auth) {
    $scope.go = function (route) {
        console.log(route);
        $location.path(route);
    }
    
    $scope.admin = [{link : 'my', title: 'Mi perfil', icon: 'face'},{link : 'password', title: 'Cambiar contraseña', icon: 'lock'},{link : 'account', title: 'Cuenta', icon: 'settings'}];
    
    $scope.logout = function () {
          auth.logout();
    }; 
    
    var query = navigation.get(function () {
        $scope.menu = query.navigation;    
    });
    
    $scope.user_name = sessionStorage.profile_name;
    $scope.user_email = sessionStorage.profile_email;
})

.controller('MenuCtrl', function ($scope) {
    $scope.openMenu = function ($mdOpenMenu, ev) {
        originatorEv = ev;
        $mdOpenMenu(ev);
    };
}) 

.controller('DashboardCtrl', function ($scope) {
       
})

.controller('UsersCtrl', function ($scope, $location, $mdDialog, $mdToast, profiles) {
    $scope.$on('$viewContentLoaded', function ($evt, data) {
        inito();
    });
    
    $scope.clear = function () {
        console.log($scope.searchQuery);
        $scope.searchQuery = '';
    }
    
    $scope.add = function () {
        $location.path('user')
    }
    
    $scope.edit = function (index) {
        $location.path('user/'+ index);
    }
    
    $scope.delete = function(index, ev) {
            var confirm = $mdDialog.confirm()
                .title('Esta seguro de eliminar este registro?')
                .textContent('El registro sera eliminado permanentemente.')
                .ok('Si')
                .cancel('No');
                $mdDialog.show(confirm).then(function() {
                        del(index);
                    }, function() {
                    console.log('You decided to keep your record.')
                });
    };
    
    var del = function (id) {
            profiles.delete({ profileid: id })
            .$promise.then(function (result) {
                inito();
                $mdToast.show($mdToast.simple().textContent('Registro eliminado!'));
            })
            .catch(function(error) {
                $mdToast.show($mdToast.simple().textContent('Ocurrio un error!'));
            });    
    }
    
    var inito = function () {
            $scope.bar = false;
            profiles.get({accountid: sessionStorage.account_id})
            .$promise.then(function (result) {
                $scope.items = result.profiles;
                $scope.bar = !$scope.bar;
            })
            .catch(function(error) {
                $location.path('/login')
            });
    };
})

.controller('AddUserCtrl', function ($scope, $location, $routeParams, $mdToast, profiles) {
    $scope.counter = 0;
    
    $scope.save = function () {  
          if ($scope.counter != 0) {
              $scope.item.account_id = sessionStorage.account_id;
              var result = profiles.save($scope.item, function() {
                  if (result.profiles.affectedRows == 1) {
                      $mdToast.show($mdToast.simple().textContent('Datos guardados!'));
                      $location.path('users')
                  };
              });            
          } else {
              $location.path('users')
          }
    };
    
    $scope.change = function() {
        $scope.counter++;
    }
})

.controller('EditUserCtrl', function ($scope, $location, $routeParams, $mdToast, profiles) {
    $scope.counter = 0;
    
    $scope.save = function () {  
          if ($scope.counter != 0) {
              var result = profiles.update($scope.item, function() {
                  if (result.profiles.affectedRows == 1) {
                      $mdToast.show($mdToast.simple().textContent('Datos guardados!'));
                      $location.path('users')
                  };
              });            
          } else {
              $location.path('users')
          }
    };
    
    $scope.change = function() {
        $scope.counter++;
    };
        
    var query = profiles.get({ accountid: sessionStorage.account_id, profileid: $routeParams.userid }, function () {
        $scope.item = query.profiles[0];    
    });
})

.controller('CustomersCtrl', function ($scope, $location, $mdDialog, $mdToast, customers) {
    $scope.$on('$viewContentLoaded', function ($evt, data) {
        inito();
    });
    
    $scope.clear = function () {
        console.log($scope.searchQuery);
        $scope.searchQuery = '';
    }
    
    $scope.add = function () {
        $location.path('/customer')
    }
    
    $scope.edit = function (index) {
        $location.path('/customer/'+ index);
    }
    
    $scope.delete = function(index, ev) {
            var confirm = $mdDialog.confirm()
                .title('Esta seguro de eliminar este registro?')
                .textContent('El registro sera eliminado permanentemente.')
                .ok('Si')
                .cancel('No');
                $mdDialog.show(confirm).then(function() {
                        del(index);
                    }, function() {
                    console.log('You decided to keep your record.')
                });
    };
    
    var del = function (id) {
            customers.delete({ id: id })
            .$promise.then(function (result) {
                inito();
                $mdToast.show($mdToast.simple().textContent('Registro eliminado!'));
            })
            .catch(function(error) {
                $mdToast.show($mdToast.simple().textContent('Ocurrio un error!'));
            });    
    }
    
    var inito = function () {
            $scope.bar = false;
            customers.get({accountid: sessionStorage.account_id})
            .$promise.then(function (result) {
                $scope.items = result.customers;
                $scope.bar = !$scope.bar;
            })
            .catch(function(error) {
                $location.path('/login')
            });
    };
})

.controller('SuppliersCtrl', function ($scope, $location, $mdDialog, $mdToast, suppliers) {
        $scope.$on('$viewContentLoaded', function ($evt, data) {
        inito();
    });
    
    $scope.clear = function () {
        console.log($scope.searchQuery);
        $scope.searchQuery = '';
    }
    
    $scope.add = function () {
        $location.path('/customer')
    }
    
    $scope.edit = function (index) {
        $location.path('/customer/'+ index);
    }
    
    $scope.delete = function(index, ev) {
            var confirm = $mdDialog.confirm()
                .title('Esta seguro de eliminar este registro?')
                .textContent('El registro sera eliminado permanentemente.')
                .ok('Si')
                .cancel('No');
                $mdDialog.show(confirm).then(function() {
                        del(index);
                    }, function() {
                    console.log('You decided to keep your record.')
                });
    };
    
    var del = function (id) {
            suppliers.delete({ id: id })
            .$promise.then(function (result) {
                inito();
                $mdToast.show($mdToast.simple().textContent('Registro eliminado!'));
            })
            .catch(function(error) {
                $mdToast.show($mdToast.simple().textContent('Ocurrio un error!'));
            });    
    }
    
    var inito = function () {
            $scope.bar = false;
            suppliers.get({accountid: sessionStorage.account_id})
            .$promise.then(function (result) {
                $scope.items = result.suppliers;
                $scope.bar = !$scope.bar;
            })
            .catch(function(error) {
                $location.path('/login')
            });
    };
})

.controller('StoresCtrl', function ($scope, $location, $mdDialog, $mdToast, stores) {
    $scope.$on('$viewContentLoaded', function ($evt, data) {
        inito();
    });
    
    $scope.clear = function () {
        console.log($scope.searchQuery);
        $scope.searchQuery = '';
    }
    
    $scope.add = function () {
        $location.path('/store')
    }
    
    $scope.edit = function (index) {
        $location.path('/store/'+ index);
    }
    
    $scope.delete = function(index, ev) {
            var confirm = $mdDialog.confirm()
                .title('Esta seguro de eliminar este registro?')
                .textContent('El registro sera eliminado permanentemente.')
                .ok('Si')
                .cancel('No');
                $mdDialog.show(confirm).then(function() {
                        del(index);
                    }, function() {
                    console.log('You decided to keep your record.')
                });
    };
    
    var del = function (id) {
            stores.delete({ storeid: id })
            .$promise.then(function (result) {
                inito();
                $mdToast.show($mdToast.simple().textContent('Registro eliminado!'));
            })
            .catch(function(error) {
                $mdToast.show($mdToast.simple().textContent('Ocurrio un error!'));
            });    
    }
    
    var inito = function () {
            $scope.bar = false;
            stores.get({accountid: sessionStorage.account_id})
            .$promise.then(function (result) {
                $scope.items = result.stores;
                $scope.bar = !$scope.bar;
            })
            .catch(function(error) {
                $location.path('/login')
            });
    };
})

.controller('AddStoreCtrl', function ($scope, $location, $routeParams, $mdToast, stores) {
    $scope.counter = 0;
    
    $scope.save = function () {  
          if ($scope.counter != 0) {
              $scope.item.account_id = sessionStorage.account_id;
              var result = stores.save($scope.item, function() {
                  if (result.stores.affectedRows == 1) {
                      $mdToast.show($mdToast.simple().textContent('Datos guardados!'));
                      $location.path('stores')
                  };
              });            
          } else {
              $location.path('stores')
          }
    };
    
    $scope.change = function() {
        $scope.counter++;
    }
})

.controller('EditStoreCtrl', function ($scope, $location, $routeParams, $mdToast, stores) {
    $scope.counter = 0;
    
    $scope.save = function () {  
          if ($scope.counter != 0) {
              var result = stores.update($scope.item, function() {
                  if (result.stores.affectedRows == 1) {
                      $mdToast.show($mdToast.simple().textContent('Datos guardados!'));
                      $location.path('stores')
                  };
              });            
          } else {
              $location.path('stores')
          }
    };
    
    $scope.change = function() {
        $scope.counter++;
    };
    
    var query = stores.get({ accountid: sessionStorage.account_id, storeid: $routeParams.storeid }, function () {
        $scope.item = query.stores[0];    
    });
})

.controller('CategoriesCtrl', function ($scope, $location, $mdDialog, $mdToast, categories) {
    $scope.$on('$viewContentLoaded', function ($evt, data) {
        inito();
    });
    
    $scope.clear = function () {
        console.log($scope.searchQuery);
        $scope.searchQuery = '';
    }
    
    $scope.add = function () {
        $location.path('/category')
    }
    
    $scope.edit = function (index) {
        $location.path('/category/'+ index);
    }
    
    $scope.delete = function(index, ev) {
            var confirm = $mdDialog.confirm()
                .title('Esta seguro de eliminar este registro?')
                .textContent('El registro sera eliminado permanentemente.')
                .ok('Si')
                .cancel('No');
                $mdDialog.show(confirm).then(function() {
                        del(index);
                    }, function() {
                    console.log('You decided to keep your record.')
                });
    };
    
    var del = function (id) {
            categories.delete({ id: id })
            .$promise.then(function (result) {
                inito();
                $mdToast.show($mdToast.simple().textContent('Registro eliminado!'));
            })
            .catch(function(error) {
                $mdToast.show($mdToast.simple().textContent('Ocurrio un error!'));
            });    
    }
    
    var inito = function () {
            $scope.bar = false;
            categories.get({accountid: sessionStorage.account_id})
            .$promise.then(function (result) {
                $scope.items = result.categories;
                $scope.bar = !$scope.bar;
            })
            .catch(function(error) {
                $location.path('/login')
            });
    };
})

.controller('InvoicesCtrl', function ($scope, $location, $mdDialog, $mdToast, invoices) {
    $scope.$on('$viewContentLoaded', function ($evt, data) {
        inito();
    });
    
    $scope.clear = function () {
        console.log($scope.searchQuery);
        $scope.searchQuery = '';
    }
    
    $scope.add = function () {
        $location.path('/invoice')
    }
    
    $scope.edit = function (index) {
        $location.path('/invoice/'+ index);
    }
    
    $scope.delete = function(index, ev) {
            var confirm = $mdDialog.confirm()
                .title('Esta seguro de eliminar este registro?')
                .textContent('El registro sera eliminado permanentemente.')
                .ok('Si')
                .cancel('No');
                $mdDialog.show(confirm).then(function() {
                        del(index);
                    }, function() {
                    console.log('You decided to keep your record.')
                });
    };
    
    var del = function (id) {
            invoices.delete({ id: id })
            .$promise.then(function (result) {
                inito();
                $mdToast.show($mdToast.simple().textContent('Registro eliminado!'));
            })
            .catch(function(error) {
                $mdToast.show($mdToast.simple().textContent('Ocurrio un error!'));
            });    
    }
    
    var inito = function () {
            $scope.bar = false;
            invoices.get({accountid: sessionStorage.account_id})
            .$promise.then(function (result) {
                $scope.items = result.invoices;
                $scope.bar = !$scope.bar;
            })
            .catch(function(error) {
                $location.path('/login')
            });
    };
})

.controller('ProductsCtrl', function ($scope, $location, $mdDialog, $mdToast, products) {
    $scope.$on('$viewContentLoaded', function ($evt, data) {
        inito();
    });
    
    $scope.clear = function () {
        console.log($scope.searchQuery);
        $scope.searchQuery = '';
    }
    
    $scope.add = function () {
        $location.path('/product')
    }
    
    $scope.edit = function (index) {
        $location.path('/product/'+ index);
    }
    
    $scope.delete = function(index, ev) {
            var confirm = $mdDialog.confirm()
                .title('Esta seguro de eliminar este registro?')
                .textContent('El registro sera eliminado permanentemente.')
                .ok('Si')
                .cancel('No');
                $mdDialog.show(confirm).then(function() {
                        del(index);
                    }, function() {
                    console.log('You decided to keep your record.')
                });
    };
    
    var del = function (id) {
            products.delete({ id: id })
            .$promise.then(function (result) {
                inito();
                $mdToast.show($mdToast.simple().textContent('Registro eliminado!'));
            })
            .catch(function(error) {
                $mdToast.show($mdToast.simple().textContent('Ocurrio un error!'));
            });    
    }
    
    var inito = function () {
            $scope.bar = false;
            products.get({accountid: sessionStorage.account_id})
            .$promise.then(function (result) {
                $scope.items = result.products;
                $scope.bar = !$scope.bar;
            })
            .catch(function(error) {
                $location.path('/login')
            });
    };
})

.controller('StocksCtrl', function ($scope, $location, $mdDialog, $mdToast, stocks) {
    $scope.$on('$viewContentLoaded', function ($evt, data) {
        inito();
    });
    
    $scope.clear = function () {
        console.log($scope.searchQuery);
        $scope.searchQuery = '';
    }
    
    $scope.add = function () {
        $location.path('/stock')
    }
    
    $scope.edit = function (index) {
        $location.path('/stock/'+ index);
    }
    
    $scope.delete = function(index, ev) {
            var confirm = $mdDialog.confirm()
                .title('Esta seguro de eliminar este registro?')
                .textContent('El registro sera eliminado permanentemente.')
                .ok('Si')
                .cancel('No');
                $mdDialog.show(confirm).then(function() {
                        del(index);
                    }, function() {
                    console.log('You decided to keep your record.')
                });
    };
    
    var del = function (id) {
            stocks.delete({ id: id })
            .$promise.then(function (result) {
                inito();
                $mdToast.show($mdToast.simple().textContent('Registro eliminado!'));
            })
            .catch(function(error) {
                $mdToast.show($mdToast.simple().textContent('Ocurrio un error!'));
            });    
    }
    
    var inito = function () {
            $scope.bar = false;
            stocks.get({accountid: sessionStorage.account_id})
            .$promise.then(function (result) {
                $scope.items = result.stocks;
                $scope.bar = !$scope.bar;
            })
            .catch(function(error) {
                $location.path('/login')
            });
    };
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

.controller('stocksCtrl', function ($scope, $route, $routeParams, $location, products) {
    $scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };
    
    var query = products.get({ categoryId: $routeParams.categoryId },function() {
        $scope.items = query.product;
    });
})

.controller('LoginCtrl', function ($scope, $route, $location, auth) { 
    $scope.login = function () {
        auth.login($scope.user_email, $scope.user_password);
    }
})

.controller('accountCtrl', function ($scope, accounts) {
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

.controller('MyCtrl', function ($scope, profiles) {
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

.controller('passwordCtrl', function ($scope, profiles) {
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
}); 
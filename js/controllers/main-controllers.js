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

.controller('NavCtrl', function ($scope, $location, $mdSidenav, auth) {
    $scope.toggleSidenav = function (menuId) {
      $mdSidenav(menuId).toggle();
    };
    
    $scope.openMenu = function ($mdOpenMenu, ev) {
        originatorEv = ev;
        $mdOpenMenu(ev);
    };
    
    $scope.logout = function () {
          auth.logout();
    }; 
    
    $scope.go = function (value) {
        $location.path(value);
    }    
    
    $scope.account_name = sessionStorage.account_name;
    $scope.profile_name = sessionStorage.profile_name;
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
    $scope.account_name = sessionStorage.account_name;
    $scope.account_email = sessionStorage.account_email;
    $scope.profile_name = sessionStorage.profile_name;   
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

.controller('AddUserCtrl', function ($scope, $location, $routeParams, $mdToast, profiles, roles) {
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
    
    var query1 = roles.get(function() {
        $scope.list1 = query1.roles;    
    });
})

.controller('EditUserCtrl', function ($scope, $location, $routeParams, $mdToast, profiles, roles) {
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
    
    var query1 = roles.get(function() {
        $scope.list1 = query1.roles;    
    });
        
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

.controller('AddCustomerCtrl', function ($scope, $location, $routeParams, $mdToast, customers) {
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
    
    var query1 = roles.get(function() {
        $scope.list1 = query1.roles;    
    });
})

.controller('EditCustomerCtrl', function ($scope, $location, $routeParams, $mdToast, customers) {
    $scope.counter = 0;
    
    $scope.save = function () {  
          if ($scope.counter != 0) {
              var result = customers.update($scope.item, function() {
                  if (result.customers.affectedRows == 1) {
                      $mdToast.show($mdToast.simple().textContent('Datos guardados!'));
                      $location.path('customers')
                  };
              });            
          } else {
              $location.path('customers')
          }
    };
    
    $scope.change = function() {
        $scope.counter++;
    };
        
    var query = customers.get({ accountid: sessionStorage.account_id, customerid: $routeParams.customerid }, function () {
        $scope.item = query.customers[0];    
    });
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
        $location.path('supplier')
    }
    
    $scope.edit = function (index) {
        $location.path('supplier/'+ index);
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
            suppliers.delete({ supplierid: id })
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

.controller('AddSupplierCtrl', function ($scope, $location, $routeParams, $mdToast, suppliers) {
    $scope.counter = 0;
    
    $scope.save = function () {  
          if ($scope.counter != 0) {
              $scope.item.account_id = sessionStorage.account_id;
              var result = suppliers.save($scope.item, function() {
                  if (result.suppliers.affectedRows == 1) {
                      $mdToast.show($mdToast.simple().textContent('Datos guardados!'));
                      $location.path('suppliers')
                  };
              });            
          } else {
              $location.path('suppliers')
          }
    };
    
    $scope.change = function() {
        $scope.counter++;
    }
})

.controller('EditSupplierCtrl', function ($scope, $location, $routeParams, $mdToast, suppliers) {
    $scope.counter = 0;
    
    $scope.save = function () {  
          if ($scope.counter != 0) {
              var result = suppliers.update($scope.item, function() {
                  if (result.suppliers.affectedRows == 1) {
                      $mdToast.show($mdToast.simple().textContent('Datos guardados!'));
                      $location.path('suppliers')
                  };
              });            
          } else {
              $location.path('suppliers')
          }
    };
    
    $scope.change = function() {
        $scope.counter++;
    };
    
    var query = suppliers.get({ accountid: sessionStorage.account_id, supplierid: $routeParams.supplierid }, function () {
        $scope.item = query.suppliers[0];    
    });
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
            categories.delete({ categoryid: id })
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

.controller('AddCategoryCtrl', function ($scope, $location, $routeParams, $mdToast, categories) {
    $scope.counter = 0;
    
    $scope.save = function () {  
          if ($scope.counter != 0) {
              $scope.item.account_id = sessionStorage.account_id;
              var result = categories.save($scope.item, function() {
                  if (result.categories.affectedRows == 1) {
                      $mdToast.show($mdToast.simple().textContent('Datos guardados!'));
                      $location.path('categories')
                  };
              });            
          } else {
              $location.path('categories')
          }
    };
    
    $scope.change = function() {
        $scope.counter++;
    }
})

.controller('EditCategoryCtrl', function ($scope, $location, $routeParams, $mdToast, categories) {
    $scope.counter = 0;
    
    $scope.save = function () {  
          if ($scope.counter != 0) {
              var result = categories.update($scope.item, function() {
                  if (result.categories.affectedRows == 1) {
                      $mdToast.show($mdToast.simple().textContent('Datos guardados!'));
                      $location.path('categories')
                  };
              });            
          } else {
              $location.path('categories')
          }
    };
    
    $scope.change = function() {
        $scope.counter++;
    };
    
    var query = categories.get({ accountid: sessionStorage.account_id, categoryid: $routeParams.categoryid }, function () {
        $scope.item = query.categories[0];    
    });
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

.controller('AddProductCtrl', function ($scope, $location, $routeParams, $mdToast, categories, units, products) {
    $scope.counter = 0;
    
    $scope.save = function () {  
          if ($scope.counter != 0) {
              $scope.item.account_id = sessionStorage.account_id;
              var result = products.save($scope.item, function() {
                  if (result.products.affectedRows == 1) {
                      $mdToast.show($mdToast.simple().textContent('Datos guardados!'));
                      $location.path('products')
                  };
              });            
          } else {
              $location.path('products')
          }
    };
    
    $scope.change = function() {
        $scope.counter++;
    }
    
    var query1 = units.get(function () {
        $scope.list1 = query1.units;    
    });
    
    var query2 = categories.get({ accountid: sessionStorage.account_id }, function () {
        $scope.list2 = query2.categories;    
    });
})

.controller('EditProductCtrl', function ($scope, $location, $routeParams, $mdToast, categories, units, products) {
    $scope.counter = 0;
    
    $scope.save = function () {  
          if ($scope.counter != 0) {
              var result = products.update($scope.item, function() {
                  if (result.products.affectedRows == 1) {
                      $mdToast.show($mdToast.simple().textContent('Datos guardados!'));
                      $location.path('products')
                  };
              });            
          } else {
              $location.path('products')
          }
    };
    
    $scope.change = function () {
        $scope.counter++;
    };
    
    var query1 = units.get(function () {
        $scope.list1 = query1.units;    
    });
    
    var query2 = categories.get({ accountid: sessionStorage.account_id }, function () {
        $scope.list2 = query2.categories;    
    });
    
    var query = products.get({ accountid: sessionStorage.account_id, productid: $routeParams.productid }, function () {
        $scope.item = query.products[0];    
    });
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

.controller('AddStockCtrl', function ($scope, $location, $routeParams, $mdToast, categories, units, stocks) {
    $scope.counter = 0;
    
    $scope.save = function () {  
          if ($scope.counter != 0) {
              $scope.item.account_id = sessionStorage.account_id;
              var result = products.save($scope.item, function() {
                  if (result.products.affectedRows == 1) {
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
    
    var query1 = units.get(function () {
        $scope.list1 = query1.units;    
    });
    
    var query2 = categories.get({ accountid: sessionStorage.account_id }, function () {
        $scope.list2 = query2.categories;    
    });
})

.controller('EditStockCtrl', function ($scope, $location, $routeParams, $mdToast, categories, units, stocks) {
    $scope.counter = 0;
    
    $scope.save = function () {  
          if ($scope.counter != 0) {
              var result = stocks.update($scope.item, function() {
                  if (result.stocks.affectedRows == 1) {
                      $mdToast.show($mdToast.simple().textContent('Datos guardados!'));
                      $location.path('products')
                  };
              });            
          } else {
              $location.path('products')
          }
    };
    
    $scope.change = function () {
        $scope.counter++;
    };
    
    var query1 = units.get(function () {
        $scope.list1 = query1.units;    
    });
    
    var query2 = categories.get({ accountid: sessionStorage.account_id }, function () {
        $scope.list2 = query2.categories;    
    });
    
    var query = stocks.get({ accountid: sessionStorage.account_id, stockid: $routeParams.stockid }, function () {
        $scope.item = query.stocks[0];    
    });
})

.controller('LoginCtrl', function ($scope, $route, $location, auth) { 
    $scope.login = function () {
        auth.login($scope.user_username, $scope.user_password);
    }
})

.controller('AccountCtrl', function ($scope, $location, $mdToast, accounts) {
    $scope.counter = 0;
    
    $scope.save = function () {  
          if ($scope.counter != 0) {
              $scope.item.account_id = sessionStorage.account_id;
              var result = accounts.update($scope.item, function() {
                  if (result.accounts.affectedRows == 1) {
                      $mdToast.show($mdToast.simple().textContent('Datos guardados!'));
                      $location.path('dashboard')
                  };
              });            
          } else {
              $location.path('dashboard')
          }
    };
    
    $scope.change = function () {
        $scope.counter++;
    };
    
    var query = accounts.get({ accountid: sessionStorage.account_id }, function () {
        $scope.item = query.accounts[0];
    });
})

.controller('MyCtrl', function ($scope, $location, $mdToast, profiles) {
    $scope.counter = 0;
    
    $scope.save = function () {  
          if ($scope.counter != 0) {
              $scope.item.account_id = sessionStorage.account_id;
              var result = profiles.update($scope.item, function() {
                  if (result.profiles.affectedRows == 1) {
                      $mdToast.show($mdToast.simple().textContent('Datos guardados!'));
                      $location.path('dashboard')
                  };
              });            
          } else {
              $location.path('dashboard')
          }
    };
    
    $scope.change = function () {
        $scope.counter++;
    };
    
    var query = profiles.get({ accountid: sessionStorage.account_id, profileid: sessionStorage.profile_id }, function () {
        $scope.item = query.profiles[0];
    });
})

.controller('PasswordCtrl', function ($scope, $location, $mdToast, profiles) {
    $scope.counter = 0;
    
    $scope.save = function() {
        if ($scope.counter != 0) {
            $scope.item.profile_password = $scope.item.profile_password_1;
            delete $scope.item.profile_password_1;
            delete $scope.item.profile_password_2;
            var result = profiles.update($scope.item, function() {
                  if (result.profiles.affectedRows == 1) {
                      $mdToast.show($mdToast.simple().textContent('Datos guardados!'));
                      $location.path('dashboard')
                  };
            });  
        } else {
              $location.path('dashboard')
        }
    };
    
    $scope.change = function () {
        $scope.counter++;
    };
    
    var query = profiles.get({ accountid: sessionStorage.account_id, profileid: sessionStorage.profile_id }, function () {
        $scope.item = query.profiles[0];
    });
}); 
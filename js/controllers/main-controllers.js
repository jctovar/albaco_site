angular.module('main.controllers', ['main.models', 'main.directives', 'base64',  'main.filters'])

.controller('navCtrl', function ($scope) {
    
})
 
.controller('mainCtrl', function ($scope, $route, $routeParams, $location) {

})

.controller('accountsCtrl', function ($scope, $route, $routeParams, $location, accounts) {
    var query = accounts.get(function() {
        $scope.items = query.accounts;
    });
})

.controller('customersCtrl', function ($scope, $route, $routeParams, $location, customers) {
    var query = customers.get(function() {
        $scope.items = query.customer;
    });
})

.controller('invoicesCtrl', function ($scope, $route, $routeParams, $location, invoices) {
    var query = invoices.get(function() {
        $scope.items = query.invoice;
    });
})

.controller('invoiceCtrl', function ($scope, $route, $routeParams, $location, invoices, details, pdf_template) {
    var query1 = invoices.get({ id: $routeParams.invoiceId }, function() {
        $scope.invoice = query1.invoice[0];
    })
    
    var query2 = details.get({ id: $routeParams.invoiceId }, function() {
        $scope.items = query2.detail;
    })
    
    var docDefinition = pdf_template('hola');

    $scope.printPdf = function() {
        pdfMake.createPdf(docDefinition).print();
    };
})

.controller('categoriesCtrl', function ($scope, $route, $routeParams, $location, categories) {
    $scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };
      
      var query = categories.get(function() {
        $scope.items = query.category;
    })
})

.controller('productsCtrl', function ($scope, $route, $routeParams, $location, products) {
    $scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };
    
    var query = products.get({ categoryId: $routeParams.categoryId }, function () {
        $scope.items = query.product;
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

.controller('loginCtrl', function ($scope, $route, $routeParams, $location) {

}); 
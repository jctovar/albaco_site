angular.module('main.controllers', ['main.models', 'main.directives', 'base64'])

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
    var query = products.get({ categoryId: $routeParams.categoryId },function() {
        $scope.items = query.product;
    });
})

.controller('loginCtrl', function ($scope, $route, $routeParams, $location) {


}); 
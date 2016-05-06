angular.module('main.models', ['ngResource'])
.constant("server_config",{url : "https://goritec.com:3000", key : "84656ca7c7ccc6b44523a18b6bdf94140220bfc8"})

.factory('accounts', function($resource, server_config) {
	return $resource(server_config.url + '/account/:id', { account_key : server_config.key, id : '@_id' },
    {
        'update': { method:'PUT' }
    });
})

.factory('customers', function($resource, server_config) {
	return $resource(server_config.url + '/customer/:id', { account_key : server_config.key, id : '@_id' },
    {
        'update': { method:'PUT' }
    });
})

.factory('invoices', function($resource, server_config) {
	return $resource(server_config.url + '/invoice/:id', { account_key : server_config.key, id : '@_id' },
    {
        'update': { method:'PUT' }
    });
})

.factory('catalogs', function($resource, server_config) {
	return $resource(server_config.url + '/catalog/:id', { account_key : server_config.key, id : '@_id' },
    {
        'update': { method:'PUT' }
    });
})

.factory('products', function($resource, server_config) {
	return $resource(server_config.url + '/product/:categoryId/:productId', { account_key : server_config.key, id : '@_id' },
    {
        'update': { method:'PUT' }
    });
})

.factory('categories', function($resource, server_config) {
	return $resource(server_config.url + '/category/:id', { account_key : server_config.key, id : '@_id' },
    {
        'update': { method:'PUT' }
    });
})

.factory('details', function($resource, server_config) {
	return $resource(server_config.url + '/detail/:id', { account_key : server_config.key, id : '@_id' },
    {
        'update': { method:'PUT' }
    });
})

.factory('units', function($resource, server_config) {
	return $resource(server_config.url + '/unit/:id', { account_key : server_config.key, id : '@_id' },
    {
        'update': { method:'PUT' }
    });
})

.factory('discounts', function($resource, server_config) {
	return $resource(server_config.url + '/discount/:id', { account_key : server_config.key, id : '@_id' },
    {
        'update': { method:'PUT' }
    });
})

.factory('save_items', function(invoice) {
    var interfaz = {
            get: function(invoice_id){
                
                var query = invoice.get({ id: invoice_id });
                query.$promise.then(function(data) {
                    console.log('va.....' + JSON.stringify(data));
                    return {id:1};
                    // Do whatever when the request is finished
                });
            },
            pull: 5
        }     
	return interfaz;
});
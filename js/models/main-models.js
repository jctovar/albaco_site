angular.module('main.models', ['ngResource'])
.constant("server_config",{url : "https://goritec.com:3000", key : "84656ca7c7ccc6b44523a18b6bdf94140220bfc8"})

.factory('login', function($resource, server_config) {
	return $resource(server_config.url + '/login/:id/:password', { account_key : server_config.key, id : '@_id' },
    {
        'update': { method:'PUT' }
    });
})

.factory('navigation', function($resource, server_config) {
	return $resource(server_config.url + '/navigation/:id', { account_key : server_config.key, id : '@_id' },
    {
        'update': { method:'PUT' }
    });
})

.factory('profiles', function($resource, server_config) {
	return $resource(server_config.url + '/profiles/:accountid/:profileid', { account_key : server_config.key, id : '@_id' },
    {
        'update': { method:'PUT' }
    });
})

.factory('accounts', function($resource, server_config) {
	return $resource(server_config.url + '/accounts/:accountid', { account_key : server_config.key, id : '@_id' },
    {
        'update': { method:'PUT' }
    });
})

.factory('customers', function($resource, server_config) {
	return $resource(server_config.url + '/customers/:accountid/:customerid', { account_key : server_config.key, id : '@_id' },
    {
        'update': { method:'PUT' }
    });
})

.factory('suppliers', function($resource, server_config) {
	return $resource(server_config.url + '/suppliers/:accountid/:customerid', { account_key : server_config.key, id : '@_id' },
    {
        'update': { method:'PUT' }
    });
})

.factory('stores', function($resource, server_config) {
	return $resource(server_config.url + '/stores/:accountid/:storeid', { account_key : server_config.key, id : '@_id' },
    {
        'update': { method:'PUT' }
    });
})

.factory('invoices', function($resource, server_config) {
	return $resource(server_config.url + '/invoices/:accountid/:invoiceid', { account_key : server_config.key, id : '@_id' },
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
	return $resource(server_config.url + '/products/:accountid/:produciId', { account_key : server_config.key, id : '@_id' },
    {
        'update': { method:'PUT' }
    });
})

.factory('stocks', function($resource, server_config) {
	return $resource(server_config.url + '/products/:accountid/:produciId', { account_key : server_config.key, id : '@_id' },
    {
        'update': { method:'PUT' }
    });
})

.factory('categories', function($resource, server_config) {
	return $resource(server_config.url + '/categories/:accountid/:categoryid', { account_key : server_config.key, id : '@_id' },
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

.factory('roles', function($resource, server_config) {
	return $resource(server_config.url + '/roles/:id', { account_key : server_config.key, id : '@_id' },
    {
        'update': { method:'PUT' }
    });
})

.factory('pdf_template', function () {
    return function(title) {  
        var template = {
            pageSize: 'LETTER',
            content: [
            {
                text: title
            },
            {
                style: 'items',
                table: {
                widths: ['*', '*', '*'],
                body: [
                    [{text: 'Producto', style: 'header'}, {text: 'Cantidad', style: 'header'},{text: 'Precio', style: 'header'}
                    ],
                    ['Apple', '100 grams', '52'],
                    ['Bananas', '100 grams', '89'],
                    ['Guava', '100 grams', '68'],
                    ['Lemon', '100 grams', '29'],
                    ['Mangos', '100 grams', '60'],
                    ['Orange', '100 grams', '47'],
                    ['Strawberries', '100 grams', '33']
                ]
                }
            },
            {
                text: 'Importe'
            },
            {
                text: 'Importe'
            }
            ],
            styles: {
            header: {
                bold: true,
                color: '#000',
                fontSize: 11
            },
            items: {
                color: '#666',
                fontSize: 10
            }
            }
        };
        
        return template;
    }
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
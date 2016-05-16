angular.module('main.auth', ['ngResource'])

.factory("auth", function($cookies, $cookieStore, $state, login) {
    return{
        login : function(username, password)
        {
            var query = login.get({ id: username, password:  password }, function () {
                if (query.login[0] && query.login[0].account_email) {
                    console.log(query.login[0]);
                    $cookies.username = username,
                    $cookies.password = password;
                    $cookies.accountid = query.login[0].account_id;
                    $cookies.data = query.login[0];
                    //mandamos al dashboard
                    $state.go("/dashboard");
                } else {
                    console.log('error, not found');
                    $state.go("/login");
                }
            });
              
        },
        logout : function()
        {
            //al hacer logout eliminamos la cookie con $cookieStore.remove
            $cookieStore.remove("username"),
            $cookieStore.remove("password");
            //mandamos al login
            $state.go("/");
        },
        checkStatus : function()
        {
            //creamos un array con las rutas que queremos controlar
            var rutasPrivadas = ["/dashboard","/profile","/password","/requests","/bank"];
            console.log('go; ' + $state.go());
            if(this.in_array($state.go(),rutasPrivadas) && typeof($cookies.username) == "undefined")
            {
                $state.go("/login");
            }
            //en el caso de que intente acceder al login y ya haya iniciado sesión lo mandamos a la home
            if(this.in_array($state.go(),["/login"]) && typeof($cookies.username) != "undefined")
            {
                $state.go("/dashboard");
            }
        },
        in_array : function(needle, haystack)
        {
            var key = '';
            for(key in haystack)
            {
                if(haystack[key] == needle)
                {
                    return true;
                }
            }
            return false;
        }
    }
});
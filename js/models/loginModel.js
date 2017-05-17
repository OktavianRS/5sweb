angular.module('model.login', [])
    .service('loginModel', ['url', 'api', 'toast', '$q', '$location', '$sessionStorage',
      function(url, api, toast, $q, $location, $sessionStorage) {
      	this.tryLogin = function(req) {
          api.post(
            url.login,
            req,
            function(res) {
              if (res.status) {
                $sessionStorage.auth_key = res.auth_key;
                $sessionStorage.first_name = res.first_name;
                $sessionStorage.last_name = res.last_name;
                $sessionStorage.role = res.role;
                $location.path('/dashboard');
              } else {
                let errorText = res.msg.password[0] || 'PLease try again';
                toast('error', 'Authentication failed', errorText);
              }
            })
        }

      }])

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
                $location.path('/dashboard');
              } else {
                let errorText = res.msg.password[0] || 'PLease try again';
                toast('error', 'Authentication failed', errorText);
              }
            })
        }

      }])

angular.module('model.login', [])
    .service('loginModel', ['url', 'api', 'toast', '$q', '$location', '$sessionStorage', '$rootScope',
      function(url, api, toast, $q, $location, $sessionStorage, $rootScope) {
      	this.tryLogin = function(req) {
          api.post(
            url.login,
            req,
            function(res) {
              if (res.role === 'user') {
                toast(
                  'error',
                  'Authentication failed',
                  'You do not have permissions, please try to login from mobile app.'
                );
              }
              else if (res.status) {
                  console.log(res, 'res');
                $sessionStorage.auth_key = res.auth_key;
                $sessionStorage.email = res.email;
                $sessionStorage.first_name = res.firstname;
                $sessionStorage.last_name = res.lastname;
                $sessionStorage.role = res.role;
                $sessionStorage.company_id = res.company_id;
                $sessionStorage.user_id = res.id;
                $sessionStorage.critical_edge = res.critical_edge;

                $rootScope.auth_key = res.auth_key;
                $rootScope.email = res.email;
                $rootScope.first_name = res.firstname;
                $rootScope.last_name = res.lastname;
                $rootScope.role = res.role;
                $rootScope.company_id = res.company_id;



                $location.path('/dashboard');
              } else {
                let errorText = res.msg.password[0] || 'PLease try again';
                toast('error', 'Authentication failed', errorText);
              }
            })
        }

      }])

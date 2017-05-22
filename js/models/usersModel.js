angular.module('model.users', [])
    .service('usersModel', ['url', 'api', 'toast', '$q', '$location', '$sessionStorage', '$rootScope',
      function(url, api, toast, $q, $location, $sessionStorage, $rootScope) {

      	this.createUser = function(req, callback) {
          api.post(
            url.createUser,
            req,
            function(res) {
              if (typeof res.created_at !== 'undefined') {
                toast('success', 'Created successfully', '');
                callback();
              } else {
                toast('error', 'Some error occured', 'User not created');
              }
            })
        }

        this.fetchUsers = function(callback) {
          if ($rootScope.role === 'site admin') {
            this.fetchAllUsers(callback);
          } else {
            this.fetchCompanyUsers(undefined, callback);
          }
        }

        this.fetchAllUsers = function(callback) {
          api.get(
            url.fetchUsers,
            {},
            function(res) {
              callback(res);
            })
        }

        this.fetchCompanyUsers = function(company_id = $rootScope.company_id, callback) {
          api.get(
            url.fetchCompanyUsers,
            {company_id},
            function(res) {
              callback(res);
            })
        }

        this.deleteUser = function(req, callback) {
          api.delete(
            url.deleteUser,
            req,
            function() {
              callback();
            }
          );
        }

        this.updateUser = function(req, callback) {
          api.put(
            url.updateUser,
            req,
            function(res) {
              callback();
            }
          );
        }

      }])

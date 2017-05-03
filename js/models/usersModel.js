angular.module('model.users', [])
    .service('usersModel', ['url', 'api', 'toast', '$q', '$location', '$sessionStorage',
      function(url, api, toast, $q, $location, $sessionStorage) {

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
          api.get(
            url.fetchUsers,
            {},
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

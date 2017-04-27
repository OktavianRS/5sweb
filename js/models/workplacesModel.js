angular.module('model.workplaces', [])
    .service('workplacesModel', ['url', 'api', 'toast', '$q', '$location', '$sessionStorage',
      function(url, api, toast, $q, $location, $sessionStorage) {

      	this.createWorkplace = function(req, callback) {
          api.post(
            url.createWorkplace,
            req,
            function(res) {
              if (typeof res.created_at !== 'undefined') {
                toast('success', 'Created successfully', '');
                callback();
              } else {
                toast('error', 'Some error occured', 'workplace not created');
              }
            })
        }

        this.fetchWorkplaces = function(callback) {
          api.get(
            url.fetchWorkplaces,
            {},
            function(res) {
              callback(res);
            })
        }

        this.deleteWorkplace = function(req, callback) {
          api.delete(
            url.deleteWorkplace,
            req,
            function() {
              callback();
            }
          );
        }

        this.updateWorkplace = function(req, callback) {
          api.put(
            url.updateWorkplace,
            req,
            function(res) {
              callback();
            }
          );
        }

      }])

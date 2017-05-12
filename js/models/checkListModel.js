angular.module('model.check', [])
    .service('checkListModel', ['url', 'api', 'toast', '$q', '$location',
      function(url, api, toast, $q, $location) {

      	this.createCheck = function(req, callback) {
          api.post(
            url.createCheck,
            req,
            function(res) {
              if (typeof res.created_at !== 'undefined') {
                toast('success', 'Created successfully', '');
                callback();
              } else {
                toast('error', 'Some error occured', 'Check not created');
              }
            })
        }

        this.fetchChecks = function(callback) {
          api.get(
            url.fetchChecks,
            {},
            function(res) {
              callback(res);
            })
        }

        this.deleteCheck = function(req, callback) {
          api.delete(
            url.deleteCheck,
            req,
            function() {
              callback();
            }
          );
        }

        this.updateCheck = function(req, callback) {
          api.put(
            url.updateCheck,
            req,
            function(res) {
              callback();
            }
          );
        }

      }])

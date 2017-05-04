angular.module('model.audit', [])
    .service('auditModel', ['url', 'api', 'toast', '$q', '$location', '$sessionStorage',
      function(url, api, toast, $q, $location, $sessionStorage) {

      	this.startAudit = function(req, callback) {
          api.post(
            url.startAudit,
            req,
            function(res) {
              if (typeof res.created_at !== 'undefined') {
                toast('success', 'Created successfully', '');
                callback();
              } else {
                toast('error', 'Some error occured', 'Audit not started');
              }
            })
        }

          this.stopAudit = function(req, callback) {
              api.put(
                  url.stopAudit,
                  req,
                  function(res) {
                      callback();
                  }
              );
          }

        this.fetchAudits = function(callback) {
          api.get(
            url.fetchAudits,
            {},
            function(res) {
              callback(res);
            })
        }

        // this.deleteUser = function(req, callback) {
        //   api.delete(
        //     url.deleteUser,
        //     req,
        //     function() {
        //       callback();
        //     }
        //   );
        // }
        //
        // this.updateUser = function(req, callback) {
        //   api.put(
        //     url.updateUser,
        //     req,
        //     function(res) {
        //       callback();
        //     }
        //   );
        // }

      }])

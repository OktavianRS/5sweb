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
              }
               else if (res.errors['There are not criterias in the place']) {
                    toast('error', 'Please, add criterias for workplace on workplace page', '');
                }else {
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

      }])

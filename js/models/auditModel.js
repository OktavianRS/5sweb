angular.module('model.audit', [])
    .service('auditModel', ['url', 'api', 'toast', '$q', '$location', '$sessionStorage', '$rootScope',
      function(url, api, toast, $q, $location, $sessionStorage, $rootScope) {

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
          if ($rootScope.role === 'site admin') {
            this.fetchAllAudits(callback);
          } else {
            this.fetchCompanyAudits(undefined, callback);
          }
        }

        this.fetchAllAudits = function(callback) {
          api.get(
          url.fetchAudits,
          {},
          function(res) {
            callback(res);
          })
        }

        this.fetchCompanyAudits = function(company_id = $rootScope.company_id, callback) {
          api.get(
          url.fetchCompanyAudits,
          {company_id},
          function(res) {
            callback(res);
          })
        }


          this.stopLastAudit = function(req, callback) {
              api.put(
                  url.stopLastAudit,
                  req,
                  function(res) {
                      callback();
                  }
              );
          }

      }])

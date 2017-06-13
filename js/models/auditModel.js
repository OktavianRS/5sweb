angular.module('model.audit', [])
    .service('auditModel', ['url', 'api', 'toast', '$q', '$location', '$sessionStorage', '$rootScope',
      function(url, api, toast, $q, $location, $sessionStorage, $rootScope) {

      	this.startAudit = function(req, callback) {
          api.post(
            url.startAudit,
            req,
            function(res) {
              if (typeof res.created_at !== 'undefined') {
                toast('success', 'Audit started', '');
                callback();
                } else if (
                    typeof res.errors !== 'undefined'
                    && typeof res.errors.name !== 'undefined'
                    && typeof res.errors.name.length !== 'undefined'
                ) {
                toast('error', 'Some error occured', res.errors.name[0]);
              } else if (typeof res.errors !== undefined && typeof res.errors === 'string') {
                toast('error', 'Some error occured', res.errors);
              } else if (typeof res.errors !== undefined && typeof res.errors === 'object') {
                toast('error', res.errors.error, 'Some error occured');
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

        this.fetchAudits = function(callback, req={}) {
          if ($rootScope.role === 'site admin') {
            this.fetchAllAudits(callback, req);
          } else {
            this.fetchCompanyAudits(undefined, callback, req);
          }
        }

        this.fetchAllAudits = function(callback, req) {
          api.get(
          url.fetchAudits,
          req,
          function(res) {
            callback(res);
          })
        }

        this.fetchCompanyAudits = function(company_id = $rootScope.company_id, callback, req={}) {
            req.company_id = company_id;
          api.get(
          url.fetchCompanyAudits,
          req,
          function(res) {
            callback(res);
          })
        }

          this.startLastAudit = function(req, callback) {
              api.post(
                  url.startLastAudit,
                  req,
                  function(res) {
                      if (typeof res.department_id !== 'undefined') {
                          callback(res);
                      }
                      else if (res.errors) {
                          var errors =res.errors;
                          if (typeof errors ===Array) {
                              errors.forEach(function(item) {
                                  toast('error', item, '');
                              });
                          } else {
                              toast('error', errors, '');
                          }
                      }else {
                          toast('error', 'Some error occured', 'Audit not started');
                      }
                  })
          }

          this.fetchAttachments = function(audit_id, callback) {
            api.get(
                url.auditAtachments,
                {audit_id},
                function(res) {
                    callback(res);
                }
            )
          }

          this.fetchDetailes = function(audit_id, callback) {
            api.get(
                url.auditDetails,
                {audit_id},
                function(res) {
                    callback(res);
                }
            )
          }


          this.stopLastAudit = function(req, callback) {
              api.put(
                  url.stopLastAudit,
                  req,
                  function(res) {
                      if (typeof res.department_id !== 'undefined') {
                          toast('success', 'Audit stoped', '');
                          callback();
                      } else if (res.errors) {
                          var errors =res.errors;
                          if (typeof errors ===Array) {
                              errors.forEach(function(item) {
                                  toast('error', item, '');
                              });
                          } else {
                              toast('error', errors, '');
                          }
                      }else {
                          toast('error', 'Some error occured', 'Audit not started');
                      }

                  }
              );
          }

      }])

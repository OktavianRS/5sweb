angular.module('model.companies', [])
    .service('companiesModel', ['url', 'api', 'toast', '$q', '$location', '$sessionStorage',
      function(url, api, toast, $q, $location, $sessionStorage) {

      	this.createCompany = function(req, callback) {
          api.post(
            url.createCompany,
            req,
            function(res) {
              if (typeof res.created_at !== 'undefined') {
                toast('success', 'Created successfully', '');
                callback();
              } else {
                toast('error', 'Some error occured', 'Company not created');
              }
            })
        }

        this.fetchCompanies = function(callback) {
          api.get(
            url.fetchCompanies,
            {},
            function(res) {
              callback(res);
            })
        }

        this.deleteCompany = function(req, callback) {
          api.delete(
            url.deleteCompany,
            req,
            function() {
              callback();
            }
          );
        }

        this.updateCompany = function(req, callback) {
          api.put(
            url.updateCompany,
            req,
            function(res) {
              callback();
            }
          );
        }

      }])

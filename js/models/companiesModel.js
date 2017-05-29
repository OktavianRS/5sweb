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
            function(res) {
              if (typeof res.status) {
                toast('success', 'Deleted successfully', '');
              } else {
                toast('error', 'Some error occured', 'Company not deleted');
              }
              callback();
            }
          );
        }

        this.updateCompany = function(req, callback) {
          api.put(
            url.updateCompany,
            req,
            function(res) {
              if (typeof res.updated_at !== 'undefined') {
                toast('success', 'Updated successfully', '');
                callback();
              } else {
                toast('error', 'Some error occured', 'Company not updated');
              }
              callback();
            }
          );
        }

          this.fetchOneDepartmentList = function(req, callback) {
              api.get(
                  url.fetchOneDepartmentList,
                  req,
                  function(res) {
                      callback(res);
                  })
          }


      }])

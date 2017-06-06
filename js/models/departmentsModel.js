angular.module('model.departments', [])
    .service('departmentsModel', ['url', 'api', 'toast', '$q', '$location', '$sessionStorage', '$rootScope',
      function(url, api, toast, $q, $location, $sessionStorage, $rootScope) {

      	this.createDepartment = function(req, callback) {
          api.post(
            url.createDepartment,
            req,
            function(res) {
              if (typeof res.created_at !== 'undefined') {
                toast('success', 'Created successfully', '');
                callback();
              } else {
                toast('error', 'Some error occured', 'Department not created');
              }
            })
        }

        this.fetchDepartments = function(req, callback) {
          if ($rootScope.role === 'site admin') {
            this.fetchAllDepartments(req, callback);
          } else {
            this.fetchCompanyDepartments(undefined, callback, req);
          }
        }

        this.fetchAllDepartments = function(req, callback) {
          api.get(
          url.fetchDepartments,
          req,
          function(res) {
            callback(res);
          });
        }

        this.fetchCompanyDepartments = function(company_id = $rootScope.company_id, callback, req = {}) {
          params = req;
          params.company_id = company_id;
          api.get(
          url.fetchDepartmentsByCompanyId,
          params,
          function(res) {
            callback(res);
          })
        }


        this.deleteDepartment = function(req, callback) {
          api.delete(
            url.deleteDepartment,
            req,
            function(res) {
              if (typeof res.status) {
                toast('success', 'Deleted successfully', '');
                callback();
              } else {
                toast('error', 'Some error occured', 'Department not deleted');
              }
              callback();
            }
          );
        }

        this.updateDepartment = function(req, callback) {
          api.put(
            url.updateDepartment,
            req,
            function(res) {
              if (typeof res.updated_at !== 'undefined') {
                toast('success', 'Updated successfully', '');
                callback();
              } else {
                toast('error', 'Some error occured', 'Department not updated');
              }
              callback();
            }
          );
        }

          this.fetchPlacesList = function(callback) {
              api.get(
                  url.fetchPlacesList,
                  {},
                  function(res) {
                      callback(res);
                  })
          }

          this.fetchOnePlaceList = function(req, callback) {
              api.get(
                  url.fetchOnePlaceList,
                  req,
                  function(res) {
                      callback(res);
                  })
          }



      }])

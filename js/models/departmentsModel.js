angular.module('model.departments', [])
    .service('departmentsModel', ['url', 'api', 'toast', '$q', '$location', '$sessionStorage',
      function(url, api, toast, $q, $location, $sessionStorage) {

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

        this.fetchDepartments = function(callback) {
          api.get(
            url.fetchDepartments,
            {},
            function(res) {
              callback(res);
            })
        }


        this.deleteDepartment = function(req, callback) {
          api.delete(
            url.deleteDepartment,
            req,
            function() {
              callback();
            }
          );
        }

        this.updateDepartment = function(req, callback) {
          api.put(
            url.updateDepartment,
            req,
            function(res) {
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



      }])

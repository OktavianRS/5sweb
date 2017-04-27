angular.module('model.workplaces', [])
    .service('workplacesModel', ['url', 'api', 'toast', '$q', '$location', '$sessionStorage',
      function(url, api, toast, $q, $location, $sessionStorage) {

      	this.createWorkPlace = function(req, callback) {
          api.post(
            url.createWorkPlace,
            req,
            function(res) {
              if (typeof res.created_at !== 'undefined') {
                toast('success', 'Created successfully', '');
                callback(res);
              } else {
                toast('error', 'Some error occured', 'workplace not created');
              }
            })
        }

        this.fetchWorkPlaces = function(callback) {
          api.get(
            url.fetchWorkPlaces,
            {},
            function(res) {
              callback(res);
            })
        }

        this.deleteWorkPlace = function(req, callback) {
          api.delete(
            url.deleteWorkPlace,
            req,
            function() {
              callback();
            }
          );
        }

        this.updateWorkPlace = function(req, callback) {
          api.put(
            url.updateWorkPlace,
            req,
            function(res) {
              callback();
            }
          );
        }

          this.addCriteriaToWorkPlace = function(req, callback) {
              api.post(
                  url.addCriteriaToWorkPlace,
                  req,
                  function(res) {
                      if (typeof res.created_at !== 'undefined') {
                          // toast('success', 'Created successfully', '');
                          callback();
                      } else {
                          toast('error', 'Some error occured', 'criteria not added to workplace');
                      }
                  })
          }

      }])

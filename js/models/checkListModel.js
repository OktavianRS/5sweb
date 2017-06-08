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
              } else if (
                  typeof res.errors !== 'undefined'
                  && typeof res.errors.name !== 'undefined'
                  && typeof res.errors.name.length !== 'undefined'
              ) {
                toast('error', res.errors.name[0], 'Some error occured');
              } else {
                toast('error', 'Some error occured', 'Check list not created');
              }
            })
        }

        this.fetchChecks = function(callback, req={}) {
          api.get(
            url.fetchChecks,
            req,
            function(res) {
              callback(res);
            })
        }

        this.deleteCheck = function(req, callback) {
          api.delete(
            url.deleteCheck,
            req,
            function(res) {
              if (res.status) {
                toast('success', 'Deleted successfully', '');
                callback();
              } else {
                toast('error', 'Some error occured', 'Check not deleted');
              }
              callback();
            }
          );
        }

        this.removeCriteria = function(req, callback) {
          api.post(
            url.removeCriteria,
            req,
            function(res) {
              if (res.status) {
                toast('success', 'Removed successfully', '');
                callback();
              } else {
                toast('error', 'Some error occured', 'Criteria not removed');
              }
              callback();
            }
          );
        }

        this.updateCheck = function(req, callback) {
          api.put(
            url.updateCheck,
            req,
            function(res) {
              if (typeof res.updated_at !== 'undefined') {
                toast('success', 'Updated successfully', '');
                callback();
              } else {
                toast('error', 'Some error occured', 'Check not updated');
              }
              callback();
            }
          );
        }

      	this.addCriteriaToCheckList = function(req, callback) {
          api.post(
            url.addCriteriaToCheckList,
            req,
            function(res) {
              if (res) {
                toast('success', 'Added successfully', '');
                callback();
              } else {
                toast('error', 'Some error occured', 'Criteria not added');
              }
            })
        }

      	this.fetchCriteriasByCheckList = function(req, callback) {
          api.get(
            url.fetchCriteriasByCheckList,
            req,
            function(res) {
              callback(res);
            })
        }

      }])

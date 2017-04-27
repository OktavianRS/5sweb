angular.module('model.criterias', [])
    .service('criteriasModel', ['url', 'api', 'toast', '$q', '$location', '$sessionStorage',
        function(url, api, toast, $q, $location, $sessionStorage) {

            this.createCriteria = function(req, callback) {
                api.post(
                    url.createCriteria,
                    req,
                    function(res) {
                        if (typeof res.created_at !== 'undefined') {
                            toast('success', 'Created successfully', '');
                            callback();
                        } else {
                            toast('error', 'Some error occured', 'criteria not created');
                        }
                    })
            }

            this.fetchCriterias = function(callback) {
                api.get(
                    url.fetchCriterias,
                    {},
                    function(res) {
                        callback(res);
                    })
            }

            this.deleteCriteria = function(req, callback) {
                api.delete(
                    url.deleteCriteria,
                    req,
                    function() {
                        callback();
                    }
                );
            }

            this.updateCriteria = function(req, callback) {
                api.put(
                    url.updateCriteria,
                    req,
                    function(res) {
                        callback();
                    }
                );
            }

        }])

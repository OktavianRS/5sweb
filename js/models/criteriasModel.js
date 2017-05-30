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
                        } else if (
                            typeof res.errors !== 'undefined'
                            && typeof res.errors.name !== 'undefined'
                            && typeof res.errors.name.length !== 'undefined'
                        ) {
                            toast('error', 'Some error occured', res.errors.name[0]);
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

            this.fetchAllCriteriaByWorkplaces = function(req, callback) {
                api.get(
                    url.fetchAllCriteriaByWorkplaces,
                    req,
                    function(res) {
                        callback(res);
                    })
            }

            this.deleteCriteria = function(req, callback) {
                api.delete(
                    url.deleteCriteria,
                    req,
                    function(res) {
                        if (res.status) {
                            toast('success', 'Deleted successfully', '');
                            callback();
                        } else {
                            toast('error', 'Some error occured', 'criteria not deleted');
                        }
                        callback();
                    }
                );
            }

            this.updateCriteria = function(req, callback) {
                api.put(
                    url.updateCriteria,
                    req,
                    function(res) {
                        if (typeof res.updated_at !== 'undefined') {
                            toast('success', 'Updated successfully', '');
                            callback();
                        } else {
                            toast('error', 'Some error occured', 'criteria not updated');
                        }
                        callback();
                    }
                );
            }

        }])

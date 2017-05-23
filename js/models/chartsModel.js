/**
 * Created by alex on 28.04.2017.
 */
angular.module('model.charts', [])
    .service('chartsModel', ['url', 'api', 'toast', '$q', '$location', '$sessionStorage',
        function(url, api, toast, $q, $location, $sessionStorage) {

                 //Audit history

            this.fetchAuditHistoryByCompany = function(req, callback) {
                api.get(
                    url.fetchAuditHistoryByCompany,
                    req,
                    function(res) {
                         if (res.errors) {
                            toast('error', res.errors, '');
                        }
                        callback(res);
                    },
                    function errorCallback(res) {
                        callback(res);
                    });
            }

            this.fetchAuditHistoryByDepartment = function(req, callback) {
                api.get(
                    url.fetchAuditHistoryByDepartment,
                    req,
                    function(res) {
                        callback(res);
                    })
            }

            this.fetchAuditHistoryByPlace = function(req, callback) {
                api.get(
                    url.fetchAuditHistoryByPlace,
                    req,
                    function(res) {
                        callback(res);
                    })
            }


            //Score history
            this.fetchScoreHistoryByCompany = function(req, callback) {
                api.get(
                    url.fetchScoreHistoryByCompany,
                    req,
                    function(res) {
                        if (res.errors) {
                            toast('error', res.errors, '');
                        }
                        callback(res);
                    },
                    function errorCallback(res) {
                        callback(res);
                    })
            }

            this.fetchScoreHistoryByDepartment = function(req, callback) {
                api.get(
                    url.fetchScoreHistoryByDepartment,
                    req,
                    function(res) {
                        if (res.errors) {
                            toast('error', res.errors, '');
                        }
                        callback(res);
                    },
                    function errorCallback(res) {
                        callback(res);
                    })
            }

            this.fetchScoreHistoryByPlace = function(req, callback) {
                api.get(
                    url.fetchScoreHistoryByPlace,
                    req,
                    function(res) {
                        if (res.errors) {
                            toast('error', res.errors, '');
                        }
                        callback(res);
                    },
                    function errorCallback(res) {
                        callback(res);
                    })
            }


            // new score
            this.fetchScoreByCompany = function(req, callback) {
                api.get(
                    url.fetchScoreByCompany,
                    req,
                    function(res) {
                        if (res.errors) {
                            toast('error', res.errors, '');
                        }
                        callback(res);
                    },
                    function errorCallback(res) {
                        callback(res);
                    })
            }

            this.fetchScoreByDepartment = function(req, callback) {
                api.get(
                    url.fetchScoreByDepartment,
                    req,
                    function(res) {
                        if (res.errors) {
                            toast('error', res.errors, '');
                        }
                        callback(res);
                    },
                    function errorCallback(res) {
                        callback(res);
                    })
            }

            this.fetchScoreByPlace = function(req, callback) {
                api.get(
                    url.fetchScoreByPlace,
                    req,
                    function(res) {
                        if (res.errors) {
                            toast('error', res.errors, '');
                        }
                        callback(res);
                    },
                    function errorCallback(res) {
                        callback(res);
                    })
            }



            // score
            this.fetchChartByPlace = function(req, callback) {
                api.get(
                    url.fetchChartByPlace,
                    req,
                    function(res) {
                        callback(res);
                    })
            }

            this.fetchChartByDepartment = function(req,callback) {
                api.get(
                    url.fetchChartByDepartment,
                    req,
                    function(res) {
                        callback(res);
                    })
            }


            this.fetchChartByCompany = function(req,callback) {
                api.get(
                    url.fetchChartByCompany,
                    req,
                    function(res) {
                        callback(res);
                    })
            }


        }])

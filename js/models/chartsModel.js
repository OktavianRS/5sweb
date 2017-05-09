/**
 * Created by alex on 28.04.2017.
 */
angular.module('model.charts', [])
    .service('chartsModel', ['url', 'api', 'toast', '$q', '$location', '$sessionStorage',
        function(url, api, toast, $q, $location, $sessionStorage) {


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

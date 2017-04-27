angular.module('factory.request', [
      'factory.url',
      'ngStorage'
    ])
    .factory('api', ['$http', 'toast', '$sessionStorage', '$state',
      function($http, toast, $sessionStorage, $state) {
        /**
         * Set request config
         * @param {string} method - request method (GET | POST | PUT | DELETE)
         * @param {string} url - request url
         * @param {object} data - request data
         * @param {function} successCallback
         * @param {function} errorCallback
         * @returns {*} - promise request
         */
        var request = function(method, url, data, successCallback, errorCallback) {
          var config = {
            dataType: 'json',
            method: method,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json; charset=UTF-8',
              'Access-Control-Allow-Origin': '*'
            }
          };

          if(method == "GET") {
            config.params = data;
          } else {
            config.data = data;
          }

          if($sessionStorage.auth_key) {
            config.url = url + '?auth_key=' + $sessionStorage.auth_key;
          } else {
            config.url = url;
          }

          return $http(config).then(
              function(response) {
                if(response.data.error) {
                  toast('error', response.data.error);
                } else if(successCallback) {
                  successCallback(response.data);
                }
              },
              function(response) {
                console.info('error', url, response);

                if(response.status == 200) {
                  toast('error', "Server Error: " + response.data);
                } else if(response.status == -1) {
                  toast('error', "Server unavailable");
                } else if(response.status == 500) {
                  toast('error', "Server Error: " + response.status + ' ' + response.data.message);
                } else {
                  toast('error', "Server Error: " + response.status + ' ' + response.statusText);
                }

                if(errorCallback) {
                  errorCallback(response.data);
                }
              }
          )
        };

        /**
         * Set request config with file
         * @param {string} url - request url
         * @param {formData} data - request data
         * @param {function} successCallback
         * @param {function} errorCallback
         * @returns {*} - promise request
         */
        var requestFile = function(url, data, successCallback, errorCallback) {
          var config = {
            transformRequest: angular.identity,
            headers: {
              'Content-Type': undefined
            }
          };
          if($sessionStorage.auth_key) {
            url = url + '?access-token=' + $sessionStorage.auth_key;
          }

          return $http.post(url, data, config).then(
              function(response) {
                if(response.data.error) {
                  toast('error', response.data.error);
                } else if(successCallback) {
                  successCallback(response.data);
                }
              },
              function(response) {
                console.info('error', url, response);

                if(response.status == 200) {
                  toast('error', "Server Error: " + response.data);
                } else if(response.status == -1) {
                  toast('error', "Server unavailable");
                } else if(response.status == 500) {
                  toast('error', "Server Error: " + response.status + ' ' + response.data.message);
                } else {
                  toast('error', "Server Error: " + response.status + ' ' + response.statusText);
                }

                if(errorCallback) {
                  errorCallback(response.data);
                }
              }
          )
        };

        return {
          /**
           * Get request (get data)
           * @param {string} url - request url
           * @param {object} data - request data
           * @param {function=} successCallback
           * @param {function=} errorCallback
           * @returns {*} - promise request
           */
          get: function(url, data, successCallback, errorCallback) {
            return request('GET', url, data, successCallback, errorCallback);
          },

          /**
           * Post request (create data)
           * @param {string} url - request url
           * @param {object} data - request data
           * @param {function=} successCallback
           * @param {function=} errorCallback
           * @returns {*} - promise request
           */
          post: function(url, data, successCallback, errorCallback) {
            return request('POST', url, data, successCallback, errorCallback);
          },

          /**
           * Delete request (delete data)
           * @param {string} url - request url
           * @param {object} data - request data
           * @param {function=} successCallback
           * @param {function=} errorCallback
           * @returns {*} - promise request
           */
          delete: function(url, data, successCallback, errorCallback) {
            return request('DELETE', url, data, successCallback, errorCallback);
          },

          /**
           * Put request (change data)
           * @param {string} url - request url
           * @param {object} data - request data
           * @param {function=} successCallback
           * @param {function=} errorCallback
           * @returns {*} - promise request
           */
          put: function(url, data, successCallback, errorCallback) {
            return request('PUT', url, data, successCallback, errorCallback);
          },

          /**
           * file request (change data)
           * @param {string} url - request url
           * @param {formData} data - request data
           * @param {function=} successCallback
           * @param {function=} errorCallback
           * @returns {*} - promise request
           */
          file: function(url, data, successCallback, errorCallback) {
            return requestFile(url, data, successCallback, errorCallback);
          }
        }
      }
    ]);

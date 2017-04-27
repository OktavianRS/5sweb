angular.module('factory.url', [])
    .factory('url', [
      function() {

        //dev
        var domainConfig = 'http://5s.grassbusinesslabs.com/server';


        var baseUrl = domainConfig + '/api/web/v1';


        return {
          baseUrl: baseUrl,

          // loginModel
          login: baseUrl + '/user/login',


          //companiesModel
          createCompany: baseUrl + '/company/create',
          fetchCompanies: baseUrl + '/company/index',
          deleteCompany: baseUrl + '/company/delete',
          updateCompany: baseUrl + '/company/update',


            //workplacesModel
            createWorkplace: baseUrl + '/place/create',
            fetchWorkplaces: baseUrl + '/place/index',
            deleteWorkplace: baseUrl + '/place/delete',
            updateWorkplace: baseUrl + '/place/update',


          //criteriaModel
          createCriteria: baseUrl + '/criteria/create',
          fetchCriterias: baseUrl + '/criteria/index',
          deleteCriteria: baseUrl + '/criteria/delete',
          updateCriteria: baseUrl + '/criteria/update',

        }
      }
    ]);

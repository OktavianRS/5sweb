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
          createWorkPlace: baseUrl + '/place/create',
          fetchWorkPlaces: baseUrl + '/place/index',
          deleteWorkPlace: baseUrl + '/place/delete',
          updateWorkPlace: baseUrl + '/place/update',
          addCriteriaToWorkPlace: baseUrl + '/place/add-criteria',
          removeCriteriaFromWorkPlace: baseUrl + '/place/remove-criteria',

          //departmentsModel
          createDepartment: baseUrl + '/department/create',
          fetchDepartments: baseUrl + '/department/index',
          deleteDepartment: baseUrl + '/department/delete',
          updateDepartment: baseUrl + '/department/update',
          fetchPlacesList: baseUrl + '/department/places-list',

          //criteriaModel
          createCriteria: baseUrl + '/criteria/create',
          fetchCriterias: baseUrl + '/criteria/index',
          deleteCriteria: baseUrl + '/criteria/delete',
          updateCriteria: baseUrl + '/criteria/update',


        }
      }
    ]);

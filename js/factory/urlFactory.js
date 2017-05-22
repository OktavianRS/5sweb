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

          // chartModel
          fetchAuditHistoryByCompany: baseUrl + '/chart/audit-history-by-company',
          fetchAuditHistoryByDepartment: baseUrl + '/chart/audit-history-by-department',
          fetchAuditHistoryByPlace: baseUrl + '/chart/audit-history-by-place',

          fetchScoreHistoryByCompany: baseUrl + '/chart/score-history-by-company',
          fetchScoreHistoryByDepartment: baseUrl + '/chart/score-history-by-department',
          fetchScoreHistoryByPlace: baseUrl + '/chart/score-history-by-place',

          fetchScoreByCompany: baseUrl + '/chart/score-by-company',
          fetchScoreByDepartment: baseUrl + '/chart/score-by-department',
          fetchScoreByPlace: baseUrl + '/chart/score-by-place',

          fetchChartByPlace: baseUrl + '/chart/by-place',
          fetchChartByDepartment: baseUrl + '/chart/by-department',
          fetchChartByCompany: baseUrl + '/chart/by-company',

          //companiesModel
          createCompany: baseUrl + '/company/create',
          fetchCompanies: baseUrl + '/company/index',
          deleteCompany: baseUrl + '/company/delete',
          updateCompany: baseUrl + '/company/update',
          fetchOneDepartmentList: baseUrl + '/company/one-department-list',

          //workplacesModel
          createWorkPlace: baseUrl + '/place/create',
          fetchWorkPlaces: baseUrl + '/place/index',
          fetchWorkPlace: baseUrl + '/place/view',
          fetchAllWorkPlaces:  baseUrl + '/place/all',
          deleteWorkPlace: baseUrl + '/place/delete',
          updateWorkPlace: baseUrl + '/place/update',
          addCriteriaToWorkPlace: baseUrl + '/place/add-criteria',
          removeCriteriaFromWorkPlace: baseUrl + '/place/remove-criteria',
          fetchAllWorkPlacesByDepartment: baseUrl + '/place/by-department',

          //departmentsModel
          createDepartment: baseUrl + '/department/create',
          fetchDepartments: baseUrl + '/department/index',
          deleteDepartment: baseUrl + '/department/delete',
          updateDepartment: baseUrl + '/department/update',
          fetchPlacesList: baseUrl + '/department/places-list',
          fetchAllCriteriaByWorkplaces: baseUrl + '/criteria/by-place',
          fetchOnePlaceList: baseUrl + '/department/one-place-list',
          fetchDepartmentsByCompanyId: baseUrl + '/company/one-department-list',



          //criteriaModel
          createCriteria: baseUrl + '/criteria/create',
          fetchCriterias: baseUrl + '/criteria/index',
          deleteCriteria: baseUrl + '/criteria/delete',
          updateCriteria: baseUrl + '/criteria/update',

          //userModel
          createUser: baseUrl + '/user/create',
          fetchUsers: baseUrl + '/user/index',
          deleteUser: baseUrl + '/user/delete',
          updateUser: baseUrl + '/user/update',
          fetchCompanyUsers: baseUrl + '/user/company-list',

          //auditModel
          startAudit: baseUrl + '/audit/start',
          stopAudit: baseUrl + '/audit/stop',
          fetchAudits: baseUrl + '/audit/all',

          //checkListModel
          createCheck: baseUrl + '/checklist/create',
          fetchChecks: baseUrl + '/checklist/index',
          deleteCheck: baseUrl + '/checklist/delete',
          updateCheck: baseUrl + '/checklist/update',
          addCriteriaToCheckList: baseUrl + '/checklist/add-criteria',
          fetchCriteriasByCheckList: baseUrl + '/checklist/criteria-list',


        }
      }
    ]);

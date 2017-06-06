angular
.module('app')
.controller('auditCtrl', auditCtrl)

auditCtrl.$inject = ['$scope', '$rootScope', 'toast', 'ngDialog', 'usersModel', 'auditModel', 'departmentsModel', 'companiesModel', '$filter', '$state'];
function auditCtrl($scope, $rootScope, toast, ngDialog, usersModel, auditModel, departmentsModel, companiesModel, $filter, $state) {
  $scope.search = [];
  $scope.companyList = [];
  $scope.scoreSlider = {
    value: 50,
    options: {
      floor: 0,
      ceil: 100,
      step: 1,
      minLimit: 0,
      maxLimit: 100
    }
  }

  $scope.paginationSetup = {
      page: 1,
      pageSize: 10
  }
  $scope.paginationParams = {
      totalPages: 0,
      pageCount: Array.from(Array(1).keys()),
      current: 0,
      totalCount: 0
  }

  $scope.permissionSlider = {
    value: 50,
    options: {
      floor: 0,
      ceil: 100,
      step: 1,
      minLimit: 0,
      maxLimit: 100
    }
  }

  $scope.state = {
    isDisabled: true
  }
  $scope.auditList = [];

  $scope.audit = {
    name: new Date().toDateString(),
    description: '',
    target: $scope.scoreSlider.value,
    user_id: '',
    company_id: $rootScope.company_id || undefined,
    department_id: '',
  }

  // fetch all initial data
  function constructor() {
    usersModel.fetchUsers(function(result) {
      $scope.usersList = result.users;
      $scope.search.user =  $scope.usersList[0];
    });

    auditModel.fetchAudits(function(result) {
      $scope.auditList = result.audits;
      $scope.paginationParams = result.page;
      $scope.paginationParams.totalPages = result.page.pageCount;
      $scope.paginationParams.pageCount = Array.from(Array(result.page.pageCount).keys())
    }, $scope.paginationSetup);

    companiesModel.fetchCompanies((result) => {
      $scope.companiesList = result.companies;
    });

    departmentsModel.fetchCompanyDepartments($scope.audit.company_id, function(result) {
      $scope.departmentsList = result.departments;
    });
  }
  constructor();

  $scope.changePage = function(page) {
      $scope.paginationSetup.page = page;
      constructor();
  }

  $scope.prevPage = function() {
      if ($scope.paginationSetup.page !== 1) {
          $scope.paginationSetup.page = $scope.paginationSetup.page-1;
          constructor();
      }
  }

  $scope.nextPage = function() {
      if ($scope.paginationParams.totalPages !== $scope.paginationSetup.page) {
          $scope.paginationSetup.page = $scope.paginationSetup.page+1;
          constructor();
      }
  }

  $scope.selectCompany = function() {
    departmentsModel.fetchCompanyDepartments($scope.audit.company_id, function(result) {
      $scope.departmentsList = result.departments;
    });
  }

  $scope.submit = function() {
    $scope.audit.user_id = $scope.search.user.id;
    $scope.audit.department_id = $scope.search.department.id;
    auditModel.startAudit($scope.audit, constructor);
    ngDialog.closeAll();
  }

  $scope.stopAudit = function(id, email, username, password) {
    // usersModel.stopAudit({id, email, username, password}, constructor);
  }

  $scope.openAtachments = function(audit_id, audit_name) {
    $state.go('app.audit-atachments', {audit_id, audit_name});
  }

  $scope.createAuditModal = function() {
    ngDialog.open({
      template:'/views/components/createAuditDialog.html',
      className: 'ngdialog-theme-default',
      scope: $scope,
      preCloseCallback:function(){
        $scope.audit = {
          name: new Date().toDateString(),
          description: '',
          target: $scope.scoreSlider.value,
          user_id: '',
          company_id: $rootScope.company_id || undefined,
          department_id: '',
        }
      }
    });
  }
}

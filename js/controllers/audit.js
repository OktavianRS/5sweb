angular
.module('app')
.controller('auditCtrl', auditCtrl)

auditCtrl.$inject = ['$scope', '$rootScope', 'toast', 'ngDialog', 'usersModel', 'auditModel', 'departmentsModel', 'companiesModel', '$filter'];
function auditCtrl($scope, $rootScope, toast, ngDialog, usersModel, auditModel, departmentsModel, companiesModel, $filter) {
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
  }

  // fetch all initial data
  function constuctor() {
    usersModel.fetchUsers(function(result) {
      $scope.usersList = result;
      $scope.search.user =  $scope.usersList[0];
    });

    auditModel.fetchAudits(function(result) {
      $scope.auditList = result;
    });

    companiesModel.fetchCompanies((result) => {
      $scope.companiesList = result;
    });

    departmentsModel.fetchCompanyDepartments($scope.audit.company_id, function(result) {
      $scope.departmentsList = result;
    });
  }
  constuctor();

  $scope.selectDepartment = function (item) {
    if (item.places.length === 0) {
      item.places.push({name:'List is empty'});
    }
    $scope.workPlacesList = item.places;
    $scope.search.workplace = $scope.workPlacesList[0];

  }

  $scope.selectCompany = function() {
    departmentsModel.fetchCompanyDepartments($scope.audit.company_id, function(result) {
      $scope.departmentsList = result;
    });
  }

  $scope.submit = function() {
    $scope.audit.user_id = $scope.search.user.id;
    $scope.audit.department_id = $scope.search.department.id;
    auditModel.startAudit($scope.audit, constuctor);
    ngDialog.closeAll();
  }

  $scope.stopAudit = function(id, email, username, password) {
    // usersModel.stopAudit({id, email, username, password}, constuctor);
  }

  $scope.createAuditModal = function() {
    ngDialog.open({
      template:'/views/components/createAuditDialog.html',
      className: 'ngdialog-theme-default',
      scope: $scope,
    });
  }
}

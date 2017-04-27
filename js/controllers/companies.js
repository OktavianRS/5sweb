angular
.module('app')
.controller('companiesCtrl', companiesCtrl)

companiesCtrl.$inject = ['$scope', 'toast', 'ngDialog', 'companiesModel'];
function companiesCtrl($scope, toast, ngDialog, companiesModel) {
  $scope.companiesState = true;
  $scope.companiesList = [];
  $scope.editElement = {};

  $scope.company = {
    name: ''
  }

  // fetch all initial data
  function constuctor() {
    companiesModel.fetchCompanies(function(result) {
      $scope.companiesList = result;
    });
  }
  constuctor();

  $scope.handleMinimize = function() {
    $scope.companiesState = !$scope.companiesState;
  }

  $scope.createCompany = function() {
    companiesModel.createCompany($scope.company, constuctor);
  }

  $scope.deleteCompany = function(id) {
    companiesModel.deleteCompany({ id }, constuctor);
  }

  $scope.updateCompany = function(id, name) {
    companiesModel.updateCompany({ id, name }, constuctor);
    ngDialog.closeAll();
  }

  $scope.editCompany = function(data) {
    $scope.editElement = Object.create(data);
    ngDialog.open({
      template:'/views/components/editCompanyDialog.html',
      className: 'ngdialog-theme-default',
      scope: $scope,
    });
  }

}

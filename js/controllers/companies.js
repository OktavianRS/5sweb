angular
.module('app')
.controller('companiesCtrl', companiesCtrl)

companiesCtrl.$inject = ['$scope', 'toast', 'ngDialog', 'companiesModel'];
function companiesCtrl($scope, toast, ngDialog, companiesModel) {
  $scope.companiesList = [];
  $scope.editElement = {};

  $scope.company = {
    name: ''
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

  // fetch all initial data
  function constructor() {
    companiesModel.fetchCompanies(function(result) {
      $scope.companiesList = result.companies;
      $scope.paginationParams = result.page;
      $scope.paginationParams.totalPages = result.page.pageCount;
      $scope.paginationParams.pageCount = Array.from(Array(result.page.pageCount).keys())
    }, $scope.paginationSetup);
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

  $scope.createCompany = function() {
    companiesModel.createCompany($scope.company, constructor);
    ngDialog.closeAll();
  }

  $scope.deleteCompany = function(id) {
    companiesModel.deleteCompany({ id }, constructor);
  }

  $scope.updateCompany = function(id, name) {
    companiesModel.updateCompany({ id, name }, constructor);
    ngDialog.closeAll();
  }

  $scope.createCompanyModal = function() {
    ngDialog.open({
      template:'/views/components/createCompanyDialog.html',
      className: 'ngdialog-theme-default',
      scope: $scope,
    });
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

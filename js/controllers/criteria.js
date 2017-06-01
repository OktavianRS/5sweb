angular
.module('app')
.controller('criteriaCtrl', criteriaCtrl)

criteriaCtrl.$inject = ['$scope', 'toast', 'ngDialog', 'criteriasModel'];
function criteriaCtrl($scope, toast, ngDialog, criteriasModel) {
  $scope.criteriasList = [];
  $scope.editElement = {};

  $scope.criteria = {
    name: ''
  }
  $scope.workplace = {
      name: '',
      criteria_id: [],
      department: '',
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
    criteriasModel.fetchCriterias(function(result) {
      $scope.criteriasList = result.criterias;
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

  $scope.createCriteria = function() {
    criteriasModel.createCriteria($scope.criteria, constructor);
    ngDialog.closeAll();
  }

  $scope.deleteCriteria = function(id) {
    criteriasModel.deleteCriteria({ id }, constructor);
  }

  $scope.updateCriteria = function(id, name) {
    criteriasModel.updateCriteria({ id, name }, constructor);
    ngDialog.closeAll();
  }

  $scope.createCriteriaModal = function() {
    ngDialog.open({
      template:'/views/components/createCriteriaDialog.html',
      className: 'ngdialog-theme-default',
      scope: $scope,
      preCloseCallback:function(){
        $scope.criteria = null;
      }
    });
  }

  $scope.editCriteria = function(data) {
    $scope.editElement = Object.create(data);
    ngDialog.open({
      template:'/views/components/editCriteriaDialog.html',
      className: 'ngdialog-theme-default',
      scope: $scope,
    });
  }
}

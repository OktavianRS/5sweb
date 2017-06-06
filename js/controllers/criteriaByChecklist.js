angular
.module('app')
.controller('criteriaByChecklistCtrl', criteriaByChecklistCtrl)

criteriaByChecklistCtrl.$inject = ['$scope', '$state', '$rootScope', 'toast', 'ngDialog', 'criteriasModel', 'checkListModel'];
function criteriaByChecklistCtrl($scope, $state, $rootScope, toast, ngDialog, criteriasModel, checkListModel) {
  $scope.criteriasList = [];
  $scope.editElement = {};
  var checklist_id = Number($rootScope.check_id);

  $scope.criteria = {
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
    var requestParams = $scope.paginationSetup;
    requestParams.checklist_id = checklist_id;
    checkListModel.fetchCriteriasByCheckList(requestParams, function(result) {
      $scope.criteriasList = result.criterias;
      $scope.paginationParams = result.page;
      $scope.paginationParams.totalPages = result.page.pageCount;
      $scope.paginationParams.pageCount = Array.from(Array(result.page.pageCount).keys())
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

  $scope.deleteCriteria = function(criteria_id) {
    checkListModel.removeCriteria({ checklist_id, criteria_id }, constructor);
  }

  $scope.updateCriteria = function(id, name) {
    criteriasModel.updateCriteria({ id, name }, constructor);
    ngDialog.closeAll();
  }

  $scope.goToAllCriterias = function() {
    $state.go('app.criteria');
  }

  $scope.createCriteriaModal = function() {
    ngDialog.open({
      template:'/views/components/createCriteriaDialog.html',
      className: 'ngdialog-theme-default',
      scope: $scope,
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

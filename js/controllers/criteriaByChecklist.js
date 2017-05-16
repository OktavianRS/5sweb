angular
.module('app')
.controller('criteriaByChecklistCtrl', criteriaByChecklistCtrl)

criteriaByChecklistCtrl.$inject = ['$scope', '$state', '$rootScope', 'toast', 'ngDialog', 'criteriasModel', 'checkListModel'];
function criteriaByChecklistCtrl($scope, $state, $rootScope, toast, ngDialog, criteriasModel, checkListModel) {
  $scope.criteriasList = [];
  $scope.editElement = {};

  $scope.criteria = {
    name: ''
  }

  // fetch all initial data
  function constuctor() {
    checkListModel.fetchCriteriasByCheckList({
      checklist_id: $rootScope.check_id
    }, function(result) {
      $scope.criteriasList = result;
    });
  }
  constuctor();
  $scope.deleteCriteria = function(id) {
    criteriasModel.deleteCriteria({ id }, constuctor);
  }

  $scope.updateCriteria = function(id, name) {
    criteriasModel.updateCriteria({ id, name }, constuctor);
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

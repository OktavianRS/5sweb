angular
.module('app')
.controller('criteriaCtrl', criteriaCtrl)

criteriaCtrl.$inject = ['$scope', 'toast', 'ngDialog', 'criteriasModel'];
function criteriaCtrl($scope, toast, ngDialog, criteriasModel) {
  $scope.criteriaState = true;
  $scope.criteriasList = [];
  $scope.editElement = {};

  $scope.criteria = {
    name: ''
  }

  // fetch all initial data
  function constuctor() {
    criteriasModel.fetchCriterias(function(result) {
      $scope.criteriasList = result;
    });
  }
  constuctor();

  $scope.handleMinimize = function() {
    $scope.criteriaState = !$scope.criteriaState;
  }

  $scope.createCriteria = function() {
    criteriasModel.createCriteria($scope.criteria, constuctor);
  }

  $scope.deleteCriteria = function(id) {
    criteriasModel.deleteCriteria({ id }, constuctor);
  }

  $scope.updateCriteria = function(id, name) {
    criteriasModel.updateCriteria({ id, name }, constuctor);
    ngDialog.closeAll();
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

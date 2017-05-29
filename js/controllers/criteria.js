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

  // fetch all initial data
  function constuctor() {
    criteriasModel.fetchCriterias(function(result) {
      $scope.criteriasList = result;

    });
  }
  constuctor();

  $scope.createCriteria = function() {
    criteriasModel.createCriteria($scope.criteria, constuctor);
    ngDialog.closeAll();
  }

  $scope.deleteCriteria = function(id) {
    criteriasModel.deleteCriteria({ id }, constuctor);
  }

  $scope.updateCriteria = function(id, name) {
    criteriasModel.updateCriteria({ id, name }, constuctor);
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

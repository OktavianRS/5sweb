angular
.module('app')
.controller('criteriaCtrl', criteriaCtrl)

criteriaCtrl.$inject = ['$scope', 'toast', 'ngDialog'];
function criteriaCtrl($scope, toast, ngDialog) {
  $scope.criteriaState = true;

  $scope.criteria = {
    name: ''
  }

  $scope.handleMinimize = function() {
    $scope.criteriaState = !$scope.criteriaState;
  }

  $scope.editDepartment = function() {
    ngDialog.open({
      template:'/views/components/editCriteriaDialog.html',
      className: 'ngdialog-theme-default'
    });
  }
}

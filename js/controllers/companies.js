angular
.module('app')
.controller('companiesCtrl', companiesCtrl)

companiesCtrl.$inject = ['$scope', 'toast', 'ngDialog'];
function companiesCtrl($scope, toast, ngDialog) {
  $scope.companiesState = true;

  $scope.company = {
    name: ''
  }

  $scope.handleMinimize = function() {
    $scope.companiesState = !$scope.companiesState;
  }

}

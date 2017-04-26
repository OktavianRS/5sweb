angular
.module('app')
.controller('departmentsCtrl', departmentsCtrl)

departmentsCtrl.$inject = ['$scope', 'toast', 'loginModel'];
function departmentsCtrl($scope, toast, loginModel) {
  $scope.departmentState = true;

  $scope.department = {
    name: '',
    color: ''
  }

  $scope.options = {
    format: 'hex',
    swatchOnly: true
  }

  $scope.handleMinimize = function() {
    $scope.departmentState = !$scope.departmentState;
  }
}

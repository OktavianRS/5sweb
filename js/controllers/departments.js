angular
.module('app')
.controller('departmentsCtrl', departmentsCtrl)

departmentsCtrl.$inject = ['$scope', 'toast', 'loginModel', 'ngDialog'];
function departmentsCtrl($scope, toast, loginModel, ngDialog) {
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

  $scope.showWorkplaces = function() {
    ngDialog.open({
      template:'/views/components/workplacesDialog.html',
      className: 'ngdialog-theme-default'
    });
  }

  $scope.editDepartment = function() {
    ngDialog.open({
      template:'/views/components/editDepartmentDialog.html',
      className: 'ngdialog-theme-default'
    });
  }
}

angular
.module('app')
.controller('usersCtrl', usersCtrl)

usersCtrl.$inject = ['$scope', 'toast', 'ngDialog'];
function usersCtrl($scope, toast, ngDialog) {
  $scope.usersState = true;

  $scope.user = {
    name: ''
  }

  $scope.handleMinimize = function() {
    $scope.usersState = !$scope.usersState;
  }

  $scope.editDepartment = function() {
    ngDialog.open({
      template:'/views/components/editUserDialog.html',
      className: 'ngdialog-theme-default'
    });
  }
}

angular
.module('app')
.controller('usersCtrl', usersCtrl)

usersCtrl.$inject = ['$scope', 'toast', 'ngDialog', 'usersModel'];
function usersCtrl($scope, toast, ngDialog, usersModel) {
  $scope.usersState = true;
  $scope.state = {
    isDisabled: true
  }
  $scope.usersList = [];

  $scope.user = {
    username: '',
    email: '',
    password: '',
    password_repeat: '',
  }

  // fetch all initial data
  function constuctor() {
    usersModel.fetchUsers(function(result) {
      $scope.usersList = result;
    });
  }
  constuctor();

  $scope.handleMinimize = function() {
    $scope.usersState = !$scope.usersState;
  }

  $scope.submit = function() {
    usersModel.createUser($scope.user, constuctor);
  }

  $scope.deleteUser = function(id) {
    usersModel.deleteUser({ id }, constuctor);
  }

  $scope.updateUser = function(id, email, username, password) {
    usersModel.updateUser({id, email, username, password}, constuctor);
    ngDialog.closeAll();
  }

  $scope.editUser = function(data) {
    $scope.editElement = Object.create(data);
    ngDialog.open({
      template:'/views/components/editUserDialog.html',
      className: 'ngdialog-theme-default',
      scope: $scope,
    });
  }
}

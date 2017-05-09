angular
.module('app')
.controller('usersCtrl', usersCtrl)

usersCtrl.$inject = ['$scope', 'toast', 'ngDialog', 'usersModel'];
function usersCtrl($scope, toast, ngDialog, usersModel) {
  $scope.state = {
    isDisabled: true
  }
  $scope.usersList = [];

//TODO: change list to display first_name and last_name instead of username
  $scope.user = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  }

  // fetch all initial data
  function constuctor() {
    usersModel.fetchUsers(function(result) {
      $scope.usersList = result;
    });
  }
  constuctor();

  $scope.submit = function() {
    usersModel.createUser($scope.user, constuctor);
    ngDialog.closeAll();
  }

  $scope.deleteUser = function(id) {
    usersModel.deleteUser({ id }, constuctor);
  }

  $scope.updateUser = function(id, email, username, password) {
    usersModel.updateUser({id, email, username, password}, constuctor);
    ngDialog.closeAll();
  }

  $scope.createUserModal = function() {
    ngDialog.open({
      template:'/views/components/createUserDialog.html',
      className: 'ngdialog-theme-default',
      scope: $scope,
    });
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

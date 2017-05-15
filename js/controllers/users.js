angular
.module('app')
.controller('usersCtrl', usersCtrl)

usersCtrl.$inject = ['$scope', 'toast', 'ngDialog', 'usersModel'];
function usersCtrl($scope, toast, ngDialog, usersModel) {
  $scope.state = {
    isDisabled: true
  }
  $scope.usersList = [];

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

  $scope.updateUser = function(id, email, first_name, last_name, password) {
    usersModel.updateUser({id, email, first_name, last_name, password}, constuctor);
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

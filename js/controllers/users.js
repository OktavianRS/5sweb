angular
.module('app')
.controller('usersCtrl', usersCtrl)

usersCtrl.$inject = ['$scope', '$rootScope', 'toast', 'ngDialog', 'usersModel', 'companiesModel'];
function usersCtrl($scope, $rootScope, toast, ngDialog, usersModel, companiesModel) {
  $scope.state = {
    isDisabled: true
  }
  $scope.usersList = [];
  $scope.companiesList = [];

  $scope.user = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    company_id: $rootScope.company_id || '',
  };

  // fetch all initial data
  function constuctor() {
    usersModel.fetchUsers(function(result) {
      $scope.usersList = result;
    });
    companiesModel.fetchCompanies(function(result) {
      $scope.companiesList = result;
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

  $scope.updateUser = function(id, email, firstname, lastname, password) {
    usersModel.updateUser({id, email, firstname, lastname, password}, constuctor);
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
    console.log(data)
    $scope.editElement = Object.create(data);
    ngDialog.open({
      template:'/views/components/editUserDialog.html',
      className: 'ngdialog-theme-default',
      scope: $scope,
    });
  }
}

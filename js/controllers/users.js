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

  $scope.paginationSetup = {
      page: 1,
      pageSize: 10
  }
  $scope.paginationParams = {
      totalPages: 0,
      pageCount: Array.from(Array(1).keys()),
      current: 0,
      totalCount: 0
  }

  // fetch all initial data
  function constructor() {
    usersModel.fetchUsers(function(result) {
      $scope.usersList = result.users;
      $scope.paginationParams = result.page;
      $scope.paginationParams.totalPages = result.page.pageCount;
      $scope.paginationParams.pageCount = Array.from(Array(result.page.pageCount).keys())
    }, $scope.paginationSetup);
    companiesModel.fetchCompanies(function(result) {
      $scope.companiesList = result.companies;
    });
  }
  constructor();

  $scope.changePage = function(page) {
      $scope.paginationSetup.page = page;
      constructor();
  }

  $scope.prevPage = function() {
      if ($scope.paginationSetup.page !== 1) {
          $scope.paginationSetup.page = $scope.paginationSetup.page-1;
          constructor();
      }
  }

  $scope.nextPage = function() {
      if ($scope.paginationParams.totalPages !== $scope.paginationSetup.page) {
          $scope.paginationSetup.page = $scope.paginationSetup.page+1;
          constructor();
      }
  }

  $scope.submit = function() {
    usersModel.createUser($scope.user, constructor);
    $scope.editElement = Object.create({});
    ngDialog.closeAll();
  }

  $scope.deleteUser = function(id) {
    usersModel.deleteUser({ id }, constructor);
  }

  $scope.updateUser = function(id, email, firstname, lastname, password) {
    usersModel.updateUser({id, email, firstname, lastname, password}, constructor);
    ngDialog.closeAll();
  }

  $scope.createUserModal = function() {
    ngDialog.open({
      template:'/views/components/createUserDialog.html',
      className: 'ngdialog-theme-default',
      scope: $scope,
      preCloseCallback:function(){
        $scope.user = {
          firstname: '',
          lastname: '',
          email: '',
          password: '',
          company_id: $rootScope.company_id || '',
        };
      }
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

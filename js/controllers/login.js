angular
.module('app')
.controller('loginCtrl', loginCtrl)

loginCtrl.$inject = ['$scope', 'toast', 'loginModel'];
function loginCtrl($scope, toast, loginModel) {
  $scope.authParams = {
    email: '',
    password: ''
  }

  $scope.login = function() {
    loginModel.tryLogin($scope.authParams);
  }
}

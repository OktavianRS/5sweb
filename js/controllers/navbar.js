angular
.module('app')
.controller('navbarCtrl', navbarCtrl)

navbarCtrl.$inject = ['$scope', 'toast', '$sessionStorage', '$location'];
function navbarCtrl($scope, toast, $sessionStorage, $location) {

  $scope.username = $sessionStorage.username;
  $scope.role = $sessionStorage.role;

  $scope.logout = function() {
    delete $sessionStorage.auth_key;
    $location.path('/login');
  }
}

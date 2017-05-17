angular
.module('app')
.controller('navbarCtrl', navbarCtrl)

navbarCtrl.$inject = ['$scope', 'toast', '$sessionStorage', '$location'];
function navbarCtrl($scope, toast, $sessionStorage, $location) {

  $scope.first_name = $sessionStorage.first_name;
  $scope.last_name = $sessionStorage.last_name;
  $scope.role = $sessionStorage.role;

  $scope.logout = function() {
    delete $sessionStorage.auth_key;
    $location.path('/login');
  }
}

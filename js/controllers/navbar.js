angular
.module('app')
.controller('navbarCtrl', navbarCtrl)

navbarCtrl.$inject = ['$scope', 'toast', '$sessionStorage', '$location'];
function navbarCtrl($scope, toast, $sessionStorage, $location) {

  $scope.logout = function() {
    delete $sessionStorage.auth_key;
    $location.path('/login');
  }
}

angular
.module('app')
.controller('sidebarNavCtrl', sidebarNavCtrl)

sidebarNavCtrl.$inject = ['$scope', 'toast', '$sessionStorage', '$location'];
function sidebarNavCtrl($scope, toast, $sessionStorage, $location) {

  $scope.role = $sessionStorage.role;

}

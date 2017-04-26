angular
.module('app')
.controller('loginCtrl', loginCtrl)

loginCtrl.$inject = ['$scope', 'toast'];
function loginCtrl($scope, toast) {
  toast('succes', 'text', 'desc');
}

angular
.module('app')
.controller('auditCtrl', auditCtrl)

auditCtrl.$inject = ['$scope', 'toast', 'ngDialog', 'usersModel', 'auditModel'];
function auditCtrl($scope, toast, ngDialog, usersModel, auditModel) {
  $scope.auditState = true;
  $scope.scoreSlider = {
    value: 50,
    options: {
      floor: 0,
      ceil: 100,
      step: 1,
      minLimit: 0,
      maxLimit: 100
    }
  }
  debugger
  $scope.state = {
    isDisabled: true
  }
  $scope.auditList = [];

  $scope.audit = {
    name: '',
    description: '',
  }

  // fetch all initial data
  function constuctor() {
    usersModel.fetchUsers(function(result) {
      $scope.usersList = result;
    });

    auditModel.fetchAudits(function(result) {
      $scope.auditList = result;
      console.log(result);
    });
  }
  constuctor();

  $scope.handleMinimize = function() {
    $scope.auditState = !$scope.auditState;
  }

  $scope.submit = function() {
    auditModel.startAudit($scope.audit, constuctor);
  }

  // $scope.deleteUser = function(id) {
  //   usersModel.deleteUser({ id }, constuctor);
  // }

  $scope.stopAudit = function(id, email, username, password) {
    usersModel.stopAudit({id, email, username, password}, constuctor);
  }


  // $scope.stopAudit = function(id, email, username, password) {
  //   usersModel.updateUser({id, email, username, password}, constuctor);
  //   ngDialog.closeAll();
  // }

  // $scope.editUser = function(data) {
  //   $scope.editElement = Object.create(data);
  //   ngDialog.open({
  //     template:'/views/components/editUserDialog.html',
  //     className: 'ngdialog-theme-default',
  //     scope: $scope,
  //   });
  // }
}

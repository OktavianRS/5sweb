angular
.module('app')
.controller('auditCtrl', auditCtrl)

auditCtrl.$inject = ['$scope', 'toast', 'ngDialog', 'usersModel', 'auditModel', 'departmentsModel'];
function auditCtrl($scope, toast, ngDialog, usersModel, auditModel, departmentsModel) {
  $scope.auditState = true;
  $scope.search = [];
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
    target: $scope.scoreSlider.value,
    place_id: '',
    user_id: '',
  }

  // fetch all initial data
  function constuctor() {
    usersModel.fetchUsers(function(result) {
      $scope.usersList = result;
      $scope.search.user =  $scope.usersList[0];

      console.log(result);
    });

    auditModel.fetchAudits(function(result) {
      $scope.auditList = result;
      console.log(result);
    });

    departmentsModel.fetchPlacesList(function(result) {
      $scope.departmentsList = result;
      $scope.search.department = $scope.departmentsList[0];

      if ($scope.search.department.places.length === 0) {
        $scope.search.department.places.push({name:'List is empty'});
      }
      $scope.workPlacesList = $scope.search.department.places;
      $scope.search.workplace = $scope.workPlacesList[0];
      console.log(result);

    });
  }
  constuctor();

  $scope.handleMinimize = function() {
    $scope.auditState = !$scope.auditState;
  }

  $scope.selectDepartment = function (item) {
    if (item.places.length === 0) {
      item.places.push({name:'List is empty'});
    }
    $scope.workPlacesList = item.places;
    $scope.search.workplace = $scope.workPlacesList[0];

  }

  $scope.submit = function() {
    debugger
    $scope.audit.place_id = $scope.search.workplace.id;
    $scope.audit.user_id = $scope.search.user.id;
    auditModel.startAudit($scope.audit, constuctor);
  }

  // $scope.deleteUser = function(id) {
  //   usersModel.deleteUser({ id }, constuctor);
  // }

  $scope.stopAudit = function(id, email, username, password) {
    // usersModel.stopAudit({id, email, username, password}, constuctor);
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

angular
.module('app')
.controller('checkListCtrl', checkListCtrl)

checkListCtrl.$inject = ['$scope', 'toast', 'ngDialog', 'checkListModel', 'criteriasModel'];
function checkListCtrl($scope, toast, ngDialog, checkListModel, criteriasModel) {
  $scope.checkList = [];
  $scope.criteriasList = [];
  $scope.editElement = {};

  $scope.check = {
    name: ''
  }

  $scope.criteria = [];

  // fetch all initial data
  function constuctor() {
    checkListModel.fetchChecks(function(result) {
      $scope.checkList = result;
    });
    criteriasModel.fetchCriterias(function(result) {
      $scope.criteriasList = result;
    });
  }
  constuctor();

  $scope.createCheck = function() {
    checkListModel.createCheck($scope.check, constuctor);
    ngDialog.closeAll();
  }

  $scope.deleteCheck = function(id) {
    checkListModel.deleteCheck({ id }, constuctor);
  }

  $scope.updateCheck = function(id, name) {
    checkListModel.updateCheck({ id, name }, constuctor);
    ngDialog.closeAll();
  }

  $scope.createCheckModal = function() {
    ngDialog.open({
      template:'/views/components/createCheckDialog.html',
      className: 'ngdialog-theme-default',
      scope: $scope,
    });
  }

  $scope.editCheck = function(data) {
    $scope.editElement = Object.create(data);
    ngDialog.open({
      template:'/views/components/editCheckDialog.html',
      className: 'ngdialog-theme-default',
      scope: $scope,
    });
  }

  $scope.addCriteriaModal = function(id) {
    $scope.currentElement = Object.create({id});
    ngDialog.open({
      template:'/views/components/addCriteriaDialog.html',
      className: 'ngdialog-theme-default',
      scope: $scope,
    })
  }

}

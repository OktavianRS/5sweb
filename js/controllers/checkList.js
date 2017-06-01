angular
.module('app')
.controller('checkListCtrl', checkListCtrl)

checkListCtrl.$inject = ['$scope', '$state', 'toast', 'ngDialog', 'checkListModel', 'criteriasModel'];
function checkListCtrl($scope, $state, toast, ngDialog, checkListModel, criteriasModel) {
  $scope.checkList = [];
  $scope.criteriasList = [];
  $scope.editElement = {};
  $scope.currentElement = null;
  $scope.viewedChecklist = [];
  $scope.check = {
    name: ''
  }


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

  $scope.settings = {
    bootstrap2: false,
    moveSelectedLabel: 'Move selected only',
    moveAllLabel: 'Move all!',
    removeSelectedLabel: 'Remove selected only',
    removeAllLabel: 'Remove all!',
    moveOnSelect: false,
    preserveSelection: 'moved',
    selectedListLabel: 'The selected',
    nonSelectedListLabel: 'The unselected',
    postfix: '_helperz',
    selectMinHeight: 130,
    infoAll: 'Showing all {0}!',
    infoFiltered: '<span class="label label-warning">Filtered</span> {0} from {1}!',
    infoEmpty: 'Empty list!',

};

  // fetch all initial data
  function constructor() {
    checkListModel.fetchChecks(function(result) {
      $scope.checkList = result.checklists;
      $scope.paginationParams = result.page;
      $scope.paginationParams.totalPages = result.page.pageCount;
      $scope.paginationParams.pageCount = Array.from(Array(result.page.pageCount).keys())
    }, $scope.paginationSetup);
    criteriasModel.fetchCriterias(function(result) {
      $scope.criteriasList = result;

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

  $scope.createCheck = function() {
    checkListModel.createCheck($scope.check, constructor);
    ngDialog.closeAll();
  }

  $scope.deleteCheck = function(id) {
    checkListModel.deleteCheck({ id }, constructor);
  }

  $scope.updateCheck = function(id, name) {
    checkListModel.updateCheck({ id, name }, constructor);
    ngDialog.closeAll();
  }

  $scope.showCriteriaByChecklist = function(check_id, check_name) {
    $state.go('app.checklist-criteria', {check_id, check_name});
  }

  $scope.saveCriterias = function(criteria, id) {
    var arrayOfCriteriasId = criteria.map((v) => {
      return Number(v.id);
    });

    checkListModel.addCriteriaToCheckList({
      checklist_id: id,
      criteria_id: arrayOfCriteriasId
    }, constructor);

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

  $scope.addCriteriaModal = function(checklist_id) {
    $scope.currentElement = checklist_id;
    ngDialog.open({
      template:'/views/components/addCriteriaDialog.html',
      className: 'ngdialog-theme-default',
      scope: $scope,
      controller: [ function  () {
      }],
      resolve: {
        popUp : function popUp () {
        return  checkListModel.fetchCriteriasByCheckList({
          checklist_id: checklist_id
        }, function(result) {
           $scope.criteriasInCheckList = result;


        });
      }


      }
    })
  }

}

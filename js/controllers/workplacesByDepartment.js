/**
 * Created by alex on 26.04.2017.
 */
angular
    .module('app')
    .controller('workplacesByDepartmentCtrl', workplacesByDepartmentCtrl)

workplacesByDepartmentCtrl.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'ngDialog' , 'workplacesModel', 'criteriasModel', 'departmentsModel', 'checkListModel'];
function workplacesByDepartmentCtrl($scope, $rootScope, $state, $stateParams, ngDialog, workplacesModel, criteriasModel, departmentsModel, checkListModel) {

    $scope.workplacesList = [];
    $scope.criteriasList = [];
    $scope.departmentsList = [];
    $scope.checkList = [];
    $scope.AllPlacesList = [];
    $scope.editElement = {};
    $scope.hideDepartment = true;
    $scope.workplace = {
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

    // fetch all initial data
    function constructor() {

        var requestParams = $scope.paginationSetup;
        requestParams.department_id = $stateParams.department_id;

        workplacesModel.fetchAllWorkPlacesByDepartment(requestParams, (result) => {
            $scope.workplacesList = result.places;
            $scope.paginationParams = result.page;
            $scope.paginationParams.totalPages = result.page.pageCount;
            $scope.paginationParams.pageCount = Array.from(Array(result.page.pageCount).keys())
        });
        checkListModel.fetchChecks(function(result) {
            $scope.checkList = result.checklists;
        });
        criteriasModel.fetchCriterias(function(result) {
            $scope.criteriasList = result.criterias;
        });
        departmentsModel.fetchDepartments({}, function(result) {
            $scope.departmentsList = result;
            $scope.workplace.department =   $scope.departmentsList[0];
            $scope.selectedDepartment = $scope.workplace.department;
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

    $scope.createWorkPlace = function() {
        $scope.workplace.department_id = $stateParams.department_id;
        workplacesModel.createWorkPlace($scope.workplace, addCriteriaToWorkPlace);
        ngDialog.closeAll();
    }

    $scope.deleteWorkPlace = function(id) {
        workplacesModel.deleteWorkPlace({ id }, constuctor);
    }

    $scope.updateWorkPlace = function(id, name) {
        const department_id = $stateParams.department_id;
        workplacesModel.updateWorkPlace({ id, name, department_id }, constuctor);
        ngDialog.closeAll();
    }

    $scope.addCriteriaToWorkPlace = addCriteriaToWorkPlace;
    function addCriteriaToWorkPlace (res) {
        if ( $scope.workplace.criteria !== undefined){
            var arrCriteria_id = [];
            $scope.workplace.criteria.forEach(function (item, i, arr){
                arrCriteria_id.push(item.id);
            });
            workplacesModel.addCriteriaToWorkPlace({place_id:res.id,criteria_id:arrCriteria_id},constuctor );
        } else {
            constuctor();
        }
    }

    $scope.showCriteria = function(place_id, place_name) {
      $state.go('app.criteria-by-workplaces', {
        place_id,
        place_name,
        department_id: $stateParams.department_id,
        department_name: $stateParams.department_name
      });
    }

    $scope.editWorkplace = function(data) {
        $scope.editElement = Object.create(data);
        $scope.hideDepartment = true;
        ngDialog.open({
            template:'/views/components/editWorkplaceDialog.html',
            className: 'ngdialog-theme-default',
            scope: $scope,
        });
    }

    $scope.createWorkplaceModal = function() {
      $scope.hideDepartment = true;
      ngDialog.open({
        template:'/views/components/createWorkplaceDialog.html',
        className: 'ngdialog-theme-default',
        scope: $scope,
        preCloseCallback:function(){
            $scope.workplace = {
                name: '',
            }
            $scope.selectedCheckList = '';
        }
      });
    }

    $scope.selectCheck = function (selectedItem) {
        $scope.selectedCheckList = selectedItem;
        checkListModel.fetchCriteriasByCheckList({ checklist_id: selectedItem.id }, function(result) {
            $scope.criteriasList = result.criterias;
        });
    }

}

/**
 * Created by alex on 26.04.2017.
 */
angular
    .module('app')
    .controller('workplacesCtrl', workplacesCtrl)

workplacesCtrl.$inject = ['$scope', '$rootScope', '$state', 'ngDialog' , 'workplacesModel', 'criteriasModel', 'departmentsModel'];
function workplacesCtrl($scope, $rootScope, $state, ngDialog, workplacesModel, criteriasModel, departmentsModel) {

    $scope.workplacesList = [];
    $scope.criteriasList = [];
    $scope.departmentsList = [];
    $scope.AllPlacesList = [];
    $scope.editElement = {};
    $scope.workplace = {
        name: ''
    }
    // $scope.search = {};

    // fetch all initial data
    function constuctor() {

        workplacesModel.fetchWorkPlaces(function(result) {
            $scope.workplacesList = result;
        });
        criteriasModel.fetchCriterias(function(result) {
            $scope.criteriasList = result;
        });
        departmentsModel.fetchDepartments(function(result) {
            $scope.departmentsList = result;
            $scope.workplace.department =   $scope.departmentsList[0];
            $scope.selectedDepartment = $scope.workplace.department;
        });

        departmentsModel.fetchPlacesList(function(result) {
            $scope.AllPlacesList = result;
            // $scope.workplace.department =   $scope.departmentsList[0];
        });

    }
    constuctor();


    $scope.workPlaceState = true;

    $scope.createWorkPlace = function() {
        $scope.workplace.department_id = $scope.workplace.department.id;
        workplacesModel.createWorkPlace($scope.workplace, addCriteriaToWorkPlace);
        ngDialog.closeAll();
    }

    $scope.deleteWorkPlace = function(id) {
        workplacesModel.deleteWorkPlace({ id }, constuctor);
    }

    $scope.updateWorkPlace = function(id, name, department_id) {
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


    $scope.editWorkplace = function(data) {
        $scope.editElement = Object.create(data);

        ngDialog.open({
            template:'/views/components/editWorkplaceDialog.html',
            className: 'ngdialog-theme-default',
            scope: $scope,
        });
    }


    var lastIndex = 1;

    $scope.reset = function() {
        $scope.model = [];
    };

    $scope.add = function() {
        // console.log('ass')
        lastIndex++;
        updateList();
    };

    $scope.showCriteria = function(place_id, place_name) {
      $state.go('app.workplaces-criteria', {place_id, place_name});
    }

    $scope.settings = {
        bootstrap2: false,
        filterClear: 'Show all!',
        filterPlaceHolder: 'Filter!',
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
        filter: true,
        filterNonSelected: '',
        filterSelected: '',
        infoAll: 'Showing all {0}!',
        infoFiltered: '<span class="label label-warning">Filtered</span> {0} from {1}!',
        infoEmpty: 'Empty list!',
        filterValues: true
    };

    $scope.createWorkplaceModal = function() {
      ngDialog.open({
        template:'/views/components/createWorkplaceDialog.html',
        className: 'ngdialog-theme-default',
        scope: $scope,
      });
    }

    $scope.showCriterias = function() {
        ngDialog.open({
            scope:$scope,
            template:'/views/components/criteriasDialog.html',
            className: 'ngdialog-theme-default'
        });
    }

    $scope.selectPlace = selectPlace;

    function selectPlace (selectedItem) {
        $scope.selectedDepartment = selectedItem;
    }


}

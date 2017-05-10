/**
 * Created by alex on 26.04.2017.
 */
angular
    .module('app')
    .controller('workplacesByDepartmentCtrl', workplacesByDepartmentCtrl)

workplacesByDepartmentCtrl.$inject = ['$scope', '$rootScope', '$state', '$stateParams', 'ngDialog' , 'workplacesModel', 'criteriasModel', 'departmentsModel'];
function workplacesByDepartmentCtrl($scope, $rootScope, $state, $stateParams, ngDialog, workplacesModel, criteriasModel, departmentsModel) {

    $scope.workplacesList = [];
    $scope.criteriasList = [];
    $scope.departmentsList = [];
    $scope.AllPlacesList = [];
    $scope.editElement = {};
    $scope.workplace = {
        name: ''
    }

    // fetch all initial data
    function constuctor() {

        workplacesModel.fetchAllWorkPlacesByDepartment({department_id: $stateParams.department_id},(result) => {
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
        });

    }
    constuctor();

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

        ngDialog.open({
            template:'/views/components/editWorkplaceDialog.html',
            className: 'ngdialog-theme-default',
            scope: $scope,
        });
    }

    $scope.createWorkplaceModal = function() {
      ngDialog.open({
        template:'/views/components/createWorkplaceDialog.html',
        className: 'ngdialog-theme-default',
        scope: $scope,
      });
    }

}

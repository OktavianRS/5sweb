angular
.module('app')
.controller('departmentsCtrl', departmentsCtrl)

departmentsCtrl.$inject = ['$scope', '$rootScope', '$state', 'toast', 'loginModel', 'ngDialog', 'departmentsModel', 'companiesModel', 'workplacesModel'];
function departmentsCtrl($scope, $rootScope, $state, toast, loginModel, ngDialog, departmentsModel, companiesModel, workplacesModel) {
  $scope.companiesList = [];
  $scope.departmentsList = [];
  $scope.workPlacesList = [];
  $scope.placesForDepartment = [];

  $scope.sortSettings = 'name';

  $scope.department = {
    name: '',
    company_id: '',
  }

  $scope.options = {
    format: 'hex',
    swatchOnly: true
  }

  // fetch all initial data
  function constuctor() {
    departmentsModel.fetchDepartments((result) => {
      $scope.departmentsList = result;
    });
    companiesModel.fetchCompanies((result) => {
      $scope.companiesList = result;
    });

  }
  constuctor();

  $scope.changeSort = function() {
    $scope.sortSettings === 'name' ? $scope.sortSettings = '-name' : $scope.sortSettings = 'name';
  }

  $scope.createDepartment = function() {
    departmentsModel.createDepartment($scope.department, constuctor);
    ngDialog.closeAll();
  }

  $scope.deleteDepartment = function(id) {
    departmentsModel.deleteDepartment({ id }, constuctor);
  }

  $scope.updateDepartment = function(id, name, company_id) {
    departmentsModel.updateDepartment({ id, name, company_id }, constuctor);
    ngDialog.closeAll();
  }

  $scope.selectDepartment = function(id) {
    $scope.department.company_id = id;
  }

  $scope.createDepartmentModal = function() {
    ngDialog.open({
      template:'/views/components/createDepartmentDialog.html',
      className: 'ngdialog-theme-default',
      scope: $scope,
    });
  }

  $scope.showWorkplace = function(department_id, department_name) {
    $rootScope.department_name = department_name;
    $state.go('app.workplaces-by-department', {department_id, department_name});
  }

  $scope.showWorkplaces = function(department_id) {

    // departmentsCtrl.$inject =
    ngDialog.open({
      template:'/views/components/workplacesDialog.html',
      className: 'ngdialog-theme-default',
      scope: $scope,
      controller: function  (popUpPlaceList) {
         $scope.placesForDepartment = popUpPlaceList;

      },
      resolve: {
        popUpPlaceList: function popUpPlaceList() {
        return departmentsModel.fetchPlacesList(
              function (res) {
                $scope.placesForDepartment = [];
                for (var i=0; i<res.length; i++){
                 if (res[i].id === department_id){
                    $scope.placesForDepartment = res[i];

                   return res[i];
                 }
               }
          })
        }
      }


    });
  }

  $scope.editDepartment = function(data) {
    $scope.editElement = Object.create(data);
    ngDialog.open({
      template:'/views/components/editDepartmentDialog.html',
      className: 'ngdialog-theme-default',
      scope: $scope,
    });
  }
}

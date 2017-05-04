angular
.module('app')
.controller('departmentsCtrl', departmentsCtrl)

departmentsCtrl.$inject = ['$scope', 'toast', 'loginModel', 'ngDialog', 'departmentsModel', 'companiesModel', 'workplacesModel'];
function departmentsCtrl($scope, toast, loginModel, ngDialog, departmentsModel, companiesModel, workplacesModel) {
  $scope.departmentState = true;
  $scope.companiesList = [];
  $scope.departmentsList = [];
  $scope.workPlacesList = [];
  $scope.placesForDepartment = [];

  $scope.department = {
    name: '',
    color: '#20a8d8',
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

  $scope.handleMinimize = function() {
    $scope.departmentState = !$scope.departmentState;
  }

  $scope.createDepartment = function() {
    console.log($scope.department);
    departmentsModel.createDepartment($scope.department, constuctor);
  }

  $scope.deleteDepartment = function(id) {
    departmentsModel.deleteDepartment({ id }, constuctor);
  }

  $scope.updateDepartment = function(id, name, color) {
    departmentsModel.updateDepartment({ id, name, color }, constuctor);
    ngDialog.closeAll();
  }

  $scope.selectDepartment = function(id) {
    $scope.department.company_id = id;
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
                   console.log($scope.placesForDepartment);
                 // return  $scope.placesForDepartment
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

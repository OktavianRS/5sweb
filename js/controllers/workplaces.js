/**
 * Created by alex on 26.04.2017.
 */
angular
    .module('app')
    .controller('workplacesCtrl', workplacesCtrl)

workplacesCtrl.$inject = ['$scope', 'ngDialog' , 'workplacesModel', 'criteriasModel', 'departmentsModel'];
function workplacesCtrl($scope, ngDialog, workplacesModel, criteriasModel, departmentsModel) {

    $scope.workplacesState = true;
    $scope.workplacesList = [];
    $scope.editElement = {};
    $scope.workplace = {
        name: ''
    }
    // $scope.search = {};

    // fetch all initial data
    function constuctor() {

        workplacesModel.fetchWorkPlaces(function(result) {
            $scope.workplacesList = result;
            console.log($scope.workplacesList);
        });
        criteriasModel.fetchCriterias(function(result) {
            $scope.criteriasList = result;
            console.log($scope.criteriasList);
        });
        departmentsModel.fetchDepartments(function(result) {
            $scope.departmentsList = result;
            $scope.workplace.department =   $scope.departmentsList[0];
            console.log($scope.departmentsList);
        });

        departmentsModel.fetchPlacesList(function(result) {
            $scope.AllPlacesList = result;
            // $scope.workplace.department =   $scope.departmentsList[0];
            console.log($scope.AllPlacesList);
        });

    }
    constuctor();


    $scope.workPlaceState = true;

    $scope.handleMinimize = function() {
        $scope.workPlaceState = !$scope.workPlaceState;
    }

    $scope.createWorkPlace = function() {
        $scope.workplace.department_id = $scope.workplace.department.id;
        workplacesModel.createWorkPlace($scope.workplace, addCriteriaToWorkPlace);
    }

    $scope.deleteWorkPlace = function(id) {
        debugger
        workplacesModel.deleteWorkPlace({ id }, constuctor);
    }

    $scope.updateWorkPlace = function(id, name) {
        workplacesModel.updateWorkPlace({ id, name }, constuctor);
        ngDialog.closeAll();
    }

    $scope.addCriteriaToWorkPlace = addCriteriaToWorkPlace;
    function addCriteriaToWorkPlace (res) {

        $scope.workplace.criteria.forEach(function (item, i, arr){
            console.log(item, i, arr);
            if (i < arr.length-1){
                workplacesModel.addCriteriaToWorkPlace({place_id:res.id,criteria_id:item.id});
            } else{
                workplacesModel.addCriteriaToWorkPlace({place_id:res.id,criteria_id:item.id}, constuctor);
            }
        });
        // var place_id = ;
        // var criteria_id = ;
        // $scope.workplace.department_id = $scope.workplace.department.id;
        // workplacesModel.addCriteriaToWorkPlace({place_id:,criteria_id:}, constuctor);
    }


    $scope.editWorkplace = function(data) {
        debugger
        $scope.editElement = Object.create(data);

        ngDialog.open({
            template:'/views/components/editWorkplaceDialog.html',
            className: 'ngdialog-theme-default',
            scope: $scope,
        });
    }


    var lastIndex = 1;
    // $scope.list = [];

    // var updateList = function() {
    //     $scope.list.push({
    //         'id': '_1',
    //         'text': 'one'
    //     },{
    //         'id': '_2',
    //         'text': 'two'
    //     },{
    //         'id': '_3',
    //         'text': 'three'
    //     },{
    //         'id': '_4',
    //         'text': 'four'
    //     });
    // };

    $scope.reset = function() {
        $scope.model = [];
    };

    $scope.add = function() {
        // console.log('ass')
        lastIndex++;
        updateList();
    };

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

    // updateList();


    $scope.departments = [
        {
            name: 'department1',
            id: 12,
            color: 'rgba(75,192,192,1)',
            places: [
                {name: 'Lagerbereich 1', id: 56, current:77, previeus: 100, last:83},
                {name: 'Breitgang', id: 89, current:77, previeus: 100, last:83},
                {name: 'Ladegeräte', id: 84, current:99, previeus: 58, last:83},
                {name: 'Lagerbereich 1', id: 546, current:77, previeus: 100, last:83},
                {name: 'Breitgang', id: 57, current:77, previeus: 100, last:83},
                {name: 'Ladegeräte', id: 86754, current:77, previeus: 100, last:83},
            ]
        },
        {
            name: 'department2',
            id: 13,
            color: 'rgba(255, 66, 66, 1)',
            places: [
                {name: 'SOS-Station', id: 56, current:77, previeus: 100, last:83},
                {name: 'Feuerlöscher', id: 564, current:77, previeus: 100, last:83},
                {name: 'SOS-Station', id: 44, current:77, previeus: 100, last:83},
                {name: 'Feuerlöscher', id: 5654, current:77, previeus: 100, last:83},
                {name: 'SOS-Station', id: 565, current:77, previeus: 100, last:83},
                {name: 'Feuerlöscher', id: 54564, current:77, previeus: 77, last:83},
                {name: 'SOS-Station', id: 8, current:77, previeus: 100, last:100},
                {name: 'Feuerlöscher', id: 56764, current:83, previeus: 83, last:83},
                {name: 'SOS-Station', id: 4764},
                {name: 'Feuerlöscher', id: 545654},
                {name: 'SOS-Station', id: 5655},
                {name: 'Feuerlöscher', id: 574564},
                {name: 'Kontrolle 1', id: 5665},
                {name: 'Kontrolle 1', id: 561},
                {name: 'Kontrolle 1', id: 562},
                {name: 'Kontrolle 1', id: 563},
                {name: 'Kontrolle 1', id: 56467},
                {name: 'Kontrolle 1', id: 556576},
                {name: 'Kontrolle 1', id: 657566},
                {name: 'Kontrolle 1', id: 85656},
                {name: 'Kontrolle 1', id: 56596},
                {name: 'Kontrolle 1', id: 556736},
                {name: 'Kontrolle 1', id: 52656},
                {name: 'Kontrolle 1', id: 565613},
                {name: 'Kontrolle 1', id: 565662},
                {name: 'Kontrolle 1', id: 5633},
                {name: 'Kontrolle 1', id: 5464},
                {name: 'Kontrolle 1', id: 5656},
                {name: 'Kontrolle 1', id: 5366},
                {name: 'Kontrolle 1', id: 8656},
                {name: 'Kontrolle 1', id: 576},
                {name: 'Kontrolle 1', id: 53836},
                {name: 'Kontrolle 1', id: 5246},
                {name: 'Kontrolle 1', id: 56373},
                {name: 'Kontrolle 1', id: 546874},
                {name: 'Kontrolle 1', id: 567656},
                {name: 'Kontrolle 1', id: 576366},
                {name: 'Kontrolle 1', id: 866756},
                {name: 'Kontrolle 1', id: 58776},
                {name: 'Kontrolle 1', id: 5683836},
                {name: 'Kontrolle 1', id: 579246},
            ]
        },

        {
            name: 'department3',
            id: 15,
            color: 'rgba(54, 64, 247, 1)',
            places: [
                {name: 'Kontrolle 1', id: 56},
                {name: 'Kontrolle 1', id: 561},
                {name: 'Kontrolle 1', id: 562},
                {name: 'Kontrolle 1', id: 563},
                {name: 'Kontrolle 1', id: 564},
                {name: 'Kontrolle 1', id: 556},
                {name: 'Kontrolle 1', id: 566},
                {name: 'Kontrolle 1', id: 856},
                {name: 'Kontrolle 1', id: 596},
                {name: 'Kontrolle 1', id: 536},
                {name: 'Kontrolle 1', id: 526},
                {name: 'Kontrolle 1', id: 5613},
                {name: 'Kontrolle 1', id: 5662},
                {name: 'Kontrolle 1', id: 5633},
                {name: 'Kontrolle 1', id: 5464},
                {name: 'Kontrolle 1', id: 5656},
                {name: 'Kontrolle 1', id: 5366},
                {name: 'Kontrolle 1', id: 8656},
                {name: 'Kontrolle 1', id: 576},
                {name: 'Kontrolle 1', id: 53836},
                {name: 'Kontrolle 1', id: 5246},
            ]
        },
    ];

    $scope.places = [
        {name:'Lagerbereich 1', id:56},
        {name:'Breitgang', id:89},
        {name:'Ladegeräte', id:84},
        {name:'Lagerbereich 1', id:566},
        {name:'Breitgang', id:57},
        {name:'Ladegeräte', id:86754},
    ],





    $scope.showCriterias = function() {
        ngDialog.open({
            scope:$scope,
            template:'/views/components/criteriasDialog.html',
            className: 'ngdialog-theme-default'
        });
    }


}

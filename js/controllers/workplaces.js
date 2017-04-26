/**
 * Created by alex on 26.04.2017.
 */
angular
    .module('app')
    .controller('workplacesCtrl', workplacesCtrl)

workplacesCtrl.$inject = ['$scope'];
function workplacesCtrl($scope) {

    $scope.departmentState = true;

    $scope.handleMinimize = function() {
        $scope.departmentState = !$scope.departmentState;
    }

    var lastIndex = 1;
    $scope.list = [];

    var updateList = function() {
        $scope.list.push({
            'id': '_1',
            'text': 'one'
        },{
            'id': '_2',
            'text': 'two'
        },{
            'id': '_3',
            'text': 'three'
        },{
            'id': '_4',
            'text': 'four'
        });
    };

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

    updateList();

}
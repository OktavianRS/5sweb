/**
 * Created by alex on 25.04.2017.
 */
angular
    .module('app')
    .controller('DashboardChart', DashboardChart);


DashboardChart.$inject = ['$scope', '$timeout', 'departmentsModel', 'workplacesModel', 'chartsModel'];
function DashboardChart($scope, $timeout, departmentsModel, workplacesModel, chartsModel) {
    $scope.search = {};
    var HeaderDepartment = {
            name: 'Show all departments',
            id: 'null',
        },
        HeaderWorkplaces ={name:'Show all workplaces', id:'null'};

    function convertHex(hex, opacity) {
        hex = hex.replace('#', '');
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);

        result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')';
        return result;
    }

    // generate color for last week
    function lastWeekColor(currentWeekColor) {
        if (typeof currentWeekColor !== 'object' ) {
            currentWeekColor = Array(currentWeekColor);
        }

        return currentWeekColor.map(
            function (item, i, arr) {
                return convertHex(arr[i], 50);
            }
        )
    }

    // TODO carrent, last, target
   var  data3 = [90, 90, 90, 90, 90, 90],
        data4 = [100, 100, 100, 100, 100, 100],
        data5 = [80, 80, 80, 80, 80, 80];

    $scope.labels = [];
    $scope.data = [];
    $scope.colors = [];
    $scope.data = [];
    $scope.series = ["Current", "Target", "Last"];

    // fetch all initial data
    function constuctor() {

        chartsModel.fetchChartByCompany({company_id:1}, function callback (result) {
            console.log(result);
             changesChartAndTable(result);
        });


        workplacesModel.fetchAllWorkPlaces(function(result) {
            $scope.workplacesList = result;
            $scope.withHeaderWorkPlaces = $scope.workplacesList.slice();
            $scope.withHeaderWorkPlaces.splice(0,0, HeaderWorkplaces);
            $scope.search.place = HeaderWorkplaces;
            console.log($scope.workplacesList);
        });

        departmentsModel.fetchPlacesList(function(result) {
            $scope.AllDepartmentsList = result;

            $scope.departmentsList = $scope.AllDepartmentsList.slice();
            $scope.withHeaderDepartments = $scope.departmentsList.slice();
            $scope.withHeaderDepartments.splice(0,0, HeaderDepartment)
            $scope.search.department =  HeaderDepartment;
            console.log($scope.departmentsList);

            // $timeout(function () {
            //     // $scope.table = $scope.AllDepartmentsList.slice();
            // },0);

        });

    }
    constuctor();







    $scope.datasetOverride = [
        {}, {},
        {
            label: "target",
            borderWidth: 3,
            type: 'line',
            pointRadius: 0,
            backgroundColor: 'transparent',
            borderColor: '#a32428',
            pointHoverBackgroundColor: '#a32428',
            pointHoverBorderColor: '#a32428'
        },
        {

            label: "last",
            borderWidth: 3,
            type: 'line',
            pointRadius: 0,
            backgroundColor: 'transparent',
            borderColor: '#339163',
            pointHoverBackgroundColor: '#339163',
            pointHoverBorderColor: '#339163'
        },
        {
            label: "current",
            borderWidth: 3,
            type: 'line',
            pointRadius: 0,
            backgroundColor: 'transparent',
            borderColor: '#e8f170',
            pointHoverBackgroundColor: '#e8f170',
            pointHoverBorderColor: '#e8f170'
        },

    ];
    $scope.options = {
        responsive: true,
        maintainAspectRatio: false,
        scaleShowLabels: false,
        tooltips: {
            enabled: true,
            mode: 'single',
            callbacks: {
                label: function (tooltipItems, data) {
                    return tooltipItems.yLabel + '% ' + (week(tooltipItems));
                }
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    max: 100,
                    min: 0,
                    stepSize: 10,
                    callback: function (value, index, values) {
                        return value + '%';
                    }
                }
            }]
        },
    }

// show in tooltips which week
    function week(tooltipItems) {
        if (tooltipItems.datasetIndex === 0) weekTitle = 'current week';
        if (tooltipItems.datasetIndex === 1) weekTitle = 'previous week';
        return weekTitle;
    };








    $scope.selectDepartment = selectDepartment;
    $scope.selectPlace = selectPlace;

   function selectDepartment (item) {
    if (item.id === null){
        chartsModel.fetchChartByCompany({company_id:1}, function callback (result) {
            console.log(result);
            changesChartAndTable(result);
        });
    } else {
        chartsModel.fetchChartByDepartment({department_id:item.id}, function callback (result) {

            changesChartAndTable (result);

            $scope.departmentsList = $scope.AllDepartmentsList.filter(
                function (value) {
                    return value.id === item.id
                }
            );

            $scope.workplacesList = $scope.departmentsList[0].places;
            $scope.withHeaderWorkPlaces = $scope.workplacesList.slice();
            $scope.withHeaderWorkPlaces.splice(0,0, HeaderWorkplaces);
            $scope.search.place = HeaderWorkplaces;

        });
        }
    }

    function selectPlace (item) {
        chartsModel.fetchChartByPlace({place_id:item.id}, function callback (result) {
            changesChartAndTable (result);
        } );
}


function changesChartAndTable (result) {
    // if we have string then push it in array
    for (var i in result) {
        if (typeof result[i] !== 'object') {
            result[i] = [result[i]];
        }
    }

///// functional for chart//////
    $scope.labels = result.placeName;

    data1 = result.placeCurrentScore;  // current week
    countScore(data1, 0);
    data2 = result.placeLastScore;  // previous week
    countScore(data2, 1);
    function countScore(dataScore, i) {
        if (dataScore.length > 1) {
            $scope.data[i] = dataScore;
        } else {
            $scope.data[i] = [];
            $scope.data[i].push(dataScore);
        }
    }


    $scope.colors = [
        {
            backgroundColor: result.departmentColor,
            borderColor: result.departmentColor,
            pointHoverBackgroundColor: '#fff'
        },
        {
            backgroundColor: lastWeekColor(result.departmentColor),
            borderColor: result.departmentColor,
            pointHoverBackgroundColor: '#fff'
        },
    ];

    //// functional for table//////
    $scope.table = result;
    if ($scope.table.placeName.length<2) {
        for (var i=2;i< Object.keys($scope.table).length;i++) {
            $scope.data[i] = [];
        }
    }
}



}

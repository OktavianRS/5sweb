/**
 * Created by alex on 25.04.2017.
 */
angular
    .module('app')
    .controller('DashboardChart', DashboardChart);


DashboardChart.$inject = ['$scope', '$timeout', 'departmentsModel', 'workplacesModel', 'companiesModel', 'chartsModel'];
function DashboardChart($scope, $timeout, departmentsModel, workplacesModel, companiesModel, chartsModel) {
    $scope.search = {};

    var headerFilter={
        company:{
            name: 'Show all companies',
            id: 'null',
        },
        department:{
            name: 'Show all departments',
            id: 'null',
        },
        workplace:{
            name: 'Show all workplaces',
            id: 'null',
        }
    }

    // var HeaderDepartment = {
    //         name: 'Show all departments',
    //         id: 'null',
    //     },
    //     HeaderWorkplaces ={name:'Show all workplaces', id:'null'};

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

    // histiry audit
    $scope.historyAudit={
        // labels:['qwert', 'tyui'],
        data:[[10,100], [20,50], [30]],
        colors:[],
    };

    $scope.historyAudit.datasetOverride = [
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

    $scope.historyAudit.options = {
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
            }],
            xAxes: [{
                ticks: {
                    max: 100,
                    min: 0,
                    stepSize: 10,
                }
            }]
        },
    }



        google.charts.load('current', {
            'packages': ['timeline']
        });
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {
            var container = document.getElementById('timeline');
            var chart = new google.visualization.Timeline(container);
            var dataTable = new google.visualization.DataTable();

            dataTable.addColumn({
                type: 'string',
                id: 'President'
            });

            dataTable.addColumn({
                type: 'date',
                id: 'Start'
            });
            dataTable.addColumn({
                type: 'date',
                id: 'End'
            });
            dataTable.addRows([
                ['department1', new Date(2016, 3, 30), new Date(2016, 6, 4)],
                ['department1', new Date(2016, 7, 4), new Date(2016, 8, 4)],
                ['department1', new Date(2016, 10, 4), new Date(2016, 12, 4)],
                ['department2', new Date(2016, 8, 30), new Date(2016, 9, 3)],
                ['department2', new Date(2016, 9, 4), new Date(2016, 10, 4)],
                ['department2', new Date(2016, 8, 30), new Date(2016, 9, 3)],
                ['department3', new Date(2016, 10, 4), new Date(2016, 11, 4)],
                ['department3', new Date(2016, 8, 4), new Date(2016, 9, 4)],
            ]);

            chart.draw(dataTable);
        }








    // histiry score
    $scope.historyScore={
        labels: ["Audit1", "Audit2", "Audit3", "Audit4", "Audit5", "Audit6", "Audit7"],
        data:[
            [17, 25, 22, 20, 8, 10, 7],
            [21, 28, 24, 25, 12, 13, 15],
            [25, 32, 31, 26, 18, 19, 16],
        ],
        colors:[],
    };

    $scope.historyScore.datasetOverride = [
        {
            label: "target",
            borderWidth: 3,
            type: 'line',
            pointRadius: 3,
            backgroundColor: '#a32428',
            borderColor: '#a32428',
            pointHoverBackgroundColor: '#a32428',
            pointHoverBorderColor: '#a32428'
        },
        {

            label: "last",
            borderWidth: 3,
            type: 'line',
            pointRadius: 3,
            backgroundColor: '#339163',
            borderColor: '#339163',
            pointHoverBackgroundColor: '#339163',
            pointHoverBorderColor: '#339163'
        },
        {
            label: "current",
            borderWidth: 3,
            type: 'line',
            pointRadius: 3,
            backgroundColor: '#e8f170',
            borderColor: '#e8f170',
            pointHoverBackgroundColor: '#e8f170',
            pointHoverBorderColor: '#e8f170'
        },

    ];

    $scope.historyScore.options = {
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
            // yAxes: [{
            //     ticks: {
            //         max: 100,
            //         min: 0,
            //         stepSize: 10,
            //         callback: function (value, index, values) {
            //             return value;
            //         }
            //     }
            // }],
        },
    }









    // TODO carrent, last, target
   var  data3 = [90, 90, 90, 90, 90, 90],
        data4 = [100, 100, 100, 100, 100, 100],
        data5 = [80, 80, 80, 80, 80, 80];

    $scope.labels = [];
    $scope.data = [];
    $scope.colors = [];
    $scope.series = ["Current", "Target", "Last"];

    // fetch all initial data
    function constuctor() {

        chartsModel.fetchChartByCompany({company_id:1}, function callback (result) {
            console.log(result);
            changesChart(result);
        });

        companiesModel.fetchCompanies(function(result) {
            $scope.companiesList = result;
            $scope.withHeaderCompaniesList = $scope.companiesList.slice();
            $scope.withHeaderCompaniesList.splice(0,0, headerFilter.company);
            $scope.search.company = headerFilter.company;
            console.log($scope.companiesList);
        });

        workplacesModel.fetchAllWorkPlaces(function(result) {
            $scope.workplacesList = result;
            $scope.withHeaderWorkPlaces = $scope.workplacesList.slice();
            $scope.withHeaderWorkPlaces.splice(0,0, headerFilter.workplace);
            $scope.search.place = headerFilter.workplace;
            console.log($scope.workplacesList);
        });

        departmentsModel.fetchPlacesList(function(result) {
            $scope.AllDepartmentsList = result;

            $scope.departmentsList = $scope.AllDepartmentsList.slice();
            $scope.withHeaderDepartments = $scope.departmentsList.slice();
            $scope.withHeaderDepartments.splice(0,0, headerFilter.department)
            $scope.search.department =  headerFilter.department;
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








    $scope.selectCompany = selectCompany;
    $scope.selectDepartment = selectDepartment;
    $scope.selectPlace = selectPlace;


    function selectCompany (item) {
        if (item.id === null){
            chartsModel.fetchChartByCompany({company_id:1}, function callback (result) {
                console.log(result);
                changesChart(result);
            });
        } else {
            chartsModel.fetchChartByDepartment({department_id:item.id}, function callback (result) {

                changesChart (result);

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


   function selectDepartment (item) {
    if (item.id === null){
        chartsModel.fetchChartByCompany({company_id:1}, function callback (result) {
            console.log(result);
            changesChart(result);
        });
    } else {
        chartsModel.fetchChartByDepartment({department_id:item.id}, function callback (result) {

            changesChart (result);

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
            changesChart (result);
        } );
}


function changesChart (result) {
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
    // $scope.table = result;
    // if ($scope.table.placeName.length<2) {
    //     for (var i=2;i< Object.keys($scope.table).length;i++) {
    //         $scope.data[i] = [];
    //     }
    // }
}



}

/**
 * Created by alex on 25.04.2017.
 */
angular
    .module('app')
    .controller('DashboardChart', DashboardChart);


DashboardChart.$inject = ['$rootScope','$scope', '$window', '$timeout', 'departmentsModel', 'workplacesModel', 'companiesModel', 'chartsModel'];
function DashboardChart($rootScope, $scope, $window, $timeout, departmentsModel, workplacesModel, companiesModel, chartsModel) {
    $scope.search = {};


    // headers and configuration of visible company filter and disabled of department+workplaces
    var isSuperAdmin = true;
    var headerFilter = {
        company: {
            name: 'Show all companies',
            id: null,
            isDisabled: false,
        },
        department: {
            name: 'Show all departments',
            id: null,
            isDisabled: isSuperAdmin || false,
        },
        workplace: {
            name: 'Show all workplaces',
            id: null,
            isDisabled: true,
        }
    }

    $scope.headerFilter = headerFilter;


    // configuration of color of colomns
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
        if (typeof currentWeekColor !== 'object') {
            currentWeekColor = Array(currentWeekColor);
        }

        return currentWeekColor.map(
            function (item, i, arr) {
                return convertHex(arr[i], 50);
            }
        )
    }

    // show in tooltips which week
    function week(tooltipItems) {
        if (tooltipItems.datasetIndex === 0) weekTitle = 'current week';
        if (tooltipItems.datasetIndex === 1) weekTitle = 'previous week';
        return weekTitle;
    };


    // google chart time-line
    // histiry audit

    var addRows = [
        ['department1', new Date(2016, 5, 4), new Date(2016, 6, 4)],
        ['department1', new Date(2016, 7, 4), new Date(2016, 8, 4)],
        ['department1', new Date(2016, 10, 4), new Date(2016, 12, 4)],
        ['department2', new Date(2016, 8, 30), new Date(2016, 9, 3)],
        ['department2', new Date(2016, 9, 4), new Date(2016, 10, 4)],
        ['department2', new Date(2016, 8, 30), new Date(2016, 9, 3)],
        ['department3', new Date(2016, 10, 4), new Date(2016, 11, 4)],
        ['department3', new Date(2016, 8, 4), new Date(2016, 9, 4)],
    ];
    google.charts.load('current', {
        'packages': ['timeline']
    });
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var container = document.getElementById('timeline');
        var chart = new google.visualization.Timeline(container);
        var dataTable = new google.visualization.DataTable();

        dataTable.addColumn({type: 'string', id: 'Name'});
        dataTable.addColumn({type: 'date', id: 'Start'});
        dataTable.addColumn({type: 'date', id: 'End'});
        dataTable.addRows(addRows);
        var rowHeight = 30;
        var chartHeight = (dataTable.getNumberOfRows() + 1) * rowHeight;
        var options = {
            avoidOverlappingGridLines: true,
            height: chartHeight,
            width: '100%',
        };
        chart.draw(dataTable, options);
        if (chartHeight < 400) {
            $scope.timelineHeight = {height: chartHeight * 0.6};
        } else {
            $scope.timelineHeight = 300
        }
    }


    angular.element($window).on('resize', function () {
        google.charts.setOnLoadCallback(drawChart);

        // manuall $digest required as resize event
        // is outside of angular
        //  $scope.$digest();
    });
    //
    $rootScope.$on('changeWidthChart', function (event, data) {
        google.charts.setOnLoadCallback(drawChart);
    });


    // histiry score
    $scope.historyScore = {
        labels: ["Audit1", "Audit2", "Audit3", "Audit4", "Audit5", "Audit6", "Audit7"],
        data: [
            [17, 25, 22, 20, 8, 10, 7],
            [21, 28, 24, 25, 12, 13, 15],
            [25, 32, 31, 26, 18, 19, 16],
        ],
    };

    $scope.historyScore.datasetOverride = [
        {
            label: "target",
            borderWidth: 3,
            type: 'line',
            pointRadius: 3,
            backgroundColor: '#339163',
            borderColor: '#339163',
            pointHoverBackgroundColor: '#339163',
            pointHoverBorderColor: '#339163'
        },
        {

            label: "last",
            borderWidth: 3,
            type: 'line',
            pointRadius: 3,
            backgroundColor: '#e8f170',
            borderColor: '#e8f170',
            pointHoverBackgroundColor: '#e8f170',
            pointHoverBorderColor: '#e8f170'
        },
        {
            label: "current",
            borderWidth: 3,
            type: 'line',
            pointRadius: 3,
            backgroundColor: '#a32428',
            borderColor: '#a32428',
            pointHoverBackgroundColor: '#a32428',
            pointHoverBorderColor: '#a32428'
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
                    return tooltipItems.yLabel + ' score ';
                }
            }
        },
        scales: {},
    }


    // TODO carrent, last, target
    var data3 = [90, 90, 90, 90, 90, 90],
        data4 = [100, 100, 100, 100, 100, 100],
        data5 = [80, 80, 80, 80, 80, 80];

    $scope.labels = [];
    $scope.data = [];
    $scope.colors = [];
    $scope.series = ["Current", "Target", "Last"];

    // fetch all initial data
    function constuctor() {

        chartsModel.fetchScoreByCompany({company_id: 1}, function callback(result) {

            changesChart(result);
        });

        companiesModel.fetchCompanies(function (result) {
            $scope.companiesList = result;
            $scope.withHeaderCompaniesList = $scope.companiesList.slice();
            $scope.withHeaderCompaniesList.splice(0, 0, headerFilter.company);
            $scope.search.company = headerFilter.company;

        });

        workplacesModel.fetchAllWorkPlaces(function (result) {
            $scope.workplacesList = result;
            $scope.withHeaderWorkPlaces = $scope.workplacesList.slice();
            $scope.withHeaderWorkPlaces.splice(0, 0, headerFilter.workplace);
            $scope.search.place = headerFilter.workplace;

        });

        departmentsModel.fetchPlacesList(function (result) {
            $scope.AllDepartmentsList = result;

            $scope.departmentsList = $scope.AllDepartmentsList.slice();
            $scope.withHeaderDepartments = $scope.departmentsList.slice();
            $scope.withHeaderDepartments.splice(0, 0, headerFilter.department)
            $scope.search.department = headerFilter.department;


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
                    return function () {
                        if ($scope.data.length == 1) {
                            return tooltipItems.yLabel + ' score'
                        } else {
                            return tooltipItems.yLabel + '% ' + (week(tooltipItems));
                        }
                    }();

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
                        return function () {
                            if ($scope.data.length == 1) {
                                return value + ' score'
                            } else {
                                return value + '%';
                            }
                        }();
                    }
                }
            }]
        },
    }


// selected inputs (filters)

    $scope.selectCompany = selectCompany;
    $scope.selectDepartment = selectDepartment;
    $scope.selectPlace = selectPlace;


    function selectCompany(item) {
        headerFilter.department.isDisabled = true;
        headerFilter.workplace.isDisabled = true;
        if (item.id === null) {
            headerFilter.department.isDisabled = true;
            headerFilter.workplace.isDisabled = true;
            $scope.search.department = headerFilter.department;
            $scope.search.place = headerFilter.workplace;
            companiesModel.fetchCompanies(function (result) {

                // changesAuditHistory(result);
                changesScoreHistory(result)
                changesChart(result);
            });

        } else {

            chartsModel.fetchChartByCompany({company_id: item.id}, function callback(result) {
                //TODO...
                headerFilter.department.isDisabled = false;
                // changesAuditHistory(result);
                changesScoreHistory(result)

            });
            chartsModel.fetchScoreByCompany({company_id: item.id}, function callback(result) {
                changesChart(result);
            });
        }
    }


    function selectDepartment(item) {
        headerFilter.workplace.isDisabled = true;
        if (item.id === null) {
            $scope.search.place = headerFilter.workplace;

            departmentsModel.fetchPlacesList(function (result) {

                $scope.departmentsList = result;
                $scope.withHeaderDepartments = $scope.departmentsList.slice();
                $scope.withHeaderDepartments.splice(0, 0, headerFilter.department)
                $scope.search.department = headerFilter.department;

            });

            chartsModel.fetchScoreByCompany({company_id: $scope.search.company.id}, function callback(result) {
                changesChart(result);
            });


        } else {
            chartsModel.fetchChartByDepartment({department_id: item.id}, function callback(result) {


                changesScoreHistory(result)
                changesChart(result);

                $scope.departmentsList = $scope.AllDepartmentsList.filter(
                    function (value) {
                        return value.id === item.id
                    }
                );

                $scope.workplacesList = $scope.departmentsList[0].places;
                $scope.withHeaderWorkPlaces = $scope.workplacesList.slice();
                $scope.withHeaderWorkPlaces.splice(0, 0, headerFilter.workplace);
                $scope.search.place = headerFilter.workplace;


                headerFilter.workplace.isDisabled = false;

            });

            chartsModel.fetchAuditHistoryByDepartment({department_id: item.id}, function callback(result) {
                changesAuditHistory(result);
            });

            chartsModel.fetchScoreByDepartment({department_id: item.id}, function callback(result) {
                changesChart(result);
            });

        }
        ;


    }

    function selectPlace(item) {
        if (item.id === null) {


            chartsModel.fetchScoreByDepartment({department_id: $scope.search.department.id}, function callback(result) {
                changesChart(result);
            });

        } else {

            chartsModel.fetchChartByPlace({place_id: item.id}, function callback(result) {
            });

            chartsModel.fetchAuditHistoryByPlace({place_id: item.id}, function callback(result) {
                changesAuditHistory(result);
            });

            chartsModel.fetchScoreByPlace({place_id: item.id}, function callback(result) {
                changesChart(result);
            });


        }
    };

    // chartsModel.fetchAuditHistoryByPlace({place_id:item.id},function callback (result) {
    //     changesAuditHistory(result)
    // });


///// functional for chart - Score//////
    function changesChart(result) {

        if (result.errors === 'The requested place has not any started audit') {
            $scope.scoreByError = true;
        } else {
            $scope.scoreByError = false;
        }

        // if we have string then push it in array
        for (var i in result) {
            if (typeof result[i] !== 'object') {
                result[i] = [result[i]];
            }
        }

        if (result.departmentName && !result.placeName) {
            $scope.labels = result.departmentName;
            data1 = result.departmentCurrentScore;  // current week
            data2 = result.departmentLastScore;  // previous week
            $scope.options.scales.yAxes[0].ticks.max = 100;
            $scope.options.scales.yAxes[0].ticks.stepSize = 10;
            countScore(data1, 0);
            countScore(data2, 1);
        }
        else if (result.placeName && result.departmentName) {
            $scope.labels = result.placeName;
            data1 = result.placeCurrentScore;  // current week
            data2 = result.placeLastScore;  // previous week
            $scope.options.scales.yAxes[0].ticks.max = 100;
            $scope.options.scales.yAxes[0].ticks.stepSize = 10;
            countScore(data1, 0);
            countScore(data1, 0);
            countScore(data2, 1);
        }
        else if (result.criteriaName) {
            $scope.labels = result.criteriaName;
            var data1 = result.criteriaStatus;
            $scope.data = [];
            $scope.options.scales.yAxes[0].ticks.max = 3;
            $scope.options.scales.yAxes[0].ticks.stepSize = 1;
            countScore(data1, 0);
        }


        function countScore(dataScore, i) {

            if (dataScore.length > 1) {
                $scope.data[i] = dataScore;
            } else {
                $scope.data[i] = [];
                $scope.data[i].push(dataScore);
            }
        }


        // console.log($scope.colors   ,'$scope.colors[1].backgroundColor')

        // var colors =  [ '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'];

        // $scope.colors = [
        //     {
        //         backgroundColor: result.departmentColor,
        //         borderColor: result.departmentColor,
        //         pointHoverBackgroundColor: '#fff'
        //     },
        //     {
        //         backgroundColor: lastWeekColor(result.departmentColor),
        //         borderColor: result.departmentColor,
        //         pointHoverBackgroundColor: '#fff'
        //     },
        // ];


    }

    function changesAuditHistory(result) {



        var NumberToDate = result.map(function (item) {
            item.length = 3;
            var newItem = item.map(function (innerItem, i, arr) {
                if (i > 0) {
                    if ((i === 2) && (innerItem === null || innerItem === 0)) {
                        innerItem = new Date();
                    }
                    else if ((i === 1) && (innerItem === null || innerItem === 0)) {
                        innerItem = new Date();
                    }
                    else {
                        innerItem = new Date(innerItem * 1000);
                    }
                }
                return innerItem;
            });
            return newItem;
        });
        var addRows = NumberToDate;

        // var addRows=[
        //         ['department1', new Date(now), new Date()],
        //         ['department1', new Date(), new Date()]
        // ];
        // var addRows = [
        //     ['department1', new Date(1493996348), new Date()],
        //     ['department1', new Date(2016, 7, 4), new Date(2016, 8, 4)],
        //     ['department1', new Date(2016, 10, 4), new Date(2016, 12, 4)],
        //     ['department2', new Date(2016, 8, 30), new Date(2016, 9, 3)],
        //     ['department2', new Date(2016, 9, 4), new Date(2016, 10, 4)],
        //     ['department2', new Date(2016, 8, 30), new Date(2016, 9, 3)],
        //     ['department3', new Date(2016, 10, 4), new Date(2016, 11, 4)],
        //     ['department3', new Date(2016, 8, 4), new Date(2018, 9, 4)],
        //     ['department4', new Date(2016, 8, 4), new Date(2018, 9, 4)],
        //     ['department5', new Date(2016, 8, 4), new Date(2018, 9, 4)],
        //
        // ];
        google.charts.load('current', {
            'packages': ['timeline']
        });
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
            var container = document.getElementById('timeline');
            var chart = new google.visualization.Timeline(container);
            var dataTable = new google.visualization.DataTable();

            dataTable.addColumn({type: 'string', id: 'Name'});
            dataTable.addColumn({type: 'date', id: 'Start'});
            dataTable.addColumn({type: 'date', id: 'End'});
            dataTable.addRows(addRows);
            var rowHeight = 30;
            if (addRows.length == 1) var rowHeight = 60;
            // if (addRows.length > 4) var rowHeight = 30;
            //  if (addRows.length > 8) var rowHeight = 20;
            var chartHeight = (dataTable.getNumberOfRows() + 1) * rowHeight;
            if (addRows.length > 10) var chartHeight = 300;

            var options = {
                avoidOverlappingGridLines: true,
                height: chartHeight,
                width: '100%',
            };
            chart.draw(dataTable, options);

            if (addRows.length == 1) {
                $scope.timelineHeight = {height: chartHeight * 2};
            } else if (addRows.length < 8) {
                $scope.timelineHeight = {height: chartHeight * 0.8};
            } else {
                $scope.timelineHeight = {height: chartHeight * 0.9};
            }
        }

    }


    function changesScoreHistory(result) {
        $scope.historyScore = {
            labels: ["Audit1", "Audit2", "Audit3", "Audit4", "Audit5", "Audit6", "Audit7"],
            data: [
                [17, 25, 22, 40, 8, 10, 7],
                [21, 96, 24, 20, 12, 13, 15],
                [25, 32, 31, 26, 18, 19, 16],
            ],
        };
    }



}

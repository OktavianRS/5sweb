/**
 * Created by alex on 25.04.2017.
 */
angular
    .module('app')
    .controller('DashboardChart', DashboardChart);


DashboardChart.$inject = ['$rootScope','$scope', '$sessionStorage', '$window', '$timeout', 'departmentsModel', 'workplacesModel', 'companiesModel', 'chartsModel', 'auditModel'];
function DashboardChart($rootScope, $scope, $sessionStorage, $window, $timeout, departmentsModel, workplacesModel, companiesModel, chartsModel, auditModel) {


    // var USER_ROLE = $sessionStorage.role;
    // if (USER_ROLE == 'site admin') var isSuperAdmin = true;

    $scope.search = {};
    $scope.auditStop = auditStop;

    // headers and configuration of visible company filter and disabled of department+workplaces

    var headerFilter = {
        company: {
            name: 'Show all companies',
            id: null,
            isDisabled: false,
        },
        department: {
            name: 'Show all departments',
            id: null,
            isDisabled: false,
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


    //////////////// google chart time-line -- init ///////////////
    /////////////// histiry audit //////////////////////

    var drawChart; // init variable for observe change of width


    angular.element($window).on('resize', function () {

        if (!$scope.AuditHistoryIsEmpty) google.charts.setOnLoadCallback(drawChart);

        // manuall $digest required as resize event
        // is outside of angular
        $scope.$digest();
    });

    $rootScope.$on('changeWidthChart', function (event, data) {
        if (!$scope.AuditHistoryIsEmpty)  google.charts.setOnLoadCallback(drawChart);
    });



    ////////////////// chart history score -- init //////////////////

    $scope.labels = [];
    $scope.data = [];
    $scope.colors = [];
    $scope.series = ["Current", "Target", "Last"];
    $scope.historyScore={};
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
        scales: {
            yAxes: [{
                ticks: {
                    min: 0,
                },
            }]
        }
    };



///// 3 chart -- init //////
//     $scope.datasetOverride = [
//         {}, {},
//         {
//             label: "target",
//             borderWidth: 3,
//             type: 'line',
//             pointRadius: 0,
//             backgroundColor: 'transparent',
//             borderColor: '#a32428',
//             pointHoverBackgroundColor: '#a32428',
//             pointHoverBorderColor: '#a32428'
//         },
//         {
//
//             label: "last",
//             borderWidth: 3,
//             type: 'line',
//             pointRadius: 0,
//             backgroundColor: 'transparent',
//             borderColor: '#339163',
//             pointHoverBackgroundColor: '#339163',
//             pointHoverBorderColor: '#339163'
//         },
//         {
//             label: "current",
//             borderWidth: 3,
//             type: 'line',
//             pointRadius: 0,
//             backgroundColor: 'transparent',
//             borderColor: '#e8f170',
//             pointHoverBackgroundColor: '#e8f170',
//             pointHoverBorderColor: '#e8f170'
//         },
//
//     ];

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





    // fetch all initial data
    function constuctor() {


        companiesModel.fetchCompanies(function (result) {

            $scope.companiesList = result;
            $scope.search.company =  $scope.companiesList[0];
            var company_id = $rootScope.role === 'site admin' ? $scope.search.company.id : $rootScope.company_id;
            companiesModel.fetchOneDepartmentList({company_id:company_id}, function callback(result) {
                $scope.departmentsList = result;
                $scope.withHeaderDepartments = $scope.departmentsList.slice();
                $scope.withHeaderDepartments.splice(0, 0, headerFilter.department)
                $scope.search.department = headerFilter.department;

                $scope.withHeaderWorkPlaces = [];
                $scope.withHeaderWorkPlaces.splice(0, 0, headerFilter.workplace);
                $scope.search.place = headerFilter.workplace;
            })
            console.log($rootScope);
             // if ($rootScope.role === 'site admin') {
             //     var company_id = $scope.search.company.id;
             // } else {
             //     var company_id  = $rootScope.company_id;
             // }


            chartsModel.fetchAuditHistoryByCompany({company_id:company_id}, function callback (result) {
                changesAuditHistory(result);
            });

            chartsModel.fetchScoreHistoryByCompany({company_id:  company_id}, function callback(result) {
                changesScoreHistory(result);
            });

            chartsModel.fetchScoreByCompany({company_id: company_id}, function callback(result) {
                changesChart(result);
            });


        });

    }

    constuctor();



// selected inputs (filters)

    $scope.selectCompany = selectCompany;
    $scope.selectDepartment = selectDepartment;
    $scope.selectPlace = selectPlace;


    function selectCompany(item) {
        headerFilter.department.isDisabled = true;
        headerFilter.workplace.isDisabled = true;


        companiesModel.fetchOneDepartmentList({company_id: item.id}, function callback(result) {
            $scope.departmentsList = result;
            $scope.withHeaderDepartments = $scope.departmentsList.slice();
            $scope.withHeaderDepartments.splice(0, 0, headerFilter.department)
            $scope.search.department = headerFilter.department;
            $scope.search.place = headerFilter.workplace;
                headerFilter.department.isDisabled = false;
            });



        chartsModel.fetchAuditHistoryByCompany({company_id:$scope.search.company.id}, function callback (result) {
            changesAuditHistory(result);
        })

        chartsModel.fetchScoreHistoryByCompany({company_id: item.id}, function callback(result) {
            changesScoreHistory(result);
        });

         chartsModel.fetchScoreByCompany({company_id: item.id}, function callback(result) {
             changesChart(result);
         });


    }


    function selectDepartment(item) {
        headerFilter.workplace.isDisabled = true;
        if (item.id === null) {
            $scope.search.place = headerFilter.workplace;
            var company_id = $rootScope.role === 'site admin' ? $scope.search.company.id : $rootScope.company_id;

            companiesModel.fetchOneDepartmentList({company_id: company_id}, function callback(result) {
                $scope.departmentsList = result;
                $scope.withHeaderDepartments = $scope.departmentsList.slice();
                $scope.withHeaderDepartments.splice(0, 0, headerFilter.department)
                $scope.search.department = headerFilter.department;

            });

            chartsModel.fetchScoreHistoryByCompany({company_id: company_id}, function callback(result) {
                changesScoreHistory(result);
            });

            chartsModel.fetchScoreByCompany({company_id: company_id}, function callback(result) {
                changesChart(result);
            });


        } else {
            departmentsModel.fetchOnePlaceList({department_id: item.id}, function callback(result) {

                $scope.workplacesList = result;
                $scope.withHeaderWorkPlaces = $scope.workplacesList.slice();
                $scope.withHeaderWorkPlaces.splice(0, 0, headerFilter.workplace);
                $scope.search.place = headerFilter.workplace;

                headerFilter.workplace.isDisabled = false;

            });

            chartsModel.fetchScoreHistoryByDepartment({department_id: item.id}, function callback(result) {
                changesScoreHistory(result);
            });

            chartsModel.fetchScoreByDepartment({department_id: item.id}, function callback(result) {
                changesChart(result);
            });



        };


    }

    function selectPlace(item) {
        if (item.id === null) {

            chartsModel.fetchScoreHistoryByDepartment({department_id:$scope.search.department.id}, function callback(result) {
                changesScoreHistory(result);
            });

            chartsModel.fetchScoreByDepartment({department_id:$scope.search.department.id}, function callback(result) {
                changesChart(result);
            });

        } else {

            chartsModel.fetchScoreHistoryByPlace({place_id: item.id}, function callback(result) {
                changesScoreHistory(result);
            });

            chartsModel.fetchScoreByPlace({place_id: item.id}, function callback(result) {
                changesChart(result);
            });


        }
    };


    ////////////////// 1 chart ///////////////////////
    // google chart time-line
    // histiry audit
    function changesAuditHistory(result) {

        // audit - empty
        if (Array.isArray(result) && result.length === 0) {
            $scope.AuditHistoryIsEmpty = true;
        } else {
            $scope.AuditHistoryIsEmpty = false;
        }

        // message-error
        if (result.message || result.errors) {
            $scope.messageErrorAuditHistory =  result.message || result.errors;
            $scope.AuditHistoryIsEmpty = true;
        } else{
            $scope.messageErrorScoreHistory = undefined;
        }

        // result success
        if ($scope.AuditHistoryIsEmpty === false && (!result.message || !result.errors)){
            var countRow = 1;
            var auditDone = [];
            var NumberToDate = result.map(function (item, k, array) {
                item.length = 3;
                // item.color  = 'red';
                if (array[k-1] !== undefined){
                    if (array[k][0] !== array[k-1][0]) {
                        countRow++;
                    }
                }


                var newItem = item.map(function (innerItem, i, arr) {

                    if (i > 0 && i<3) {
                        if ((i === 2) && (innerItem === null || innerItem === 0)) {
                            innerItem = new Date();
                            auditDone[countRow-1] = true;

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


             $scope.AuditHistoryCountRow = countRow;
            $scope.auditDone  = auditDone;

            $scope.getNumber = function(countRow) {
                return new Array(countRow);
            }
            addRows = NumberToDate;
            google.charts.load('current', {
                'packages': ['timeline']
            });

            drawChart = function () {
                var container = document.getElementById('timeline');
                var chart = new google.visualization.Timeline(container);
                var dataTable = new google.visualization.DataTable();

                dataTable.addColumn({type: 'string', id: 'Name'});
                // dataTable.addColumn({type: 'color', id: 'color'});
                dataTable.addColumn({type: 'date', id: 'Start'});
                dataTable.addColumn({type: 'date', id: 'End'});

                dataTable.addRows(addRows);
                console.log(addRows, 'addRows');
                 var rowHeight = 40;
                // if (addRows.length == 1) rowHeight = 60;
                //  var chartHeight = (dataTable.getNumberOfRows() + 1) * rowHeight;
                 var chartHeight = (countRow * rowHeight)+60;
                console.log(countRow);
                // if (addRows.length > 10) chartHeight = 300;

                var chartWidth = angular.element(document.querySelector(".card-block")).width() - 150;

                var options = {
                    avoidOverlappingGridLines: true,
                    width: chartWidth,
                    height: chartHeight,


                     // colors: ['#cbb69d', '#603913', '#c69c6e'],

                }
                chart.draw(dataTable, options);

                // if (addRows.length == 1) {
                //     $scope.timelineHeight = {height: chartHeight * 2};
                // } else if (addRows.length < 8) {
                //     $scope.timelineHeight = {height: chartHeight * 0.8};
                // } else {
                //     $scope.timelineHeight = {height: chartHeight * 0.9};
                // }
            }

            $timeout(function () {
                google.charts.setOnLoadCallback(drawChart);
            },0);
        }



    }

////////////////// 2 chart ///////////////////////
    function changesScoreHistory(result) {

        // audit - empty
        if (Array.isArray(result.labels) && result.labels.length === 0) {
            $scope.ScoreHistoryIsEmpty = true;
        } else {
            $scope.ScoreHistoryIsEmpty = false;
        }
        // message-error
        if (result.message || result.errors) {
            $scope.messageErrorScoreHistory =  result.message || result.errors;
            $scope.ScoreHistoryIsEmpty = true;
        } else {
            $scope.messageErrorScoreHistory = undefined;
        }
        // result success
        if ($scope.ScoreHistoryIsEmpty === false && (!result.message || !result.errors)){
            $scope.historyScore.labels = result.labels;
            $scope.historyScore.data = result.data;

            var max =  Math.max.apply(null,(result.data[0].concat(result.data[1], result.data[2])));
            $scope.historyScore.options.scales.yAxes[0].ticks.max = (Math.floor((max+20)/10))*10-10;

        }

    }



///// functional for chart - Score (3 chart) //////
    function changesChart(result) {

        // audit - empty
        if (Array.isArray(result.labels) && result.labels.length === 0) {
            $scope.ScoreIsEmpty = true;
        } else {
            $scope.ScoreIsEmpty = false;
        }

        // message-error
        if (result.message || result.errors) {
            $scope.messageErrorScore =  result.message || result.errors;
            $scope.ScoreIsEmpty = true;
        }else {
            $scope.messageErrorScoreHistory = undefined;
        }

        // result success
        if ($scope.ScoreIsEmpty === false && (!result.message || !result.errors)){
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
        }

    }


    function auditStop (index) {

        auditModel.stopAudit({})
    }

}

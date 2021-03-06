/**
 * Created by alex on 25.04.2017.
 */
angular
    .module('app')
    .controller('DashboardChart', DashboardChart);


DashboardChart.$inject = ['$rootScope','$scope', '$sessionStorage', '$window', '$timeout', '$exceptionHandler', 'departmentsModel', 'workplacesModel', 'companiesModel', 'chartsModel', 'auditModel', 'ngDialog', 'usersModel'];
function DashboardChart($rootScope, $scope, $sessionStorage, $window, $timeout, $exceptionHandler, departmentsModel, workplacesModel, companiesModel, chartsModel, auditModel, ngDialog, usersModel) {



    $scope.search = {};
    $scope.usersList = [];
    $scope.auditStop = auditStop;
    $scope.auditStart = auditStart;
    $scope.settings = settings;
    $scope.usersList = [];


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

    var drawChart = function () {}; // init variable for observe change of width
    $scope.variableForTimeLine = true;

    angular.element($window).on('resize', function () {
        if (!$scope.AuditHistoryIsEmpty &&  $scope.variableForTimeLine) google.charts.setOnLoadCallback(drawChart);
            $timeout(function (){$('[stroke="#e6e6e5"]').remove()},0);
        // manuall $digest required as resize event
        // is outside of angular
        $scope.$digest();
    });

   var changeWidthChartFunc = $rootScope.$on('changeWidthChart', function (event, data) {
        if (!$scope.AuditHistoryIsEmpty)  google.charts.setOnLoadCallback(drawChart);
    });


    $scope.$on('$destroy', function() {
        $scope.variableForTimeLine = false;
        changeWidthChartFunc();
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
            backgroundColor: 'rgb(102, 187, 106)',
            borderColor: 'rgb(102, 187, 106)',
            pointHoverBackgroundColor: 'rgb(102, 187, 106)',
            pointHoverBorderColor: 'rgb(102, 187, 106)'
        },
        {

            label: "last",
            borderWidth: 3,
            type: 'line',
            pointRadius: 3,
            backgroundColor: 'rgb(255, 235, 59)',
            borderColor: 'rgb(255, 235, 59)',
            pointHoverBackgroundColor: 'rgb(255, 235, 59)',
            pointHoverBorderColor: 'rgb(255, 235, 59)'
        },
        {
            label: "current",
            borderWidth: 3,
            type: 'line',
            pointRadius: 3,
            backgroundColor: 'rgba(255, 61, 0, .8)',
            borderColor: 'rgba(255, 61, 0, .8)',
            pointHoverBackgroundColor: 'rgba(255, 61, 0, .8)',
            pointHoverBorderColor: 'rgba(255, 61, 0, .8)'
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
                    for (var i=0; i<4; i++){
                         if (tooltipItems.datasetIndex === i){
                             for (var j=0; j<data.labels.length;j++) {
                                 if (tooltipItems.index === j)
                                     return $scope.historyScore.tooltips[i][j] + ' score ';
                             }
                         }

                    }

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
    function constructor() {

        usersModel.fetchUsers(function(result) {
            $scope.usersList = result.users;
        });

        companiesModel.fetchCompanies(function (result) {

            $scope.companiesList = result.companies;
            $scope.search.company =  $scope.companiesList[0];
            var company_id = $rootScope.role === 'site admin' ? $scope.search.company.id : $rootScope.company_id;
            companiesModel.fetchOneDepartmentList({company_id:company_id}, function callback(result) {
                $scope.departmentsList = result.departments;
                $scope.withHeaderDepartments = $scope.departmentsList.slice();
                $scope.withHeaderDepartments.splice(0, 0, headerFilter.department)
                $scope.search.department = headerFilter.department;

                $scope.withHeaderWorkPlaces = [];
                $scope.withHeaderWorkPlaces.splice(0, 0, headerFilter.workplace);
                $scope.search.place = headerFilter.workplace;
            })


            chartsModel.fetchAuditHistoryByCompany({company_id:company_id}, function callback (result) {
                $scope.ListAuditHistoryByCompany = result;
                changesAuditHistory(result);
            });

            chartsModel.fetchScoreHistoryByCompany({company_id:  company_id}, function callback(result) {
                changesScoreHistory(result);
            });

            chartsModel.fetchScoreByCompany({company_id: company_id}, function callback(result) {
                changesChart(result);
            });


        });

        usersModel.fetchUsers(function(result) {

            $scope.usersList = result.users;
        });

    }

    constructor();



// selected inputs (filters)

    $scope.selectCompany = selectCompany;
    $scope.selectDepartment = selectDepartment;
    $scope.selectPlace = selectPlace;


    function selectCompany(item) {
        headerFilter.department.isDisabled = true;
        headerFilter.workplace.isDisabled = true;


        companiesModel.fetchOneDepartmentList({company_id: item.id}, function callback(result) {
            $scope.departmentsList = result.departments;
            $scope.withHeaderDepartments = $scope.departmentsList.slice();
            $scope.withHeaderDepartments.splice(0, 0, headerFilter.department)
            $scope.search.department = headerFilter.department;
            $scope.search.place = headerFilter.workplace;
                headerFilter.department.isDisabled = false;
            });



        chartsModel.fetchAuditHistoryByCompany({company_id:$scope.search.company.id}, function callback (result) {
            $scope.ListAuditHistoryByCompany = result;
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
                $scope.departmentsList = result.departments;
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

        console.log($exceptionHandler);
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
    function changesAuditHistory(result, criticalTarget) {
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
            var rowName = [];
            var auditInProcess = [];
            var RecentlyStoppedAudit = [];
            var RecentlyStoppedAuditNumber;



            var NumberToDate = result.map(function (item, k, array) {
                // item.length = 3;
                // item.color  = 'red';
                if (array[k-1] !== undefined){
                    if (array[k][0] !== array[k-1][0]) {
                        countRow++;

                        rowName.push(array[k-1][0]);
                    }
                }


                var newItem = item.map(function (innerItem, i, arr) {

                    if (i === 1) {

                        if (arr[3] === null || arr[3] === 0){innerItem = 'inProcess'}
                        if (arr[1] === -1 ){innerItem = 'isEmpty';}

                        if (criticalTarget === undefined) {
                            criticalTarget = $sessionStorage.critical_edge;
                        }

                            innerItem = resultCriticalScore (innerItem, criticalTarget);

                    }
                    else if (i > 1 && i<4) {

                         if ((i === 2) && (innerItem === null || innerItem === 0)) {
                            innerItem = new Date();

                        }
                         else  if ((i === 3) && (innerItem === null || innerItem === 0)) {
                             innerItem = new Date();

                             auditInProcess[countRow-1] = true;
                             if (arr[1] === -1 ){ auditInProcess[countRow-1] = false;}
                         }
                        else {
                            innerItem = new Date(innerItem * 1000);
                        }

                    }
                    return innerItem;
                });

                newItem.splice(1,0, '');
                return newItem;


            });

            var now = new Date();

            rowName.push(NumberToDate[NumberToDate.length-1][0]);
             $scope.AuditHistoryCountRow = countRow;
            $scope.auditInProcess  = auditInProcess;
            $scope.rowName  = rowName;

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
                dataTable.addColumn({type: 'string', id: 'Name'});
                 dataTable.addColumn({type: 'string', role: 'style'});
                dataTable.addColumn({type: 'date', id: 'Start'});
                dataTable.addColumn({type: 'date', id: 'End'});


                dataTable.addRows(addRows);
                 var rowHeight = 40;
                 var chartHeight = (countRow * rowHeight)+60;


                var chartWidth = angular.element(document.querySelector(".card-block")).width() - 150;

                var options = {
                    avoidOverlappingGridLines: true,
                    width: chartWidth,
                    height: chartHeight,
                    // colors: ['red','yellow', 'blue'],
                }
                chart.draw(dataTable, options);
            }

            $timeout(function () {
                google.charts.setOnLoadCallback(drawChart);
                $timeout(function (){$('[stroke="#e6e6e5"]').remove()},0);
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
            $scope.historyScore.tooltips = $scope.historyScore.data.map(function (item, i, arr){
               if (i>0) {
                  return item.map(function (smallItem, j, smallArr){
                       smallItem =  smallItem - arr[i-1][j];
                       return smallItem;
                    })
               } else {
                   return item;
               }
            });


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

        function ConfirmStop ()  {
            ngDialog.open({
                template:'/views/components/ConfirmStopAudit.html',
                className: 'ngdialog-theme-default',
                scope: $scope,
                width: 250,
            });
        };
        $scope.confirmStopAudit = confirmStopAudit;
        $scope.NotConfirmStopAudit = NotConfirmStopAudit;

        ConfirmStop ();

        function confirmStopAudit() {
            var department_name = $scope.rowName[index];
            var departmentsList = $scope.departmentsList;
            var StoppedDepartment = departmentsList.filter(function (department) {
                return department_name === department.name;
            })

            auditModel.stopLastAudit({department_id:StoppedDepartment[0].id}, function callback(result) {
                $scope.auditInProcess[index] =  !$scope.auditInProcess[index];
                ngDialog.closeAll();
                // constructor();
                var company_id = $rootScope.role === 'site admin' ? $scope.search.company.id : $rootScope.company_id;
                chartsModel.fetchAuditHistoryByCompany({company_id}, function callback (result) {
                    $scope.ListAuditHistoryByCompany = result;
                    changesAuditHistory(result);
                });
            })
        }

        function NotConfirmStopAudit () {
            ngDialog.closeAll();
        }



    }

    function auditStart (index) {
        var department_name = $scope.rowName[index];
        var departmentsList = $scope.departmentsList;
        var StartedDepartment = departmentsList.filter(function (department) {
            return department_name === department.name;
        })

        function createAuditModal ()  {
            ngDialog.open({
                template:'/views/components/createAuditDialog.html',
                className: 'ngdialog-theme-default',
                scope: $scope,
            });
        }


        $scope.startAuditFromChart = true;
        auditModel.startLastAudit({department_id:StartedDepartment[0].id}, function callback(result) {

            $scope.scoreSlider = {
                value: result.target,
                options: {
                    floor: 0,
                    ceil: 100,
                    step: 1,
                    minLimit: 0,
                    maxLimit: 100
                }
            };

            var userArr = $scope.usersList.filter(function (item) {
                return item.id ===  result.user_id;
            })
            $scope.search.user = userArr[0];

            var company_id = $rootScope.role === 'site admin' ? $scope.search.company.id : $rootScope.company_id;

            $scope.audit = {
                name: new Date().toDateString(),
                description: result.description,
                department_id: result.department_id,
                target: $scope.scoreSlider.value,
                place_id: '',
                user_id: $scope.search.user.id,
                company_id: company_id,
            };



            $scope.submit = function() {
                $scope.audit.target = $scope.scoreSlider.value;
                auditModel.startAudit($scope.audit, afterStart);
                ngDialog.closeAll();

                function afterStart() {
                    var company_id = $rootScope.role === 'site admin' ? $scope.search.company.id : $rootScope.company_id;
                    chartsModel.fetchAuditHistoryByCompany({company_id:company_id}, function callback (result) {
                        $scope.ListAuditHistoryByCompany = result;
                        changesAuditHistory(result);
                    })
                }

            }



            createAuditModal();
        })

    }


    function settings() {

        $scope.critical = {};
        $scope.criticalScoreSlider = {
            value:  $sessionStorage.critical_edge,
            options: {
                floor: 0,
                ceil: 100,
                step: 1,
                minLimit: 0,
                maxLimit: 100
            }
        };




        ngDialog.open({
            template:'/views/components/createCriticalScore.html',
            className: 'ngdialog-theme-default',
            scope: $scope,
        });

        $scope.CriticalSubmit = function() {
            $scope.critical.target = $scope.criticalScoreSlider.value;
            var criticalTarget = $scope.critical.target;
            usersModel.setCriticalEdge({critical_edge:$scope.critical.target}, function callback(res){
                $sessionStorage.critical_edge = $scope.critical.target;
                var company_id = $rootScope.role === 'site admin' ? $scope.search.company.id : $rootScope.company_id;
                chartsModel.fetchAuditHistoryByCompany({company_id:company_id}, function callback (result) {
                    $scope.ListAuditHistoryByCompany = result;
                    changesAuditHistory(result, criticalTarget);
                })
            });

            ngDialog.closeAll();


        }
    }

    function resultCriticalScore (innerItem, criticalTarget) {

         if (innerItem === 'inProcess'){
            innerItem = "#6E73FC";
        }

        if (innerItem === 'isEmpty') {
            innerItem = "#e6e6e5";
        }
       else if (arguments.length === 1){
            if (innerItem>1) {innerItem = "green";}
            else if (innerItem===0) {innerItem = "red";}
            else if (innerItem<1) {innerItem = "yellow";}
        }
        else {
            var criticalColor = "yellow";
            var point = 255/100;

            if (innerItem>=1) {innerItem = "green";}
            else if (innerItem===0) {innerItem = "red";}
            else if ((innerItem*100)===criticalTarget) {innerItem = criticalColor}
            else if ((innerItem*100)<criticalTarget) {
                var g =  Math.floor(point*innerItem*100);
                criticalColor = "rgb("+255+","+g+","+0+")";
                innerItem = criticalColor;
            }
            else if ((innerItem*100)>criticalTarget) {
                var r = Math.floor(point*innerItem*100);
                criticalColor = "rgb("+r+","+255+","+0+")";
                innerItem = criticalColor;
            }
        }
        return innerItem;

    }


}

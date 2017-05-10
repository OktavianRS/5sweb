/**
 * Created by alex on 25.04.2017.
 */
angular
    .module('app')
    .controller('DashboardChart', DashboardChart);


DashboardChart.$inject = ['$scope', '$window', '$timeout', 'departmentsModel', 'workplacesModel', 'companiesModel', 'chartsModel'];
function DashboardChart($scope, $window, $timeout, departmentsModel, workplacesModel, companiesModel, chartsModel) {
    $scope.search = {
    };


    // headers and configuration of visible company filter and disabled of department+workplaces
    var isSuperAdmin = true;
    var headerFilter={
        company:{
            name: 'Show all companies',
            id: null,
            isDisabled: false,
        },
        department:{
            name: 'Show all departments',
            id: null,
            isDisabled: isSuperAdmin || false,
        },
        workplace:{
            name: 'Show all workplaces',
            id: null,
            isDisabled:true,
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
        if (typeof currentWeekColor !== 'object' ) {
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

        dataTable.addColumn({ type: 'string', id: 'Name' });
        dataTable.addColumn({ type: 'date', id: 'Start' });
        dataTable.addColumn({ type: 'date', id: 'End' });
        dataTable.addRows(addRows);
        var rowHeight = 30;
        var chartHeight = (dataTable.getNumberOfRows() + 1) * rowHeight;
        var options = {
            avoidOverlappingGridLines: true,
            height: chartHeight,
            width: '100%',
        };
        chart.draw(dataTable, options);
        if (chartHeight < 400){
            $scope.timelineHeight = {height :chartHeight*0.6};
        } else {
            $scope.timelineHeight = 300
            }
    }

    $scope.width = $window.innerWidth;

   angular.element($window).bind('resize', function(){
     google.charts.setOnLoadCallback(drawChart);
     $scope.width = $window.innerWidth;

     // manuall $digest required as resize event
     // is outside of angular
     $scope.$digest();
   });






    // histiry score
    $scope.historyScore={
        labels: ["Audit1", "Audit2", "Audit3", "Audit4", "Audit5", "Audit6", "Audit7"],
        data:[
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
        scales: {
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

            changesChart(result);
        });

        companiesModel.fetchCompanies(function(result) {
            $scope.companiesList = result;
            $scope.withHeaderCompaniesList = $scope.companiesList.slice();
            $scope.withHeaderCompaniesList.splice(0,0, headerFilter.company);
            $scope.search.company = headerFilter.company;

        });

        workplacesModel.fetchAllWorkPlaces(function(result) {
            $scope.workplacesList = result;
            $scope.withHeaderWorkPlaces = $scope.workplacesList.slice();
            $scope.withHeaderWorkPlaces.splice(0,0, headerFilter.workplace);
            $scope.search.place = headerFilter.workplace;

        });

        departmentsModel.fetchPlacesList(function(result) {
            $scope.AllDepartmentsList = result;

            $scope.departmentsList = $scope.AllDepartmentsList.slice();
            $scope.withHeaderDepartments = $scope.departmentsList.slice();
            $scope.withHeaderDepartments.splice(0,0, headerFilter.department)
            $scope.search.department =  headerFilter.department;



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








// selected inputs (filters)

    $scope.selectCompany = selectCompany;
    $scope.selectDepartment = selectDepartment;
    $scope.selectPlace = selectPlace;


    function selectCompany (item) {
        headerFilter.department.isDisabled = true;
        headerFilter.workplace.isDisabled = true;
        if (item.id === null){
            headerFilter.department.isDisabled = true;
            headerFilter.workplace.isDisabled = true;
            $scope.search.department = headerFilter.department;
            $scope.search.place = headerFilter.workplace;
            companiesModel.fetchCompanies(function(result) {

                changesAuditHistory(result);
                changesScoreHistory (result)
                changesChart (result);
            });

        } else {

            chartsModel.fetchChartByCompany({company_id:item.id}, function callback (result) {

                //TODO...
                headerFilter.department.isDisabled = false;


                changesAuditHistory(result);
                changesScoreHistory (result)
                changesChart (result);

            });
        }
    }


   function selectDepartment (item) {
       headerFilter.workplace.isDisabled = true;
    if (item.id === null){
        $scope.search.place = headerFilter.workplace;

        departmentsModel.fetchPlacesList(function(result) {

            $scope.departmentsList = result;
            $scope.withHeaderDepartments = $scope.departmentsList.slice();
            $scope.withHeaderDepartments.splice(0,0, headerFilter.department)
            $scope.search.department =  headerFilter.department;

        });
    } else {
        chartsModel.fetchChartByDepartment({department_id:item.id}, function callback (result) {

            changesAuditHistory(result);
            changesScoreHistory (result)
            changesChart (result);

            $scope.departmentsList = $scope.AllDepartmentsList.filter(
                function (value) {
                    return value.id === item.id
                }
            );

            $scope.workplacesList = $scope.departmentsList[0].places;
            $scope.withHeaderWorkPlaces = $scope.workplacesList.slice();
            $scope.withHeaderWorkPlaces.splice(0,0, headerFilter.workplace);
            $scope.search.place = headerFilter.workplace;


            headerFilter.workplace.isDisabled = false;

        });
        }
    }

    function selectPlace (item) {
        chartsModel.fetchChartByPlace({place_id:item.id}, function callback (result) {

            changesAuditHistory(result);
            changesScoreHistory (result)
            changesChart (result);
        } );
}


///// functional for chart - Score//////
function changesChart (result) {
    // if we have string then push it in array
    for (var i in result) {
        if (typeof result[i] !== 'object') {
            result[i] = [result[i]];
        }
    }

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

    function changesAuditHistory (result) {

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

            dataTable.addColumn({ type: 'string', id: 'Name' });
            dataTable.addColumn({ type: 'date', id: 'Start' });
            dataTable.addColumn({ type: 'date', id: 'End' });
            dataTable.addRows(addRows);
            var rowHeight = 30;
            var chartHeight = (dataTable.getNumberOfRows() + 1) * rowHeight;

            var options = {
                avoidOverlappingGridLines: true,
                height: chartHeight,
                width: '100%',
            };
            chart.draw(dataTable, options);
            if (chartHeight < 400){
                $scope.timelineHeight = {height :chartHeight*0.6};
            } else {
                $scope.timelineHeight = 300
            }
        }

    }

    // $scope.$watch(
    //     function () {
    //     return angular.element(document.getElementsByClassName('main')).innerWidth();
    // }, function (prev, current) {
    //    console.log('eeee');
    //     changesAuditHistory();
    // })

    // $(document.getElementsByClassName('main')).innerWidth().resize(function(){
    //     alert(window.innerWidth);
    //
    //     $scope.$apply(function(){
    //         //do something to update current scope based on the new innerWidth and let angular update the view.
    //     });
    // });

    // element = angular.element(document.getElementsByClassName('main'))[0];
    //
    // $scope.getElementDimensions = function () {
    //     return angular.element(document.getElementsByClassName('main')).innerWidth();
    // };
    //
    // $scope.$watch($scope.getElementDimensions, function (newValue, oldValue) {
    //     console.log('effef');
    //     //<<perform your logic here using newValue.w and set your variables on the scope>>
    // }, true);
    //
    // element.bind('resize', function () {
    //     $scope.$apply();
    // });

    // var w = angular.element($window);
    // $scope.$watch(
    //     function () {
    //         return $window.innerWidth;
    //     },
    //     function (value) {
    //         $scope.windowWidth = value;
    //     },
    //     true
    // );
    //
    // w.bind('resize', function(){
    //     $scope.$apply();
    // });




    function changesScoreHistory (result){
        $scope.historyScore={
            labels: ["Audit1", "Audit2", "Audit3", "Audit4", "Audit5", "Audit6", "Audit7"],
            data:[
                [17, 25, 22, 40, 8, 10, 7],
                [21, 96, 24, 20, 12, 13, 15],
                [25, 32, 31, 26, 18, 19, 16],
            ],
        };
    }



}

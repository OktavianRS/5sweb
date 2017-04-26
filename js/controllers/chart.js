/**
 * Created by alex on 25.04.2017.
 */
angular
    .module('app')
    .controller('DashboardChart', DashboardChart);


DashboardChart.$inject = ['$scope'];
function DashboardChart($scope) {

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

    var data1 = [65, 59, 80, 85, 47, 58],
        data2 = [28, 48, 40, 45, 85, 95],
        data3 = [90, 90, 90, 90, 90, 90],
        data4 = [100, 100, 100, 100, 100, 100],
        data5 = [80, 80, 80, 80, 80, 80];

    var color = ['#FF0000', '#008000', '#FFFF00', '#A52A2A', '#808080', '#0000FF'];

    $scope.labels = ['Lagerbereich 1', 'Breitgang', 'Ladegeräte', 'SOS-Station', 'Feuerlöscher', 'Kontrolle 1'];
    $scope.series = ["Current", "Target", "Last"];
    $scope.data = [data1, data2, data3, data4, data5];
    $scope.colors = [
        {
            backgroundColor: color,
            borderColor: color,
            pointHoverBackgroundColor: '#fff'
        },
        {
            backgroundColor: lastWeekColor(color),
            borderColor: color,
            pointHoverBackgroundColor: '#fff'
        },
    ];

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
            xAxes: [{
                gridLines: {
                    drawOnChartArea: false,
                },
                ticks: {
                    callback: function (value) {
                        return value;
                    }
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    stepSize: 10,
                    max: 100,
                    callback: function (value, index, values) {
                        return value + '%';
                    }
                }
            }]
        },
        elements: {
            point: {
                radius: 0,
                hitRadius: 10,
                hoverRadius: 4,
                hoverBorderWidth: 3,
            }
        },
    }


    $scope.departments = [
        {
            name: 'department1',
            id: 12,
            color: 'rgba(75,192,192,1)',
            places: [
                {name: 'Lagerbereich 1', id: 56},
                {name: 'Breitgang', id: 89},
                {name: 'Ladegeräte', id: 84},
                {name: 'Lagerbereich 1', id: 546},
                {name: 'Breitgang', id: 57},
                {name: 'Ladegeräte', id: 86754},
            ]
        },
        {
            name: 'department2',
            id: 13,
            color: 'rgba(255, 66, 66, 1)',
            places: [
                {name: 'SOS-Station', id: 56},
                {name: 'Feuerlöscher', id: 564},
                {name: 'SOS-Station', id: 44},
                {name: 'Feuerlöscher', id: 5654},
                {name: 'SOS-Station', id: 565},
                {name: 'Feuerlöscher', id: 54564},
                {name: 'SOS-Station', id: 8},
                {name: 'Feuerlöscher', id: 56764},
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

    $scope.search = {};
    // $scope.search.department = $scope.departments[0];
    // $scope.search.place = $scope.places[0];

    var allDepartment = {
            name: 'Show all departments',
            id: 'null',
        },
        allWorkplaces ={name:'Show all workplaces', id:'null'};

    $scope.departments.splice(0,0, allDepartment)
    $scope.places.splice(0,0, allWorkplaces)

    $scope.search.department =  allDepartment;
    $scope.search.place = allWorkplaces;

    $scope.selectDepartment = selectDepartment;
    $scope.selectPlace = selectPlace;

   function selectDepartment (item) {
       $scope.labels = ['Lagerbereich 1', 'Breitgang', 'Ladegeräte', 'SOS-Station', 'Feuerlöscher', 'Kontrolle 1'];
       $scope.series = ["Current", "Target", "Last"];
       data1 = [68, 85, 22, 33, 64, 85],
       $scope.data = [data1, data2, data3, data4, data5];
       $scope.colors = [
           {
               backgroundColor: color,
               borderColor: color,
               pointHoverBackgroundColor: '#fff'
           },
           {
               backgroundColor: lastWeekColor(color),
               borderColor: color,
               pointHoverBackgroundColor: '#fff'
           },
       ];
    }

    function selectPlace (item) {
        $scope.labels = ['Lagerbereich 1', 'Breitgang', 'Ladegeräte', 'SOS-Station', 'Feuerlöscher', 'Kontrolle 1'];
        $scope.series = ["Current", "Target", "Last"];
        data1 = [68, 85, 22, 33, 64, 85],
        $scope.data = [data1, data2, data3, data4, data5];
        $scope.colors = [
            {
                backgroundColor: color,
                borderColor: color,
                pointHoverBackgroundColor: '#fff'
            },
            {
                backgroundColor: lastWeekColor(color),
                borderColor: color,
                pointHoverBackgroundColor: '#fff'
            },
        ];
    }


}

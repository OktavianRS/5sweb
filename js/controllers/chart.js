/**
 * Created by alex on 25.04.2017.
 */
angular
    .module('app')
    .controller('DashboardChart', DashboardChart);


DashboardChart.$inject = ['$scope'];
function DashboardChart($scope){

    function convertHex(hex,opacity){
        hex = hex.replace('#','');
        r = parseInt(hex.substring(0,2), 16);
        g = parseInt(hex.substring(2,4), 16);
        b = parseInt(hex.substring(4,6), 16);

        result = 'rgba('+r+','+g+','+b+','+opacity/100+')';
        return result;
    }

    // function random(min,max) {
    //     return Math.floor(Math.random()*(max-min+1)+min);
    // }

    var elements = 27;
    // var data1 = [];
    // var data2 = [];
    // var data3 = [];

/*    for (var i = 0; i <= elements; i++) {
        data1.push(random(50,200));
        data2.push(random(80,100));
        data3.push(65);
    }*/

    var data1 =  [100, 100, 100, 100, 100, 100],
        data2 =  [80, 80, 80, 80, 80, 80],
        data3 =  [90, 90, 90, 90, 90, 90],
        data4 =  [65, 59, 80, 85, 47, 58],
        data5 =  [28, 48, 40, 45, 85, 95];


    $scope.labels = ['Lagerbereich 1', 'Breitgang', 'Ladegeräte', 'SOS-Station', 'Feuerlöscher', 'Kontrolle 1'];
    $scope.series = ["Current", "Target", "Last"];
    $scope.data = [ data1, data2, data3, data4, data5];
    $scope.colors = [{
        backgroundColor: 'red',
        borderColor: brandInfo,
        pointHoverBackgroundColor: '#fff'
    },
        {
        backgroundColor: 'green',
        borderColor: brandSuccess,
        pointHoverBackgroundColor: '#fff'
    },
    //     {
    //     backgroundColor: 'transparent',
    //     borderColor: brandDanger,
    //     pointHoverBackgroundColor: '#fff',
    //     borderWidth: 1,
    //     borderDash: [8, 5]
    // }
    ];
    $scope.options = {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
            enabled: true,
            mode: 'single',
            callbacks: {
                label: function (tooltipItems, data) {
                    return tooltipItems.yLabel + '%';
                }
            }
        },
        scales: {
            xAxes: [{
                gridLines: {
                    drawOnChartArea: false,
                },
                ticks: {
                    callback: function(value) {
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
}

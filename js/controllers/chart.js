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



        // generate color for last week
    function lastWeekColor (currentWeekColor) {

       return currentWeekColor.map (
                 function (item, i, arr){
                     return convertHex (arr[i], 50);
                 }
         )
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

// show in tooltips which week
function week (tooltipItems) {
    if (tooltipItems.datasetIndex === 0) weekTitle ='current week';
    if (tooltipItems.datasetIndex === 1) weekTitle ='previous week';
    return  weekTitle;
};

    var data1 = [65, 59, 80, 85, 47, 58],
        data2 = [28, 48, 40, 45, 85, 95],
        data3 =  [90, 90, 90, 90, 90, 90],
        data4 =   [100, 100, 100, 100, 100, 100],
        data5 =  [80, 80, 80, 80, 80, 80];

    var color = ['#FF0000', '#008000', '#FFFF00', '#A52A2A', '#808080', '#0000FF'];

    $scope.labels = ['Lagerbereich 1', 'Breitgang', 'Ladegeräte', 'SOS-Station', 'Feuerlöscher', 'Kontrolle 1'];
    $scope.series = ["Current", "Target", "Last"];
    $scope.data = [ data1, data2, data3, data4, data5];
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
        {},{},
        {
            label: "target",
            borderWidth: 3,
            type: 'line',
            pointRadius: 0,
            backgroundColor:'transparent',
            borderColor: '#a32428',
            pointHoverBackgroundColor: '#a32428',
            pointHoverBorderColor	: '#a32428'
        },
        {

            label: "last",
            borderWidth: 3,
            type: 'line',
            pointRadius: 0,
            backgroundColor:'transparent',
            borderColor: '#339163',
            pointHoverBackgroundColor: '#339163',
            pointHoverBorderColor	: '#339163'
        },
        {
            label: "current",
            borderWidth: 3,
            type: 'line',
            pointRadius: 0,
            backgroundColor:'transparent',
            borderColor: '#e8f170',
            pointHoverBackgroundColor: '#e8f170',
            pointHoverBorderColor	: '#e8f170'
        },

        // {
        //     label: ['current'],
        //     borderWidth: 1,
        //     type: 'bar',
        //     borderColor:'transparent',
        //     backgroundColor: ['rgba(75,192,192,1)','rgba(75,192,192,1)', 'rgba(75,192,192,1)', 'rgba(255, 66, 66, 1)','rgba(255, 66, 66, 1)', 'rgba(54, 64, 247, 1)']
        // },
        // {
        //     label: ['last'],
        //     borderWidth: 1,
        //     type: 'bar',
        //     borderColor:'transparent',
        //     backgroundColor: ['rgba(75,192,192,0.5)','rgba(75,192,192,0.5)', 'rgba(75,192,192,0.5)', 'rgba(255, 66, 66, 0.5)','rgba(255, 66, 66, 0.5)', 'rgba(54, 64, 247, 0.5)']
        // },

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

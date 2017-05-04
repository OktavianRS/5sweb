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

    // fetch all initial data
    function constuctor() {

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

            $timeout(function () {
                $scope.table = $scope.AllDepartmentsList.slice();
            },0);

        });

    }
    constuctor();


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


    // $scope.departments = [
    //     {
    //         name: 'department1',
    //         id: 12,
    //         color: 'rgba(75,192,192,1)',
    //         places: [
    //             {name: 'Lagerbereich 1', id: 56, current:77, previeus: 100, last:83},
    //             {name: 'Breitgang', id: 89, current:77, previeus: 100, last:83},
    //             {name: 'Ladegeräte', id: 84, current:99, previeus: 58, last:83},
    //             {name: 'Lagerbereich 1', id: 546, current:77, previeus: 100, last:83},
    //             {name: 'Breitgang', id: 57, current:77, previeus: 100, last:83},
    //             {name: 'Ladegeräte', id: 86754, current:77, previeus: 100, last:83},
    //         ]
    //     },
    //     {
    //         name: 'department2',
    //         id: 13,
    //         color: 'rgba(255, 66, 66, 1)',
    //         places: [
    //             {name: 'SOS-Station', id: 56, current:77, previeus: 100, last:83},
    //             {name: 'Feuerlöscher', id: 564, current:77, previeus: 100, last:83},
    //             {name: 'SOS-Station', id: 44, current:77, previeus: 100, last:83},
    //             {name: 'Feuerlöscher', id: 5654, current:77, previeus: 100, last:83},
    //             {name: 'SOS-Station', id: 565, current:77, previeus: 100, last:83},
    //             {name: 'Feuerlöscher', id: 54564, current:77, previeus: 77, last:83},
    //             {name: 'SOS-Station', id: 8, current:77, previeus: 100, last:100},
    //             {name: 'Feuerlöscher', id: 56764, current:83, previeus: 83, last:83},
    //             {name: 'SOS-Station', id: 4764},
    //             {name: 'Feuerlöscher', id: 545654},
    //             {name: 'SOS-Station', id: 5655},
    //             {name: 'Feuerlöscher', id: 574564},
    //             {name: 'Kontrolle 1', id: 5665},
    //             {name: 'Kontrolle 1', id: 561},
    //             {name: 'Kontrolle 1', id: 562},
    //             {name: 'Kontrolle 1', id: 563},
    //             {name: 'Kontrolle 1', id: 56467},
    //             {name: 'Kontrolle 1', id: 556576},
    //             {name: 'Kontrolle 1', id: 657566},
    //             {name: 'Kontrolle 1', id: 85656},
    //             {name: 'Kontrolle 1', id: 56596},
    //             {name: 'Kontrolle 1', id: 556736},
    //             {name: 'Kontrolle 1', id: 52656},
    //             {name: 'Kontrolle 1', id: 565613},
    //             {name: 'Kontrolle 1', id: 565662},
    //             {name: 'Kontrolle 1', id: 5633},
    //             {name: 'Kontrolle 1', id: 5464},
    //             {name: 'Kontrolle 1', id: 5656},
    //             {name: 'Kontrolle 1', id: 5366},
    //             {name: 'Kontrolle 1', id: 8656},
    //             {name: 'Kontrolle 1', id: 576},
    //             {name: 'Kontrolle 1', id: 53836},
    //             {name: 'Kontrolle 1', id: 5246},
    //             {name: 'Kontrolle 1', id: 56373},
    //             {name: 'Kontrolle 1', id: 546874},
    //             {name: 'Kontrolle 1', id: 567656},
    //             {name: 'Kontrolle 1', id: 576366},
    //             {name: 'Kontrolle 1', id: 866756},
    //             {name: 'Kontrolle 1', id: 58776},
    //             {name: 'Kontrolle 1', id: 5683836},
    //             {name: 'Kontrolle 1', id: 579246},
    //         ]
    //     },
    //
    //     {
    //         name: 'department3',
    //         id: 15,
    //         color: 'rgba(54, 64, 247, 1)',
    //         places: [
    //             {name: 'Kontrolle 1', id: 56},
    //             {name: 'Kontrolle 1', id: 561},
    //             {name: 'Kontrolle 1', id: 562},
    //             {name: 'Kontrolle 1', id: 563},
    //             {name: 'Kontrolle 1', id: 564},
    //             {name: 'Kontrolle 1', id: 556},
    //             {name: 'Kontrolle 1', id: 566},
    //             {name: 'Kontrolle 1', id: 856},
    //             {name: 'Kontrolle 1', id: 596},
    //             {name: 'Kontrolle 1', id: 536},
    //             {name: 'Kontrolle 1', id: 526},
    //             {name: 'Kontrolle 1', id: 5613},
    //             {name: 'Kontrolle 1', id: 5662},
    //             {name: 'Kontrolle 1', id: 5633},
    //             {name: 'Kontrolle 1', id: 5464},
    //             {name: 'Kontrolle 1', id: 5656},
    //             {name: 'Kontrolle 1', id: 5366},
    //             {name: 'Kontrolle 1', id: 8656},
    //             {name: 'Kontrolle 1', id: 576},
    //             {name: 'Kontrolle 1', id: 53836},
    //             {name: 'Kontrolle 1', id: 5246},
    //         ]
    //     },
    // ];

    // $scope.places = [
    //     {name:'Lagerbereich 1', id:56},
    //     {name:'Breitgang', id:89},
    //     {name:'Ladegeräte', id:84},
    //     {name:'Lagerbereich 1', id:566},
    //     {name:'Breitgang', id:57},
    //     {name:'Ladegeräte', id:86754},
    // ],






    $scope.selectDepartment = selectDepartment;
    $scope.selectPlace = selectPlace;

   function selectDepartment (item) {
       chartsModel.fetchChartByDepartment({department_id:item.id}, function callback (result) {
           console.log(result, 'result');

           if (typeof result.placeName !== 'object' ) {
               result.placeName = Array(result.placeName);
           }
           $scope.labels = result.placeName;

           data1 = result.placeScore;
           if (typeof data1 !== 'object' ) {
               $scope.data[0] = [];
               $scope.data[0].push(data1);
           } else {
               if (data1.length>1) {
                   $scope.data[0] = data1;
               } else {
                   $scope.data[0] = [];
                   $scope.data[0].push(data1);
               }
           }

           // $scope.data = [data1, data2, data3, data4, data5];


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

           // $scope.departmentsList = result;

           $scope.departmentsList = $scope.AllDepartmentsList.filter(
               function (value) {
                    return value.id === item.id
               }
           );
            // $scope.departmentsList = $scope.departmentsList;

           $scope.workplacesList = $scope.departmentsList[0].places;
           $scope.withHeaderWorkPlaces = $scope.workplacesList.slice();
           $scope.withHeaderWorkPlaces.splice(0,0, HeaderWorkplaces);
           $scope.search.place = HeaderWorkplaces;

           $timeout(function () {
               $scope.table = $scope.departmentsList;
           },0);


       });


       // $scope.labels = ['Lagerbereich 1', 'Breitgang', 'Ladegeräte', 'SOS-Station', 'Feuerlöscher', 'Kontrolle 1'];
       // $scope.series = ["Current", "Target", "Last"];
       // data1 = [68, 85, 22, 33, 64, 85],
       // $scope.data = [data1, data2, data3, data4, data5];
       // $scope.colors = [
       //     {
       //         backgroundColor: color,
       //         borderColor: color,
       //         pointHoverBackgroundColor: '#fff'
       //     },
       //     {
       //         backgroundColor: lastWeekColor(color),
       //         borderColor: color,
       //         pointHoverBackgroundColor: '#fff'
       //     },
       // ];

    }

    function selectPlace (item) {
        debugger

        chartsModel.fetchChartByPlace({place_id:item.id}, function callback (result) {

            console.log(result, 'result');

            if (typeof result.placeName !== 'object' ) {
                result.placeName = Array(result.placeName);
            }
            $scope.labels = result.placeName;

            data1 = result.placeScore;
            if (typeof data1 !== 'object' ) {
                $scope.data[0] = [];
                $scope.data[0].push(data1);
            } else {
                if (data1.length>1) {
                    $scope.data[0] = data1;
                } else {
                    $scope.data[0] = [];
                    $scope.data[0].push(data1);
                }
            }


            // if (data1.length>1) {
            //     $scope.data[0] = data1;
            // } else {

            // }

             // $scope.data = [data1, data2, data3, data4, data5];

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


            var newArr;
            $scope.table.forEach(
                function (value, i, arr) {
                    for (var j=0; j< value.places.length; j++){
                        if (value.places[j].id === item.id) {
                            var newArr =  Object.assign({}, value);
                            newArr.places =[];
                            newArr.places.push(value.places[j]);
                            // a.push(value.places[j]);
                            return true;
                        }
                    }
                    // if (a.length>0) {
                    //     console.log(a);
                    // }

                }
            );
            $scope.table = newArr;
            console.log($scope.table, 'table')
            console.log($scope.workplacesList, 'workplacesList')
            console.log($scope.departmentsList, '$scope.departmentsList')

        });

        // $scope.table = $scope.departmentsList.filter(
        //     function (value) {
        //         // for (var i=0; i<$scope.departmentsList.length; i++){
        //         //     return value.places[i].id === item.id
        //         // }
        //         value.places.forEach(function (name,i,arr) {
        //             return name.id === item.id
        //         })
        //
        //
        //     }
        // );

        // $scope.table = a;
        // console.log(newArr, 'newArr')


        // $timeout(function () {
        //     $scope.table = $scope.departmentsList;
        // },0);

        //  $scope.labels = ['Lagerbereich 1', 'Breitgang', 'Ladegeräte', 'SOS-Station', 'Feuerlöscher', 'Kontrolle 1'];
        //  $scope.series = ["Current", "Target", "Last"];
        //  data1 = [68, 85, 22, 33, 64, 85],
        //  $scope.data = [data1, data2, data3, data4, data5];
        //  $scope.colors = [
        //     {
        //         backgroundColor: color,
        //         borderColor: color,
        //         pointHoverBackgroundColor: '#fff'
        //     },
        //     {
        //         backgroundColor: lastWeekColor(color),
        //         borderColor: color,
        //         pointHoverBackgroundColor: '#fff'
        //     },
        // ];
    }


}

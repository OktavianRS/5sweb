angular
.module('app')
.directive('a', preventClickDirective)
.directive('a', bootstrapCollapseDirective)
.directive('a', navigationDirective)
.directive('button', layoutToggleDirective)
.directive('a', layoutToggleDirective)
.directive('button', collapseMenuTogglerDirective)
.directive('div', bootstrapCarouselDirective)
.directive('toggle', bootstrapTooltipsPopoversDirective)
.directive('tab', bootstrapTabsDirective)
.directive('button', cardCollapseDirective)
.directive('selectedCriteria', selectedCriteria)
.directive('heightRow', heightRow)


//Prevent click if href="#"
function preventClickDirective() {
  var directive = {
    restrict: 'E',
    link: link
  }
  return directive;

  function link(scope, element, attrs) {
    if (attrs.href === '#'){
      element.on('click', function(event){
        event.preventDefault();
      });
    }
  }
}

//Bootstrap Collapse
function bootstrapCollapseDirective() {
  var directive = {
    restrict: 'E',
    link: link
  }
  return directive;

  function link(scope, element, attrs) {
    if (attrs.toggle=='collapse'){
      element.attr('href','javascript;;').attr('data-target',attrs.href.replace('index.html',''));
    }
  }
}

/**
* @desc Genesis main navigation - Siedebar menu
* @example <li class="nav-item nav-dropdown"></li>
*/
function navigationDirective() {
  var directive = {
    restrict: 'E',
    link: link
  }
  return directive;

  function link(scope, element, attrs) {
    if(element.hasClass('nav-dropdown-toggle') && angular.element('body').width() > 782) {
      element.on('click', function(){
        if(!angular.element('body').hasClass('compact-nav')) {
          element.parent().toggleClass('open').find('.open').removeClass('open');
        }
      });
    } else if (element.hasClass('nav-dropdown-toggle') && angular.element('body').width() < 783) {
      element.on('click', function(){
        element.parent().toggleClass('open').find('.open').removeClass('open');
      });
    }
  }
}

//Dynamic resize .sidebar-nav
sidebarNavDynamicResizeDirective.$inject = ['$window', '$timeout'];
function sidebarNavDynamicResizeDirective($window, $timeout) {
  var directive = {
    restrict: 'E',
    link: link
  }
  return directive;

  function link(scope, element, attrs) {

    if (element.hasClass('sidebar-nav') && angular.element('body').hasClass('fixed-nav')) {
      var bodyHeight = angular.element(window).height();
      scope.$watch(function(){
        var headerHeight = angular.element('header').outerHeight();

        if (angular.element('body').hasClass('sidebar-off-canvas')) {
          element.css('height', bodyHeight);
        } else {
          element.css('height', bodyHeight - headerHeight);
        }
      })

      angular.element($window).bind('resize', function(){
        var bodyHeight = angular.element(window).height();
        var headerHeight = angular.element('header').outerHeight();
        var sidebarHeaderHeight = angular.element('.sidebar-header').outerHeight();
        var sidebarFooterHeight = angular.element('.sidebar-footer').outerHeight();

        if (angular.element('body').hasClass('sidebar-off-canvas')) {
          element.css('height', bodyHeight - sidebarHeaderHeight - sidebarFooterHeight);
        } else {
          element.css('height', bodyHeight - headerHeight - sidebarHeaderHeight - sidebarFooterHeight);
        }
      });
    }
  }
}

//LayoutToggle
layoutToggleDirective.$inject = ['$interval', '$rootScope', '$timeout'];
function layoutToggleDirective($interval, $rootScope, $timeout) {
  var directive = {
    restrict: 'E',
    link: link
  }
  return directive;

  function link(scope, element, attrs) {
    element.on('click', function(){


        $timeout(function () {
          if (document.querySelector('.chart')) {
            $rootScope.$emit('changeWidthChart');
          }
        },200);

      if (element.hasClass('sidebar-toggler')) {
        angular.element('body').toggleClass('sidebar-hidden');
      }

      if (element.hasClass('aside-menu-toggler')) {
        angular.element('body').toggleClass('aside-menu-hidden');
      }
    });
  }
}

//Collapse menu toggler
function collapseMenuTogglerDirective() {
  var directive = {
    restrict: 'E',
    link: link
  }
  return directive;

  function link(scope, element, attrs) {
    element.on('click', function(){

      if (element.hasClass('navbar-toggler') && !element.hasClass('layout-toggler')) {
        angular.element('body').toggleClass('sidebar-mobile-show')
      }
    })
  }
}

//Bootstrap Carousel
function bootstrapCarouselDirective() {
  var directive = {
    restrict: 'E',
    link: link
  }
  return directive;

  function link(scope, element, attrs) {
    if (attrs.ride=='carousel'){
      element.find('a').each(function(){
        $(this).attr('data-target',$(this).attr('href').replace('index.html','')).attr('href','javascript;;')
      });
    }
  }
}

//Bootstrap Tooltips & Popovers
function bootstrapTooltipsPopoversDirective() {
  var directive = {
    restrict: 'A',
    link: link
  }
  return directive;

  function link(scope, element, attrs) {
    if (attrs.toggle=='tooltip'){
      angular.element(element).tooltip();
    }
    if (attrs.toggle=='popover'){
      angular.element(element).popover();
    }
  }
}

//Bootstrap Tabs
function bootstrapTabsDirective() {
  var directive = {
    restrict: 'A',
    link: link
  }
  return directive;

  function link(scope, element, attrs) {
    element.click(function(e) {
      e.preventDefault();
      angular.element(element).tab('show');
    });
  }
}

//Card Collapse
function cardCollapseDirective() {
  var directive = {
    restrict: 'E',
    link: link
  }
  return directive;

  function link(scope, element, attrs) {
    if (attrs.toggle=='collapse' && element.parent().hasClass('card-actions')){

      if (element.parent().parent().parent().find('.card-block').hasClass('in')) {
        element.find('i').addClass('r180');
      }

      var id = 'collapse-' + Math.floor((Math.random() * 1000000000) + 1);
      element.attr('data-target','#'+id)
      element.parent().parent().parent().find('.card-block').attr('id',id);

      element.on('click', function(){
        element.find('i').toggleClass('r180');
      })
    }
  }
}

//Card Collapse
// function widthChart() {
//   var directive = {
//     restrict: 'AE',
//     link: link
//   }
//   return directive;
//
//   function link(scope, elem, attrs) {
//
//     scope.w = elem.clientWidth;
//     scope.$watch(function () {
//           // scope.apply(function () {
//             var a =  (function () {
//               // scope.$apply(
//                   scope.w=elem.clientWidth
//               // );
//               return scope.w;
//             })();
//       return a;
//           // })
//         },
//         function (newValue, oldValue) {
//
//           if (newValue !== oldValue)
//           {
//
//
//             // do some thing
//           }
//         }, true);
//
//     elem.on('resize', function () {
//       console.log('dfsf', angular.element(document.querySelector('main'))[0].clientWidth)
//       // $scope.$apply();
//     });
//
//     // elem.on('resize', function () {
//     //   console.log(elem[0].clientWidth)
//     //   scope.$apply();
//     // });
//
//
//     // $scope.getElementDimensions = function () {
//     //   return { 'h': $element.height(), 'w': $element.width() };
//     // };
//     // $scope.$watch($scope.getElementDimensions, function (newValue, oldValue) {
//     //   //<<perform your logic here using newValue.w and set your variables on the scope>>
//     // }, true);
//     //
//     // window.bind('resize', function () {
//     //   console.log('dfsf')
//     //   $scope.$apply();
//     // });
//
//
//
//     // console.log(element[0].clientWidth, '5555555555555555555555555');
//     // console.log(element.height(), '333333333333333333');
//     //
//     // element.on('resize',function (){
//     //   console.log('aaa');
//     //   scope.$apply();
//     // });
//     //
//     // scope.$watch
//     // (element[0].clientWidth,
//     //     function (newValue, oldValue) {
//     //       console.log('rgrdg');
//     //       if (newValue != oldValue) {
//     //         // Do something ...
//     //         console.log(newValue);
//     //       }
//     //     }
//     // );
//   }
// }

//selectedCriteria
selectedCriteria.$inject = ['$timeout'];
function selectedCriteria($timeout) {
  var directive = {
    restrict: 'A',
    link: link
  }
  return directive;

  function link(scope, element, attrs) {
    // function for work with DOM and create attrs for elements  which has the same labels as names in array 'selected';
 var listener =  scope.$watch( function () {return scope.criteriasInCheckList !== undefined}, function (newValue, oldValue) {
     if (newValue){
       // $timeout(function () {
         var selected=scope.criteriasInCheckList;
         var length = angular.element(document.querySelectorAll('option')).length/2
         for (var i=length;i<length*2;i++){
           for (var j=0; j<selected.length; j++){
             var el = angular.element(document.querySelectorAll('option'))[i];
             var val = el.getAttribute('label');
             if (selected[j].name === val) {
               var el = angular.element(document.querySelectorAll('option'))[i];
               el.setAttribute("selected", "selected");
             }
           }
         }
         angular.element($('select[name="prependedInputCriteria"]')).bootstrapDualListbox('refresh', true);
       listener(); // Would clear the watch
       // },0);
     }

    })


  }
}

//heightRow of time-line chart
heightRow.$inject = ['$window', '$timeout','$rootScope'];
function heightRow($timeout, $window, $rootScope) {
  var directive = {
    restrict: 'A',
    link: link
  }
  return directive;

  function link(scope, element, attrs) {
    // console.log((document.querySelectorAll('rect')).length, "document.querySelectorAll('rect')).length");
    var listenerHeightRow =  scope.$watch( function () {
      return angular.element(document.querySelectorAll('rect')).length !== 0},
        function (newValue, oldValue) {
           if (newValue) {
// console.log((document.querySelectorAll('rect')).length, "document.querySelectorAll('rect')).length");
             var parentElementRow =  (angular.element(document.querySelectorAll('rect')).eq(0))[0].parentElement;
               var grandGrandElementAudit = angular.element(parentElementRow.parentElement)[0];
             var grandElementAudit =  angular.element(parentElementRow.parentElement)[0].children[4];
             var arrHeightRow = angular.element(parentElementRow).find('rect');
             var parentElementAudit = angular.element(grandElementAudit).find('rect');


             for (var i=0; i<arrHeightRow.length; i++) {
               angular.element(arrHeightRow[i]).attr("height",41);
             }

             // $timeout(function () {
             //   if (document.querySelector('.chart')) {
             //     $rootScope.$emit('changeWidthChart');
             //   }
             // },200);



// var newElements="";

             // for (var i=0; i<parentElementAudit.length; i++) {

                // angular.element(parentElementAudit[i]).attr("fill","red");
                //  console.log(parentElementAudit[i]);




                 //angular way

                //  var linearGradient = angular.element(document.createElement("linearGradient"));
                //  linearGradient.attr("attrLinearGradient_id","MyGradient" + i);
                //
                //
                //  var stop1 = angular.element(document.createElement("stop"));
                //  stop1.attr("offset","5%");
                //  stop1.attr("stop-color","red");
                //
                //  var stop2 = angular.element(document.createElement("stop"));
                //  stop2.attr("offset","5%");
                //  stop2.attr("stop-color","red");
                //
                //  linearGradient.append(stop1);
                //  linearGradient.append(stop2);
                //  console.log(linearGradient);
                //
                //  var newRect = angular.element(parentElementAudit[i]).clone();
                //  console.log(newRect);
                //  newRect.attr("style","fill:url(#MyGradient"+i+")");
                //  var newElement = linearGradient.after(newRect);
                // newElements += newElement;
                //  console.log(newElement);
                //  angular.element(parentElementAudit[i]).replaceWith(linearGradient)
                //   linearGradient.after(newRect);


                 // javascript way
               // var linearGradient = document.createElement("linearGradient");
               // var attrLinearGradient_id = document.createAttribute("id");
               // attrLinearGradient_id.value = "MyGradient" + i;
               // linearGradient.setAttributeNode(attrLinearGradient_id);
               //
               // var stop1 = document.createElement("stop");
               // var offset = document.createAttribute("offset");
               // var stopColor = document.createAttribute("stop-color");
               // offset.value = "5%";
               // stopColor.value = "red";
               // stop1.setAttributeNode(offset);
               // stop1.setAttributeNode(stopColor);
               //
               // var stop2 = document.createElement("stop");
               // var offset = document.createAttribute("offset");
               // var stopColor = document.createAttribute("stop-color");
               // offset.value = "95%";
               // stopColor.value = "#FF6";
               // stop2.setAttributeNode(offset);
               // stop2.setAttributeNode(stopColor);
               //
               // linearGradient.appendChild(stop1);
               // linearGradient.appendChild(stop2);
               //
               //
               // var style = document.createAttribute("style");
               // style.value = "fill:url(#MyGradient"+i+")";
               // var newElementAudit = parentElementAudit[i].cloneNode(true);
               //   newElementAudit.setAttributeNode(style);
               //
               //   console.log(grandElementAudit);
               //
               //  console.log(newElementAudit);
               //   grandElementAudit.insertBefore(linearGradient,  parentElementAudit[i])
               //     grandElementAudit.replaceChild(newElementAudit, parentElementAudit[i]);



             // }
               // scope.$apply();
               // console.log(newElements);
               // console.log(angular.element(newElements));
               // angular.element(parentElementAudit).replaceWith(angular.element(newElements))
             // console.log(grandElementAudit, "grandElementAudit");
             //   var svg = document.createElement("svg");
             //   var a = grandElementAudit.cloneNode(true);
             //   console.log(a, "a");
             //    svg.appendChild(a);
             //   console.log(svg, "svg");
             //   grandGrandElementAudit.replaceChild(svg, grandElementAudit);



                // listenerHeightRow(); // Would clear the watch
           }
        });

    // scope.oldValueWidth=angular.element(document.querySelectorAll('#charts'))[0].clientWidth;
    // var listenerWidthChart =  scope.$watch( function () {
    //   console.log(angular.element(document.querySelectorAll('#charts'))[0].clientWidth, scope.oldValueWidth);
    //       return angular.element(document.querySelectorAll('#charts'))[0].clientWidth},
    //     function (newValue, oldValue) {
    //       console.log(newValue, oldValue)
    //        // scope.oldValueWidth =  newValue;
    //       if (true) {
    //
    //         $rootScope.$emit('changeWidthChart');
    //       }
    //       }
    //       )


  }
}




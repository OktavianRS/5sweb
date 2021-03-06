// Default colors
var brandPrimary =  '#20a8d8';
var brandSuccess =  '#4dbd74';
var brandInfo =     '#63c2de';
var brandWarning =  '#f8cb00';
var brandDanger =   '#f86c6b';

var grayDark =      '#2a2c36';
var gray =          '#55595c';
var grayLight =     '#818a91';
var grayLighter =   '#d1d4d7';
var grayLightest =  '#f8f9fa';

angular
.module('app', [
  'ui.router',
  'oc.lazyLoad',
  'ncy-angular-breadcrumb',
  'angular-loading-bar',
  'ngStorage',
  'toastr',
  'color.picker',
  'frapontillo.bootstrap-duallistbox',
  'ngDialog',
  'rzModule',
  'sticky',
  'ngMaterial',

  //models
  'model.login',
  'model.companies',
  'model.departments',
  'model.workplaces',
  'model.departments',
  'model.criterias',
  'model.charts',
  'model.users',
  'model.audit',
  'model.check',


  // factories
  'factory.url',
  'factory.toast',
  'factory.request',
])
.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
  cfpLoadingBarProvider.includeSpinner = false;
  cfpLoadingBarProvider.latencyThreshold = 1;
}])
.run(['$rootScope', '$state', '$stateParams', '$sessionStorage', '$localStorage', '$location', function($rootScope, $state, $stateParams, $sessionStorage, $localStorage, $location) {
  $rootScope.$on('$locationChangeStart',
  function(event, toState, toParams, fromState, fromParams){
    if (!$sessionStorage.auth_key) {
      $location.path('/login');
    } else {
      $rootScope.role = $sessionStorage.role;
      $rootScope.email = $sessionStorage.email;
      $rootScope.company_id = $sessionStorage.company_id;
      $rootScope.isAdmin = () => {
        return $sessionStorage.role === 'site admin';
      }
    }
    if ($location.$$url === '/companies') {
      $sessionStorage.role !== 'site admin' && $location.path('/dashboard');
    }
  })
  $rootScope.$on('$stateChangeSuccess',function(){
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  });
  $rootScope.$state = $state;
  return $rootScope.$stateParams = $stateParams;
}]);

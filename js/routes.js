angular
.module('app')
.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$breadcrumbProvider', function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $breadcrumbProvider) {

  $urlRouterProvider.otherwise('/dashboard');

  $ocLazyLoadProvider.config({
    // Set to true if you want to see what and when is dynamically loaded
    debug: true
  });

  $breadcrumbProvider.setOptions({
    prefixStateName: 'app.main',
    includeAbstract: true,
    template: '<li class="breadcrumb-item" ng-repeat="step in steps" ng-class="{active: $last}" ng-switch="$last || !!step.abstract"><a ng-switch-when="false" href="{{step.ncyBreadcrumbLink}}">{{step.ncyBreadcrumbLabel}}</a><span ng-switch-when="true">{{step.ncyBreadcrumbLabel}}</span></li>'
  });

  $stateProvider
  .state('app', {
    abstract: true,
    templateUrl: 'views/common/layouts/full.html',
    //page title goes here
    ncyBreadcrumb: {
      label: 'Root',
      skip: true
    },
    resolve: {
      loadCSS: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load CSS files
        return $ocLazyLoad.load([{
          serie: true,
          name: 'Font Awesome',
          files: ['css/font-awesome.min.css']
        },{
          serie: true,
          name: 'Simple Line Icons',
          files: ['css/simple-line-icons.css']
        }]);
      }],
      loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
        // you can lazy load files for an existing module
        return $ocLazyLoad.load([{
          serie: true,
          name: 'chart.js',
          files: [
            'bower_components/chart.js/dist/Chart.min.js',
            'bower_components/angular-chart.js/dist/angular-chart.min.js'
          ]
        }]);
      }],
    }
  })
  .state('app.main', {
    url: '/dashboard',
    templateUrl: 'views/main.html',
    //page title goes here
    ncyBreadcrumb: {
      label: 'Dashboard',
    },
    //page subtitle goes here
    resolve: {
      loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
        // you can lazy load files for an existing module
        return $ocLazyLoad.load([
          {
            serie: true,
            name: 'chart.js',
            files: [
              'bower_components/chart.js/dist/Chart.min.js',
              'bower_components/angular-chart.js/dist/angular-chart.min.js'
            ]
          },
        ]);
      }],
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/chart.js']
        });
      }]
    }
  })
  .state('app.departments', {
    url: '/departments',
    templateUrl: 'views/pages/departments.html',
    //page title goes here
    ncyBreadcrumb: {
      label: 'Departments',
    },
    //page subtitle goes here
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/departments.js']
        });
      }]
    }
  })
  .state('app.workplaces-by-department', {
    url: '/workplaces-by-department/{department_id}/{department_name}',
    templateUrl: 'views/pages/workplacesByDepartment.html',
    controller: 'workplacesByDepartmentCtrl',
    onEnter: function($rootScope, $stateParams) {
      $rootScope.department_name = $stateParams.department_name;
      $rootScope.department_id = $stateParams.department_id;
    },
    ncyBreadcrumb: {
      label: '{{department_name}}',
      parent: 'app.departments'
    },
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/workplacesByDepartment.js']
        });
      }]
    }
  })
  .state('app.criteria-by-workplaces', {
    url: '/criteria-by-workplaces/{place_id}/{place_name}/{department_id}/{department_name}',
    templateUrl: 'views/pages/criteriaByWorkplaces.html',
    onEnter: function($rootScope, $stateParams) {
      $rootScope.department_name = $stateParams.department_name;
      $rootScope.department_id = $stateParams.department_id;
      $rootScope.place_name = $stateParams.place_name;
      $rootScope.place_id = $stateParams.place_id;
    },
    ncyBreadcrumb: {
      label: '{{place_name}}',
      parent: 'app.workplaces-by-department'
    },
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/criteriaByWorkplaces.js']
        });
      }]
    }
  })
  .state('app.workplaces', {
    url: '/workplaces',
    templateUrl: 'views/pages/workplaces.html',
    controller: 'workplacesCtrl',
    ncyBreadcrumb: {
      label: 'Workplaces'
    },
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/workplaces.js']
        });
      }]
    }
  })
  .state('app.workplaces-criteria', {
    url: '/workplaces-criteria/{place_id}/{place_name}',
    templateUrl: 'views/pages/criteriaByWorkplaces.html',
    onEnter: function($rootScope, $stateParams) {
      $rootScope.place_name = $stateParams.place_name;
      $rootScope.place_id = $stateParams.place_id;
    },
    ncyBreadcrumb: {
      label: '{{place_name}}',
      parent: 'app.workplaces'
    },
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/criteriaByWorkplaces.js']
        });
      }]
    }
  })
  .state('app.criteria', {
    url: '/criteria',
    templateUrl: 'views/pages/criteria.html',
    //page title goes here
    ncyBreadcrumb: {
      label: 'Criteria',
    },
    //page subtitle goes here
    params: { subtitle: 'Welcome to ROOT powerfull Bootstrap & AngularJS UI Kit' },
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/criteria.js']
        });
      }]
    }
  })
  .state('app.check', {
    url: '/check',
    templateUrl: 'views/pages/checkList.html',
    //page title goes here
    ncyBreadcrumb: {
      label: 'Check List',
    },
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/checkList.js']
        });
      }]
    }
  })
  .state('app.checklist-criteria', {
    url: '/checklist-criteria/{check_id}/{check_name}',
    templateUrl: 'views/pages/criteriaByChecklist.html',
    onEnter: function($rootScope, $stateParams) {
      $rootScope.check_name = $stateParams.check_name;
      $rootScope.check_id = $stateParams.check_id;
    },
    ncyBreadcrumb: {
      label: '{{check_name}}',
      parent: 'app.check'
    },
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/criteriaByChecklist.js']
        });
      }]
    }
  })
  .state('app.users', {
    url: '/users',
    templateUrl: 'views/pages/users.html',
    //page title goes here
    ncyBreadcrumb: {
      label: 'Users',
    },
    //page subtitle goes here
    params: { subtitle: 'Welcome to ROOT powerfull Bootstrap & AngularJS UI Kit' },
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/users.js']
        });
      }]
    }
  })
  .state('app.audit', {
    url: '/audit',
    templateUrl: 'views/pages/audit.html',
    //page title goes here
    ncyBreadcrumb: {
      label: 'Audit',
    },
    //page subtitle goes here
    params: { subtitle: 'Welcome to ROOT powerfull Bootstrap & AngularJS UI Kit' },
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/audit.js']
        });
      }]
    }
  })
  .state('app.audit-atachments', {
    url: '/audit-atachments/{audit_id}/{audit_name}',
    templateUrl: 'views/pages/auditAtachments.html',
    onEnter: function($rootScope, $stateParams) {
      $rootScope.audit_name = $stateParams.audit_name;
      $rootScope.audit_id = $stateParams.audit_id;
    },
    ncyBreadcrumb: {
      label: '{{audit_name}}',
      parent: 'app.audit'
    },
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/auditAtachments.js']
        });
      }]
    }
  })
  .state('appSimple', {
    abstract: true,
    templateUrl: 'views/common/layouts/simple.html',
    resolve: {
      loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
        // you can lazy load files for an existing module
        return $ocLazyLoad.load([{
          serie: true,
          name: 'Font Awesome',
          files: ['css/font-awesome.min.css']
        },{
          serie: true,
          name: 'Simple Line Icons',
          files: ['css/simple-line-icons.css']
        }]);
      }],
    }
  })
  .state('app.companies', {
    url: '/companies',
    templateUrl: 'views/pages/companies.html',
    //page title goes here
    ncyBreadcrumb: {
      label: 'Companies',
    },
    //page subtitle goes here
    params: { subtitle: 'Welcome to ROOT powerfull Bootstrap & AngularJS UI Kit' },
    resolve: {
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/companies.js']
        });
      }]
    }
  })

  // Additional Pages
  .state('appSimple.login', {
    url: '/login',
    templateUrl: 'views/pages/login.html'
  })
  .state('appSimple.404', {
    url: '/404',
    templateUrl: 'views/pages/404.html'
  })
  .state('appSimple.500', {
    url: '/500',
    templateUrl: 'views/pages/500.html'
  })
}]);

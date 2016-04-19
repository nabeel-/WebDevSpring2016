'use strict';
/**
 * @ngdoc overview
 * @name TutorConnect
 * @description
 * # TutorConnect
 *
 * Main module of the application.
 */
angular
  .module('TutorConnect', [
    'oc.lazyLoad',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar',
    'underscore',
    'angularMoment'
  ])
  .config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider',function($stateProvider,$urlRouterProvider,$ocLazyLoadProvider) {
    
    $ocLazyLoadProvider.config({
      debug:false,
      events:true,
    });

    $urlRouterProvider.otherwise('/');

    var checkLoggedin = function($q, $timeout, $http, $state, $rootScope) {
      var deferred = $q.defer();
  
      $http.get('http://localhost:3000/api/project/loggedin').success(function(user) {
        if (user !== '0') {
          $rootScope.currentUser = user;
          deferred.resolve();
        }

        else {
          deferred.reject();
          console.log('need to login');
          $state.go('login');
        }
      });

      return deferred.promise;
    };

    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();
    
        $http.get('http://localhost:3000/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
            }
            deferred.resolve();
        });
        
        return deferred.promise;
    };

    $stateProvider
      .state('landing', {
        url: '/',
        templateUrl:'views/landing/landing.view.html',
        resolve: {
          loggedIn: checkCurrentUser,
          load: function ($ocLazyLoad) {
              return $ocLazyLoad.load(
              {
                name: 'TutorConnect',
                files:[
                  'views/header/header.controller.js',
                  'scripts/services/user.service.js'
                  ]
              });
            }
        }
      })
      .state('dashboard', { 
        url:'/dashboard',
        templateUrl: 'views/dashboard/main.html',
        resolve: {
            loggedIn: checkLoggedin,
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                   name:'toggle-switch',
                   files:['bower_components/angular-toggle-switch/angular-toggle-switch.min.js',
                          'bower_components/angular-toggle-switch/angular-toggle-switch.css'
                      ]
                }),
                $ocLazyLoad.load(
                {
                  name:'ngAnimate',
                  files:['bower_components/angular-animate/angular-animate.js']
                }),
                $ocLazyLoad.load(
                {
                  name:'ngCookies',
                  files:['bower_components/angular-cookies/angular-cookies.js']
                }),
                $ocLazyLoad.load(
                {
                  name:'ngResource',
                  files:['bower_components/angular-resource/angular-resource.js']
                }),
                $ocLazyLoad.load(
                {
                  name:'ngSanitize',
                  files:['bower_components/angular-sanitize/angular-sanitize.js']
                }),
                $ocLazyLoad.load(
                {
                  name:'ngTouch',
                  files:['bower_components/angular-touch/angular-touch.js']
                }),
                $ocLazyLoad.load(
                {
                  name:'TutorConnect',
                  files:[
                    'views/header/header.controller.js',
                    'scripts/services/user.service.js'
                    ]
                });
            }
        }
    })
      .state('dashboard.home',{
        url:'/home',
        controller: 'MainCtrl',
        controllerAs: 'model',
        templateUrl:'views/dashboard/home.html',
        resolve: {
          loggedin: checkLoggedin,
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'TutorConnect',
              files:[
              'scripts/controllers/main.js',
              'views/header/header.controller.js',
              'scripts/services/user.service.js',
              'scripts/services/tutor.service.js',
              'scripts/services/report.service.js',
              'scripts/services/classes.service.js',
              'scripts/directives/dashboard/stats/stats.js'
              ]
            });
          }
        }
    })
      .state('dashboard.profile', {
        url:'/profile',
        controller: 'ProfileCtrl',
        controllerAs: 'model',
        templateUrl: 'views/users/profile.view.html',
        resolve: {
          loggedin: checkLoggedin,
          loadProfile: function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'TutorConnect',
              files:[
                'views/header/header.controller.js',
                'scripts/services/user.service.js',
                'scripts/controllers/profile.controller.js'
              ]
            });
          }
        }
    })
      .state('dashboard.classes', {
        url:'/classes',
        controller: 'ClassesCtrl',
        controllerAs: 'model',
        templateUrl: 'views/classes/classes.view.html',
        resolve: {
          loggedin: checkLoggedin,
          loadProfile: function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'TutorConnect',
              files:[
                'views/header/header.controller.js',
                'scripts/controllers/classes.controller.js',
                'scripts/controllers/class-edit.controller.js',
                'scripts/controllers/report-modal.controller.js',
                'scripts/services/user.service.js',
                'scripts/services/classes.service.js',
                'scripts/services/tutor.service.js',
                'scripts/services/report.service.js'
              ]
            });
          }
        }
    })
      .state('login',{
        templateUrl:'views/pages/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'model',
        url:'/login',
        resolve: {
          loadCtrl:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'TutorConnect',
              files:[
              'scripts/controllers/login.js',
              'scripts/services/user.service.js'
              ]
            });
          }
        }
    })
      .state('register',{
        templateUrl:'views/pages/register.html',
        controller: 'RegisterCtrl',
        url:'/register',
        resolve: {
          loadCtrl:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'TutorConnect',
              files:[
              'scripts/controllers/register.controller.js',
              'scripts/services/user.service.js'
              ]
            });
          }
        }
    })
      .state('dashboard.chart',{
        templateUrl:'views/chart.html',
        url:'/chart',
        controller:'ChartCtrl',
        resolve: {
          loggedin: checkLoggedin,
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'chart.js',
              files:[
                'bower_components/angular-chart.js/dist/angular-chart.min.js',
                'bower_components/angular-chart.js/dist/angular-chart.css'
              ]
            }),
            $ocLazyLoad.load({
                name:'TutorConnect',
                files:[
                  'views/header/header.controller.js',
                  'scripts/services/user.service.js',
                  'scripts/services/report.service.js',
                  'scripts/controllers/chartContoller.js'
                  ]
            });
          }
        }
    });
  }]);

    

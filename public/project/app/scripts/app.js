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

    $stateProvider
      .state('landing', {
        url: '/',
        templateUrl:'views/landing/landing.view.html',
        resolve: {
          load: function ($ocLazyLoad) {
              return $ocLazyLoad.load(
              {
                name: 'TutorConnect',
                files:['views/header/header.controller.js']
              });
            }
        }
      })
      .state('dashboard', { 
        url:'/dashboard',
        templateUrl: 'views/dashboard/main.html',
        resolve: {
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
                });
            },
            auth: function ($q, $rootScope) {
                if ($rootScope.currentUser) {
                    return $q.when($rootScope.currentUser);
                } else {
                    return $q.reject({ authenticated: false });
                }
            }
        }
    })
      .state('dashboard.home',{
        url:'/home',
        controller: 'MainCtrl',
        controllerAs: 'model',
        templateUrl:'views/dashboard/home.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'TutorConnect',
              files:[
              'scripts/controllers/main.js',
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
          loadProfile: function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'TutorConnect',
              files:[
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
          loadProfile: function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'TutorConnect',
              files:[
                'scripts/controllers/classes.controller.js',
                'scripts/controllers/class-edit.controller.js',
                'scripts/services/classes.service.js',
                'scripts/services/tutor.service.js'
              ]
            });
          }
        }
    })
      .state('login',{
        templateUrl:'views/pages/login.html',
        controller: 'LoginCtrl',
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
      .state('dashboard.chart',{
        templateUrl:'views/chart.html',
        url:'/chart',
        controller:'ChartCtrl',
        resolve: {
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
                files:['scripts/controllers/chartContoller.js']
            });
          }
        }
    });
  }])
  .run(function($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function(e, toState) {
        var noLogin = toState.name === 'login' || 'landing';
        if(noLogin){
           return; // no need to redirect 
        }
        if(!$rootScope.currentUser) {
            e.preventDefault(); // stop current execution
            $state.go('login'); // go to login
        }
    });
  });

    

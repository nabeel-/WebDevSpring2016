(function() {
  'use strict';

  angular.module("FormBuilderApp").config(function($routeProvider) {
    $routeProvider
      .when('/home', {
        controller: 'MainController',
        templateUrl: 'views/home/home.view.html'
      })
      .when('/register', {
        controller:'RegisterController',
        templateUrl:'views/users/register.view.html'
      })
      .when('/login', {
        controller: 'LoginController',
        templateUrl: 'views/users/login.view.html'
      })
      .when('/profile', {
        controller: 'ProfileController',
        templateUrl: 'views/users/profile.view.html'
      })
      .when('/admin', {
        controller: 'AdminController',
        templateUrl: 'views/users/admin.view.html'
      })
      .otherwise({
        redirectTo:'/home'
      });

  });

})();
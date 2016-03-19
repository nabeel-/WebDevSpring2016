(function() {
  'use strict';

  angular.module("FormBuilderApp").config(function($routeProvider) {
    $routeProvider
      .when('/home', {
        controller: 'MainController',
        templateUrl: 'client/views/home/home.view.html'
      })
      .when('/register', {
        controller:'RegisterController',
        templateUrl:'client/views/users/register.view.html'
      })
      .when('/login', {
        controller: 'LoginController',
        templateUrl: 'client/views/users/login.view.html'
      })
      .when('/profile', {
        controller: 'ProfileController',
        templateUrl: 'client/views/users/profile.view.html'
      })
      .when('/admin', {
        controller: 'AdminController',
        templateUrl: 'client/views/users/admin.view.html'
      })
      .when('/forms', {
        controller: 'FormsController',
        templateUrl: 'client/views/forms/forms.view.html'
      })
      .when("/fields", {
        templateUrl: "client/views/forms/field.view.html",
        controller: "FieldController"
      })
      .when("/form/:formId/fields", {
        templateUrl: "client/views/forms/fields.view.html",
        controller: "FieldController"
      })
      .otherwise({
        redirectTo:'/home'
      });

  });

})();
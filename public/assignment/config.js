(function() {
  'use strict';

  angular.module("FormBuilderApp").config(function($routeProvider) {
    $routeProvider
    .when('/home', {
      controller: 'MainController',
      templateUrl: 'client/views/home/home.view.html',
      resolve: { loggedin: checkCurrentUser }
    })
    .when('/register', {
      controller:'RegisterController',
      templateUrl:'client/views/users/register.view.html'
    })
    .when('/login', {
      controller: 'LoginController',
      controllerAs: 'model',
      templateUrl: 'client/views/users/login.view.html'
    })
    .when('/profile', {
      controller: 'ProfileController',
      templateUrl: 'client/views/users/profile.view.html',
      resolve: { loggedin: checkLoggedin }
    })
    .when('/admin', {
      controller: 'AdminController',
      templateUrl: 'client/views/users/admin.view.html',
      resolve: { loggedin: checkAdmin }
    })
    .when('/forms', {
      controller: 'FormsController',
      templateUrl: 'client/views/forms/forms.view.html',
      resolve: { loggedin: checkLoggedin }
    })
    .when("/fields", {
      templateUrl: "client/views/forms/field.view.html",
      controller: "FieldController",
      resolve: { loggedin: checkLoggedin }
    })
    .when("/form/:formId/fields", {
      templateUrl: "client/views/forms/fields.view.html",
      controller: "FieldController",
      resolve: { loggedin: checkLoggedin }
    })
    .otherwise({
      redirectTo:'/home'
    });
  });

  var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope) {
    var deferred = $q.defer();

    $http.get('/api/assignment/loggedin').success(function(user) {
      $rootScope.errorMessage = null;
        // User is Authenticated
        if (user !== '0') {
          $rootScope.currentUser = user;
        }
        deferred.resolve();
      });

    return deferred.promise;
  };

  var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
    var deferred = $q.defer();

    $http.get('/api/assignment/loggedin').success(function(user) {

      $rootScope.errorMessage = null;

      if (user !== '0') {
        $rootScope.currentUser = user;
        deferred.resolve();
      }

      else {
        deferred.reject();
        $rootScope.errorMessage = "You need to login!";
        $location.url('/login');
      }
    });

    return deferred.promise;
  };

  var checkAdmin = function($q, $timeout, $http, $location, $rootScope) {
    var deferred = $q.defer();
    
    $http.get('/api/assignment/loggedin').success(function(user) {
      $rootScope.errorMessage = null;
        // User is Authenticated
        if (user !== '0' && user.roles.indexOf('admin') != -1) {
          $rootScope.currentUser = user;
          deferred.resolve();
        }
      });

    return deferred.promise;
  };

})();
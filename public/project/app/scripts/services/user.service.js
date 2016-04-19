(function() {
  'use strict';

  angular.module('TutorConnect').factory('UserService', function($http) {

    var API_BASE = '/api/project/user/';

    function findUserByCredentials(username, password) {
      return $http.get(API_BASE + '?username=' + username + '&password=' + password);
    }

    function findAllUsers() {
      return $http.get(API_BASE);
    }

    function createUser(user) {
      return $http.post(API_BASE, user);
    }

    function deleteUserById(userId) {
      return $http.delete(API_BASE + userId);
    }

    function updateUser(userId, user) {
      return $http.put(API_BASE + userId, user);
    }

    var service = {
      findAllUsers : findAllUsers,
      findUserByCredentials : findUserByCredentials,
      createUser : createUser,
      deleteUserById : deleteUserById,
      updateUser : updateUser
    };

    return service;
  });
})();
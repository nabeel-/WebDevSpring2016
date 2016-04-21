'use strict';
/**
 * @ngdoc function
 * @name TutorConnect.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the TutorConnect
 */
angular.module('TutorConnect')
  .controller('HeaderCtrl', function($rootScope, $state, UserService, SearchService) {
    var vm = this;

    vm.logout = logout;
    vm.search = search;
    vm.isSearch = isSearch;

    init();

    function init() {
      vm.currentUser = $rootScope.currentUser;
    }

    function search(query) {
      if(query) {
        SearchService.search(query).then(function(resp) {
          if(resp) {
            $rootScope.searchResults = resp.data;
            $state.go('dashboard.search', {query: query}); 
          }
        });
      }  
    }

    function logout() {
      UserService.logout().then(function(resp) {
        vm.currentUser = null;
        $rootScope.currentUser = null;
        $state.go('landing');
      });
    }

    function isSearch() {
      return $state.is('dashboard.search');
    }

  });

'use strict';
/**
 * @ngdoc function
 * @name TutorConnect.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the TutorConnect
 */
angular.module('TutorConnect')
  .controller('SearchCtrl', function($rootScope, $stateParams, $state, $uibModal, SearchService) {

    var vm = this;

    vm.search = search;
    vm.showDetail = showDetail;

    init();
    
    function init() {
      vm.results = $rootScope.searchResults;
      vm.query   = $stateParams.query;

      // Detect page refresh, fetch data
      if(!vm.results && vm.query) {
        vm.search(vm.query);
      }
    }

    function search(query) {
      if(query) {
        SearchService.search(query).then(function(resp) {
          if(resp) {
            $rootScope.searchResults = resp.data;
            vm.results = $rootScope.searchResults;
            $state.go('dashboard.search', {query: query});
          }
        });
      }  
    }

    function showDetail(course) {
      $rootScope.modal = $uibModal.open({
        templateUrl: 'views/search/detail.view.html',
        controller: 'SearchDetailCtrl',
        controllerAs: 'model',
        resolve: { course: function() { return course; }}
      });
    }

  });
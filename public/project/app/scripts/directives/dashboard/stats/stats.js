'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('sbAdminApp')
    .directive('stats',function() {
    	return {
  		templateUrl:'scripts/directives/dashboard/stats/stats.html',
  		restrict:'E',
  		scope: {
        'model': '=',
        'comments': '@',
        'number': '@',
        'name': '@',
        'colour': '@',
        'details':'@',
        'type':'@',
        'goto':'@',
        'lgsize':'@',
        'mdsize':'@',
  		}
  		
  	}
  });

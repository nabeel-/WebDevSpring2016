"use strict";angular.module("TutorConnect").controller("LoginCtrl",function($rootScope,$scope,$state,UserService){$scope.login=function(){UserService.findUserByCredentials($scope.username,$scope.password).then(function(resp){resp&&($rootScope.currentUser=resp.data,$state.go("dashboard.home"))})}});
'use strict';

describe('Controller: ProfileCtrl', function () {

  // load the controller's module
  beforeEach(module('TutorConnect'));

  var ProfileCtrl, UserMock, rootScope;

  var userBob = {'_id':234, 'firstName':'Bob','lastName':'Hope', 'username':'bob', 'password':'bob', 'roles': ['admin']};

  module(function($provide) {
    $provide.factory('UserService', function(_) {

      // Mock out the function call to login for testing
      this.updateUser = jasmine.createSpy('updateUser').andCallFake(function(id, u, c) {
        var users = [userBob];
        var foundUser = _.findWhere(users, {_id: id});

        if(foundUser) {
          foundUser = u;
          rootScope.currentUser = foundUser;
        }

        c(foundUser);
      });

    });
  });

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, UserService) {
    rootScope = $rootScope;
    rootScope.currentUser = userBob; // controller expects currentUser to be defined when instantiated

    UserMock = UserService;
    ProfileCtrl = $controller('ProfileCtrl', {
      $rootScope: rootScope
    });
  }));

  describe('#update', function() {
    it ('should update the currentUser with values from the scope', function() {
      var that = ProfileCtrl;

      that.my.username = userBob.username;
      that.my.password = userBob.password;
      that.my.firstName = 'new';            //simulate updated data
      that.my.lastName  = userBob.lastName;

      that.update();

      expect(rootScope.currentUser.firstName).toBe('new');
    });
  });

});
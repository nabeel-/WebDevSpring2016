'use strict';

describe('Controller: ProfileCtrl', function () {

  // load the controller's module
  beforeEach(module('TutorConnect'));

  var ProfileCtrl, UserMock, rootScope, scope;

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

    scope = $rootScope.$new();

    UserMock = UserService;
    ProfileCtrl = $controller('ProfileCtrl', {
      $rootScope: rootScope,
      $scope: scope
    });
  }));

  describe('#update', function() {
    it ('should update the currentUser with values from the scope', function() {

      scope.username = userBob.username;
      scope.password = userBob.password;
      scope.firstName = 'new';            //simulate updated data
      scope.lastName  = userBob.lastName;

      scope.update();

      expect(rootScope.currentUser.firstName).toBe('new');
    });
  });

});
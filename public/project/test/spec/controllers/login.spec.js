'use strict';

describe('Controller: LoginCtrl', function () {

  // load the controller's module
  beforeEach(module('TutorConnect'));

  var LoginCtrl, UserMock, rootScope, scope;

  module(function($provide) {
    $provide.factory('UserService', function(_) {

      // Mock out the function call to login for testing
      this.findUserByCredentials = jasmine.createSpy('findUserByCredentials').andCallFake(function(u, p, c) {
        var users = [{'_id':234, 'firstName':'Bob','lastName':'Hope', 'username':'bob', 'password':'bob', 'roles': ['admin']}];

        var foundUser = _.findWhere(users, {username: u, password: p});

        c(foundUser);
      });

    });
  });

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, UserService) {
    rootScope = $rootScope;
    scope = $rootScope.$new();
    UserMock = UserService;
    LoginCtrl = $controller('LoginCtrl', {
      $rootScope: rootScope,
      $scope: scope
    });
  }));

  describe('#login', function() {
    it ('should not have any currentUser defined to begin with', function() {
      expect(rootScope.currentUser).not.toBeDefined();
    });

    it('should allow a successful login', function () {
      scope.username = 'bob';
      scope.password = 'bob';
      scope.login();

      expect(rootScope.currentUser.username).toBe('bob');
    });

    it('should reject a bad login for a known username', function () {
      scope.username = 'bob';
      scope.password = 'not';
      scope.login();

      expect(rootScope.currentUser).not.toBeDefined();
    });

    it('should reject a bad login for an unknown username', function () {
      scope.username = 'alice';
      scope.password = 'bob';
      scope.login();

      expect(rootScope.currentUser).not.toBeDefined();
    });
  });

});

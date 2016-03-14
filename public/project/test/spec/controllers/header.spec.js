'use strict';

describe('Controller: HeaderCtrl', function () {

  // load the controller's module
  beforeEach(module('TutorConnect'));

  var HeaderCtrl, rootScope, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    rootScope = $rootScope;
    scope = $rootScope.$new();
    HeaderCtrl = $controller('HeaderCtrl', {
      $rootScope: rootScope,
      $scope: scope
    });
  }));

  describe('#logout', function() {
    it('should remove the currentUser', function () {
      rootScope.currentUser = {'username': 'bob'};
      scope.logout();

      expect(rootScope.currentUser).toBe(null);
    });
  });
});

var app = angular.module("confencesApp")
  .controller( "userController", 
    [ '$scope', '$location', 'userService', '$location',
      function($scope, $location, userService, $location) {
     
    $scope.service = userService;
     
    $scope.login = function(credentials) {
      $scope.service.login(credentials).then(function(authData) {
      $location.path('/favorites');
      }).catch(function(error) {
        console.log(error);
      });    
    }

    $scope.getInclude = function() {
      if($scope.service.auth.$getAuth()) {
        return 'loggedInPartial.html';
      }
      return 'loginForm.html';
    }
    
    $scope.createUser = function(credentials) {
      console.log(credentials);
      $scope.service.createUser(
        credentials.email,
        credentials.password);
    }

    $scope.unAuth = function() {
      $scope.service.auth.$unauth();
      $location.path('/list');
    }
  }]);
  
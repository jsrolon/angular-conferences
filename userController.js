var app = angular.module("confencesApp")
  .controller( "userController", 
    [ '$scope', '$location', 'userService',
      function($scope, $location, userService) {
     
    $scope.service = userService;
     
    $scope.login = function(credentials) {
      $scope.service.login(credentials);    
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
    }
  }]);
  
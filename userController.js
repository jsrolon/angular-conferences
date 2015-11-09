var app = angular.module("confencesApp")
  .controller( "userController", 
    [ '$scope', '$location', 'userService',
      function($scope, $location, userService) {
     
    $scope.service = userService;
     
    $scope.login = function(credentials) {
      $scope.service.login(credentials);
    }
    
    $scope.createUser = function() {
      console.log($scope.credentials);
      $scope.service.createUser(
        $scope.credentials.email,
        $scope.credentials.password);
    }
  }]);
  
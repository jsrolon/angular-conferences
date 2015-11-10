var app = angular.module("confencesApp")
  .controller( "conferenceListController", 
    [ '$scope', '$location', 'conferenceService', 'userService',
      function($scope, $location, conferenceService, userService) {
    
    $scope.cservice = conferenceService;

    $scope.uservice = userService;
    
    $scope.$watch( 'cservice.conferences', function(){
      $scope.conferences = $scope.cservice.conferences;  
    });
    
    
    $scope.editConference = function ( conf ) {
      conferenceService.setCurrentConference ( conf );
      $location.path('/edit');
    };
    
    $scope.addConference = function () {
      conferenceService.setCurrentConference( conferenceService.newConference());
      $location.path('/edit');
    };

    $scope.showConference = function(conf) {
      conferenceService.setCurrentConference(conf);
      $location.path('/show');
    }
    
  }]);
  
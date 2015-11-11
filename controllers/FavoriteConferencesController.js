var app = angular.module("confencesApp")
  .controller( "FavoriteConferencesController", 
    [ '$scope', '$location', 'conferenceService', 'userService',
      function($scope, $location, conferenceService, userService) {
    
    $scope.cservice = conferenceService;

    $scope.uservice = userService;
    
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

    $scope.getUserFavs = function() {
      return $scope.cservice.getUserFavs();
    }

    $scope.userFavs = $scope.getUserFavs();
    
  }]);
  
var app = angular.module("confencesApp")
  .controller( "conferenceEditController", 
    [ '$scope', '$location', 'conferenceService', 'userService', 
      function($scope, $location, conferenceService, userService) {
    
    $scope.cservice = conferenceService;

    $scope.uservice = userService;

    $scope.$watch( 'cservice.currentConference', function() {
      $scope.conference = $scope.cservice.currentConference;
      $scope.comments = $scope.conference.comments;
    });

    $scope.$watch('cservice.currentConference.comments', function() {
      $scope.comments = $scope.conference.comments;
      console.log("comment list changed");
    });

    $scope.addComment = function(comment) {
      if($scope.conference.comments == null) {
        $scope.conference.comments = [];
      }
      $scope.conference.comments.push({
        owner: $scope.uservice.auth.$getAuth().uid,
        text: comment
      });
      $scope.cservice.createOrUpdate($scope.conference);
    };

    $scope.deleteComment = function(index) {
      $scope.conference.comments.splice(index, 1);
      $scope.cservice.createOrUpdate($scope.conference);
    }
    
    $scope.createOrUpdate = function() {
      conferenceService.createOrUpdate( $scope.conference );
      $location.path("/list");
    };
    
  }]);
  
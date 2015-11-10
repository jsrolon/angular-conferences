var app = angular.module("confencesApp")
  .controller( "conferenceEditController", 
    [ '$scope', '$location', 'conferenceService', 'userService', 'googleMaps', 
      function($scope, $location, conferenceService, userService, googleMap) {
    
    $scope.cservice = conferenceService;

    $scope.uservice = userService;

    $scope.data = [];

    $scope.$watch('data', function() {
      googleMap.placeMarkers($scope.data);
    });

    $scope.$watch('isFavorite', function()) {

    }

    $scope.loadMap = function() {
      console.log("i am loading the map");
      console.log($scope.conference);
      if($scope.conference != null) {
        console.log("I...WILL...GEOCODE!");

            // ejecuta geocode
          googleMap.getGeoCoder().geocode({
          address: $scope.conference.place
        
        }, function (results, status) {
          
          // muestra en consola el primer resultado
          var lat = results[ 0 ].geometry.location.lat(),
              lng = results[ 0 ].geometry.location.lng();
          console.log( lat, lng );
        
          // usa $scope.$apply() debido a que esta función se ejecuta
          // en el alcance del servicio "google-maps". Al ejecutar 
          // $apply, el controlador es notificado de los cambios
          $scope.$apply(function(){
            // asigna el resultado a $scope.data
            $scope.data = results.slice(0,1);
          });
        });
      }
    }

    $scope.$watch( 'cservice.currentConference', function() {
      $scope.conference = $scope.cservice.currentConference;
      $scope.comments = $scope.conference.comments;
      $scope.loadMap();
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

    $scope.addFavorite = function() {
      console.log("agregar a favoritos " + $scope.conference.$id);
      $scope.uservice.addFavorite($scope.conference.$id);
    }
  }]);
  
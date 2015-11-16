var app = angular.module("confencesApp")
  .controller( "conferenceEditController", 
    [ '$scope', 
      '$location', 
      'conferenceService', 
      'userService', 
      'googleMaps',
      '$timeout',
      function($scope, $location, conferenceService, userService, googleMap, $timeout) {
    
    $scope.cservice = conferenceService;

    $scope.uservice = userService;

    $scope.data = [];

    $scope.$watch('data', function() {
      googleMap.placeMarkers($scope.data);
    });

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
          $timeout(function(){
            // asigna el resultado a $scope.data
            $scope.data = results.slice(0,1);
          }, 200);
        });
      }
    }

    $scope.$watch( 'cservice.currentConference', function() {
      $scope.conference = $scope.cservice.currentConference;
      // parsear el unix timestamp
      $scope.conference.deadline = moment($scope.conference.deadline, "X");
      $scope.conference.notification = moment($scope.conference.notification, "X");
      $scope.conference.event = moment($scope.conference.event, "X");

      $scope.comments = $scope.conference.comments;
      $scope.isFavorite = $scope.uservice.isFavorite($scope.conference.$id);
      console.log("es favorito " + $scope.isFavorite);
      $scope.loadMap();
    });

    $scope.showEdit = function() {
      $location.path("/edit");
    }

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
      console.log("creating or updating");
      $scope.conference.deadline = $scope.conference.deadline.format("X");
      $scope.conference.notification = $scope.conference.notification.format("X");
      $scope.conference.event = $scope.conference.event.format("X");
      
      conferenceService.createOrUpdate( $scope.conference );
      $location.path("/show");
    };

    $scope.addFavorite = function() {
      console.log("agregar a favoritos " + $scope.conference.$id);
      $scope.uservice.addFavorite($scope.conference.$id);
    }

    $scope.removeFavorite = function() {
      console.log("quitar de favoritos " + $scope.conference.$id);
      $scope.uservice.removeFavorite($scope.conference.$id);
    }

    $scope.favoriteChanged = function() {
      $scope.isFavorite = !$scope.isFavorite;
      console.log("is favorite cambio a " + $scope.isFavorite);
      if($scope.isFavorite) {
        if(!$scope.uservice.isFavorite($scope.conference.$id)) {
          $scope.addFavorite();
        }
      } else {
        if($scope.uservice.isFavorite($scope.conference.$id)) {
          $scope.removeFavorite();
        }
      }
    };

    $scope.$watch('isFavorite', function() {
      console.log("is favorite cambio a " + $scope.isFavorite);
      if($scope.isFavorite) {
        if(!$scope.uservice.isFavorite($scope.conference.$id)) {
          $scope.addFavorite();
        }
      } else {
        if($scope.uservice.isFavorite($scope.conference.$id)) {
          $scope.removeFavorite();
        }
      }
    });
  }]);
  
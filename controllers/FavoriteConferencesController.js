var app = angular.module("confencesApp")
  .controller( "FavoriteConferencesController", 
    [ '$scope', '$location', 'conferenceService', 'userService', 'googleMaps', '$timeout',
      function($scope, $location, conferenceService, userService, googleMap, $timeout) {
    
    $scope.cservice = conferenceService;

    $scope.uservice = userService;

    $scope.data = [];

    $scope.loadMap = function() {
      console.log("i am loading the map");
      if($scope.userFavs != null && $scope.userFavs.length > 0) {
        console.log("I...WILL...GEOCODE!");
        var positions = [];
        $.each($scope.userFavs, function(index, value) {
          // ejecuta geocode
          googleMap.getGeoCoder().geocode({
          address: value.place
          }, function (results, status) {
            positions.push(results[0]);
          });
        });
        // usa $scope.$apply() debido a que esta función se ejecuta
        // en el alcance del servicio "google-maps". Al ejecutar 
        // $apply, el controlador es notificado de los cambios
        $timeout(function(){
          // asigna el resultado a $scope.data
          $scope.data = positions;
        }, 200);
      }
    }

    $scope.$watch('data', function() {
      googleMap.placeMarkers($scope.data);
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

    $scope.getUserFavs = function() {
      return $scope.cservice.getUserFavs();
    }

    $scope.userFavs = $scope.getUserFavs();

    $scope.loadMap();
    
  }]);
  
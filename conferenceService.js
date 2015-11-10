var app = angular.module("confencesApp")
  .factory( 'conferenceService', 
    [ '$firebaseArray', 'userService', 
      function( $firebaseArray, userService) {
    
    var service = { };
    
    service.ref = new Firebase( 'https://conferenciasjsrolon.firebaseio.com/conferences' );
    
    service.conferences = $firebaseArray( service.ref );
    
    service.addConference = function ( conf ) {
      conf.owner = userService.auth.$getAuth().uid;
      service.conferences.$add( conf );
    };
    
    service.newConference = function () {
      return {
        id            : "",
        name          : "",
        description   : "",
        place         : "",
        deadline      : "",
        notification  : "",
        event         : "",
        owner         : userService.auth.$getAuth().uid
      };
    }
      
    //service.currentConference = service.newConference();
    
    service.setCurrentConference = function ( conf ) {
      service.currentConference = conf;
    }
      
    service.createOrUpdate = function( conf ) {
      if ( typeof conf.$id == 'undefined' ) {
        service.conferences.$add( conf );
      } else {
        service.conferences.$save( conf );
      } 
    };
    
    service.conferences.$watch( function(event) {
      console.log(event);
    });
    
    return service;
    
  }]);
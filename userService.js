var app = angular.module("confencesApp")
  .factory( 'userService', 
    [ '$firebaseAuth',
      function( $firebaseAuth) {
    
    var service = { };
    
    service.ref = new Firebase( 'https://conferenciasjsrolon.firebaseio.com' );
    
    service.auth = $firebaseAuth( service.ref );
    
    service.login = function(credentials) {
      service.auth.$authWithPassword(credentials)
      .then(function(authData) {
        console.log("Logged in succesfully");
        console.log(authData);
        service.authData = authData;
      }).catch(function(error) {
        console.log(error);
      });
    }
    
    service.createUser = function(email, password) {
      service.auth.$createUser({
        email: email,
        password: password
      }).then(function(userData) {
        console.log("User created with uid: " + userData.uid);
        service.login({
          email: email,
          password: password
        });
      }).catch(function(error) {
        console.log(error);
      });
    }
    
    return service;
  }]);
  
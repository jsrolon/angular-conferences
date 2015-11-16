var app = angular.module("confencesApp")
  .factory( 'userService', 
    [ '$firebaseAuth',
      '$firebaseArray', '$rootScope',
      function( $firebaseAuth, $firebaseArray, $rootScope) {
    
    var service = { };
    
    service.ref = new Firebase( 'https://conferenciasjsrolon.firebaseio.com' );

    service.favRef = new Firebase( 'https://conferenciasjsrolon.firebaseio.com/favorites' );

    service.favoritesList = $firebaseArray(service.favRef);
    
    service.auth = $firebaseAuth( service.ref );
    
    service.login = function(credentials) {
      return service.auth.$authWithPassword(credentials);
    }

    service.getUID = function() {
      if(service.isLogged()) {
        return service.auth.$getAuth().uid;
      }
      return "";
    }

    service.addFavorite = function(confId) {
      if(service.auth.$getAuth() != null) {
        var favoriteObj = service.favoritesList.$getRecord(service.auth.$getAuth().uid);
        if(favoriteObj == null) {
          var child = service.favRef.child(service.auth.$getAuth().uid);
          child.set({
            favorites: [confId]
          });
        } else {
          favoriteObj.favorites.push(confId);
          service.favoritesList.$save(favoriteObj);
        }
      }
    }

    service.removeFavorite = function(confId) {
      if(service.auth.$getAuth() != null) {
        var favoriteObj = service.favoritesList.$getRecord(service.auth.$getAuth().uid);
        if(favoriteObj != null) {
          favoriteObj.favorites = favoriteObj.favorites.filter(function(em) {
            return em != confId;
          });
          service.favoritesList.$save(favoriteObj);
        }
      }
    }

    service.isLogged = function() {
      return service.auth.$getAuth() != null;
    }

    service.isFavorite = function(id) {
      if(service.auth.$getAuth() != null) {
        var favoriteObj = service.favoritesList.$getRecord(service.auth.$getAuth().uid);
        if(favoriteObj == null) {
          return false;
        } else {
          if($.inArray(id, favoriteObj.favorites) !== -1) {
            return true;
          }
        }
      }
      return false;
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
  
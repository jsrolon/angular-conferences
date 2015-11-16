var app = angular.module("confencesApp", [
    'ngRoute',
    'firebase',
    'google-maps',
    'datePicker'
  ]);

// configura las rutas
app.config( ['$routeProvider', function($routeProvider) {
  
  // cuando es /list
  $routeProvider
  .when( '/list', {
    templateUrl : 'views/ConferenceList.view.html',
    controller  : 'conferenceListController'

  // cuando es /edit
  }).when( '/edit', {
    templateUrl : 'views/ConferenceEdit.view.html',
    controller  : 'conferenceEditController'
    
  // cuando es show
  }).when( '/show', {
    templateUrl : 'views/ConferenceShow.view.html',
    controller  : 'conferenceEditController'
    
  // para la lista de favoritos del usuario
  }).when( '/favorites', {
    templateUrl : 'views/FavoriteConferences.view.html',
    controller  : 'FavoriteConferencesController'
    
  // en caso contrario
  }).otherwise({
    redirectTo: '/list'
  }) 
  
}]);

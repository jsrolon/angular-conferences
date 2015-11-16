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
    templateUrl : 'views/conferenceListView.html',
    controller  : 'conferenceListController'

  // cuando es /edit
  }).when( '/edit', {
    templateUrl : 'views/conferenceEditView.html',
    controller  : 'conferenceEditController'
    
  // cuando es show
  }).when( '/show', {
    templateUrl : 'views/conferenceShowView.html',
    controller  : 'conferenceEditController'
    
  // para la lista de favoritos del usuario
  }).when( '/favorites', {
    templateUrl : 'views/FavoriteConferences.html',
    controller  : 'FavoriteConferencesController'
    
  // en caso contrario
  }).otherwise({
    redirectTo: '/list'
  }) 
  
}]);

var app = angular.module("confencesApp", [
    'ngRoute',
    'firebase',
    'ui.date',
    'google-maps'
  ]);

// configura las rutas
app.config( ['$routeProvider', function($routeProvider) {
  
  // cuando es /list
  $routeProvider
  .when( '/list', {
    templateUrl : 'conferenceListView.html',
    controller  : 'conferenceListController'   

  // cuando es /edit
  }).when( '/edit', {
    templateUrl : 'conferenceEditView.html',
    controller  : 'conferenceEditController'
    
  // cuando es show
  }).when( '/show', {
    templateUrl : 'conferenceShowView.html',
    controller  : 'conferenceEditController'
    
  // para la lista de favoritos del usuario
  }).when( '/userList', {
    templateUrl : 'conferenceUserListView.html',
    controller  : 'conferenceUserListController'
    
  // en caso contrario
  }).otherwise({
    redirectTo: '/list'
  }) 
  
}]);

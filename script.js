var app = angular.module("confencesApp", [
    'ngRoute',
    'firebase'
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
    
  // en caso contrario
  }).otherwise({
    redirectTo: '/list'
  }) 
  
}]);

var app = angular.module('ln', [
  'ngMaterial',
  'ngRoute',
  'ngAnimate'
]);

app.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'src/templates/homepage.html',
      controller: 'HomepageCtrl'
    })
    .when('/about', {
      templateUrl: 'src/templates/about.html',
      controller: 'HomepageCtrl'
    })
    .when('/portfolio', {
      templateUrl: 'src/templates/portfolio.html',
      controller: 'HomepageCtrl'
    })
    .when('/contact', {
      templateUrl: 'src/templates/contact.html',
      controller: 'HomepageCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });

  // use the HTML5 History API
  $locationProvider.html5Mode(true);
});

app.controller('HomepageCtrl', ['$scope', '$mdSidenav', function ($scope, $mdSidenav) {
  $scope.toggleSidenav = function (menuId) {
    $mdSidenav(menuId).toggle();
  };

}]);

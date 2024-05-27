var app = angular.module('ln', [
  'ngMaterial',
  'ngRoute',
  'ngAnimate',
  'ui.bootstrap'
]);

app
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'src/templates/homepage.html',
        controller: 'HomepageCtrl'
      })
      .when('/about', {
        templateUrl: 'src/templates/about.html'
      })
      .when('/portfolio', {
        templateUrl: 'src/templates/portfolio.html',
        controller: 'PortfolioPageCtrl'
      })
      .when('/contact', {
        templateUrl: 'src/templates/contact.html',
        controller: 'ContactPageCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(['$rootScope', '$location', 'AppFactory', function ($rootScope, $location, AppFactory) {
    $rootScope.$on('$locationChangeStart', function () {
      AppFactory.isHomepage = $location.path() === '/';
    })
  }])
  .controller('AppCtrl', ['$scope', 'AppFactory', function ($scope, AppFactory) {
    $scope.appFactory = AppFactory;
    $scope.date = new Date();
  }])
  .controller('HomepageCtrl', ['$scope', '$location', '$mdSidenav', function ($scope, $location, $mdSidenav) {
    $scope.toggleSidenav = function (menuId) {
      $mdSidenav(menuId).toggle();
    };

    $scope.carouselPrev = function () {
      $scope.$broadcast('carousel.select.previous');
    };

    $scope.carouselNext = function () {
      $scope.$broadcast('carousel.select.next');
    };

    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    $scope.slides = [
      {
        image: '../../images/portfolio/taj_490x280.jpg',
        text: 'Restaurant Taj Mahal Brasov'
      },
      {
        image: '../../images/portfolio/win_490x280.jpg',
        text: 'WinWinHost'
      },
      {
        image: '../../images/portfolio/exclusiv_490x280.jpg',
        text: 'Exclusiv Fenix'
      }
    ];

  }])
  .controller('PortfolioPageCtrl', ['$scope', '$mdDialog', function ($scope, $mdDialog) {
    $scope.showAdvanced = function (ev, template) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'src/templates/portfolio-items/' + template + '.html',
        parent: angular.element(document.body),
        targetEvent: ev
      });

      function DialogController($scope, $mdDialog) {
        $scope.hide = function () {
          $mdDialog.hide();
        };
        $scope.cancel = function () {
          $mdDialog.cancel();
        };
        $scope.answer = function (answer) {
          $mdDialog.hide(answer
          )
        }
      }
    }
  }])
  .controller('ContactPageCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.formData = {};
    $scope.submit = function () {
      $http({
        method: 'POST',
        url: '/contact-files/contact-form.php',
        data: $.param($scope.formData),  //param method from jQuery
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}  //set the headers so angular passing info as form data (not request payload)
      }).success(function (data) {
          //success comes from the returned json object
          if (data.success) {
            $scope.resultMessage = data.message;
          }
        })
        .error(function (data, status, header, config) {
          console.log('error: ', data, 'status', status, 'header', header, 'config', config);
        });
    }
  }])
  .factory('AppFactory', function () {
    return {
      isHomepage: true
    }
  });

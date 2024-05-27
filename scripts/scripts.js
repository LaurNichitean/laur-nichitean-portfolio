var app = angular.module('ln', [
  'ngMaterial',
  'ngAnimate',
  'ui.bootstrap'
]);

app
  .config(function ($locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false,
      rewriteLinks: false
    });
  })
  .run(['$rootScope', '$location', 'AppFactory', function ($rootScope, $location, AppFactory) {
    $rootScope.$on('$locationChangeStart', function () {
      AppFactory.isHomepage = $location.path() === '/';
    })
  }])
  .config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('grey')
      .accentPalette('purple');
  })
  .controller('AppCtrl', ['$scope', '$location', '$mdSidenav', '$mdDialog', '$http', 'AppFactory', '$mdUtil', '$log',
    function ($scope, $location, $mdSidenav, $mdDialog, $http, AppFactory, $mdUtil, $log) {
      $scope.appFactory = AppFactory;
      $scope.date = new Date();

      $scope.toggleRight = buildToggler('right');

      /**
       * Build handler to open/close a SideNav; when animation finishes
       * report completion in console
       */
      function buildToggler(navID) {
        return $mdUtil.debounce(function () {
          $mdSidenav(navID)
            .toggle()
            .then(function () {
              $log.debug("toggle " + navID + " is done");
            });
        }, 300);
      }

      $scope.toggleSidenav = function (menuId) {
        $mdSidenav(menuId).toggle();
      };

      /* CONTACT */

      $scope.formData = {};
      $scope.submit = function () {
        $http({
          method: 'POST',
          url: '/contact-files/contact-form.php',
          data: $.param($scope.formData),  //param method from jQuery
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}  //set the headers so angular passing info as form data (not request payload)
        }).success(function (data) {
          //success comes from the returned json object
          if (data) {
            $scope.resultMessage = 'Thanks! Your message has been sent, I will try to respond as soon as possible.';
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

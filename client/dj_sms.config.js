(function() {
  'use strict';

  angular.module('dj_sms').config(['$routeProvider', configRouteTheme]);

  function configRouteTheme($routeProvider) {
    $routeProvider

      // home view, also the only view
      .when('/', {
        controller: 'HomeCtrl',
        conrollerAs: 'home',
        templateUrl: 'index.html'
      });
  }
})();

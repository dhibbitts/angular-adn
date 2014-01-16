'use strict';

angular.module('adn').factory('Auth', function ($rootScope, $location) {
  $rootScope.local = JSON.parse((typeof(localStorage.data) !== 'undefined') ? localStorage.data : '{}');
  $rootScope.$watch('local', function () {
    localStorage.data = JSON.stringify($rootScope.local);
  }, true);

  return {
    isLoggedIn: function (local) {
      if(local === undefined) {
        local = $rootScope.local;
      }
      return local && typeof(local.accessToken) !== 'undefined';
    },
    logout: function () {
      $rootScope.local = {};
      localStorage.clear();
      $rootScope.$broadcast('logout');
    },
    login: function (accessToken) {
      $rootScope.local.accessToken = accessToken || jQuery.url($location.absUrl()).fparam('access_token') || $rootScope.local.accessToken;
      $location.hash('');
      $rootScope.$broadcast('login');
    }
  };

});
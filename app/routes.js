(function(){

  'use strict';

  angular.module('DeezerApp').config(RoutesConfig);

  function RoutesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('Home', {
      url: '/',
      templateUrl: 'home/home.html',
      controller: 'MainCtrl'
    }).state('SecondPage', {
      url:'/second-page',
      templateUrl: 'second/second.html'
    });
  }

})();

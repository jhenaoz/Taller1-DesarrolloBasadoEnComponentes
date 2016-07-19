(function() {
  'use strict';

  angular.module('DeezerApp').service('deezerService', deezerService);

  deezerService.$inject = ['$http'];

  /* @ngInject */
  function deezerService($http) {
    var service = {
      getSongByName : getSongByName,
      requestNextUrl : requestNextUrl,
      getArtistById: getArtistById
    };

    return service;

    function getSongByName(name){
      var request = {
        method: 'GET',
        url: 'https://deezerdevs-deezer.p.mashape.com/search?q=' + name,
        headers: {
          'X-Mashape-Key': 'WILX7s8CIPmshwtyE6SxV6fR1PYPp1XRuE1jsnW5TBnXCEN164',
          'Accept': 'text/plain'
        }
      };
      return $http(request);
    }

    function getArtistById(id){
      var request = {
        method: 'GET',
        url: 'https://deezerdevs-deezer.p.mashape.com/artist/' + id,
        headers: {
          'X-Mashape-Key': 'WILX7s8CIPmshwtyE6SxV6fR1PYPp1XRuE1jsnW5TBnXCEN164',
          'Accept': 'text/plain'
        }
      };
      return $http(request);
    }

    function requestNextUrl(url){
      return $http.get(url);
    }
  }
})();

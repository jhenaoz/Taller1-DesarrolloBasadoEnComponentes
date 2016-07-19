(function() {
  'use strict';

  angular.module('DeezerApp').controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$scope', 'deezerService'];

  /* @ngInject */
  function MainCtrl($scope, deezerService) {
    var vm = this;
    $scope.name = '';
    $scope.track = {};
    $scope.searchInfo = searchInfo;
    $scope.artist = {};
    $scope.images = [];
    $scope.loading = false;
    $scope.clearData = function(){
      $scope.artist = {};
    }

    function searchInfo(query){
      $scope.artist = {};
      $scope.loading = true;
      deezerService.getSongByName(query).then(function(response){
        deezerService.getArtistById(response.data.data[0].artist.id).then(function(res){
          $scope.loading = false;
          $scope.artist = res.data;
        }, function (error){
          $scope.loading = false;
          console.log(error);
        });
      }, function(error){
        console.log(error);
      });
    }
  }
})();

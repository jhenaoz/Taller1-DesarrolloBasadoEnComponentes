(function() {
  'use strict';

  angular.module('DeezerApp').controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$scope', 'deezerService'];

  /* @ngInject */
  function MainCtrl($scope, deezerService) {
    var vm = this;
    $scope.name = '';
    $scope.searchInfo = searchInfo;

    function searchInfo(){
      deezerService.getSongByName($scope.name).then(function(response){
        console.log(response.data);
      }, function(error){
        console.log(error);
      });
    }
  }
})();

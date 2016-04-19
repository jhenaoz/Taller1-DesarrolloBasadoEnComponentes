(function() {
  'use strict';

  angular.module('DeezerApp').controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$scope', 'deezerService'];

  /* @ngInject */
  function MainCtrl($scope, deezerService) {
    var vm = this;
    $scope.name = '';
    $scope.searchInfo = searchInfo;
    $scope.images = [];

    function searchInfo(){
      $scope.images = [];
      deezerService.getSongByName($scope.name).then(function(response){
        searchInObject(response.data.data);
      }, function(error){
        console.log(error);
      });
    }

    function searchInObject(object){
      angular.forEach(object, function(obj){
        if (typeof obj === 'object') {
          for(var key in obj){
            if(typeof obj[key] === 'string'){
              validateImageUrl(obj[key]);
            }else if (typeof obj[key] === 'object') {
              searchInObject(obj[key]);
            }
          }
        }
        if (typeof obj === 'string') {
          validateImageUrl(obj);
        }
      });
    }

    function validateImageUrl(url){
      if(url.match(/.*\.jpg/)) {
        console.log('Imagen', url);
        $scope.images.push({'src' :url});
      }
    }
  }
})();

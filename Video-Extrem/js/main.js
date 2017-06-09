var app = angular.module('indexApp', ['ngResource']);


  //    __  __            _
  //   |  \/  |          (_)
  //   | \  / | _____   ___  ___
  //   | |\/| |/ _ \ \ / / |/ _ \
  //   | |  | | (_) \ V /| |  __/
  //   |_|  |_|\___/ \_/ |_|\___|
  //
  //
  app.controller('ubicationController', ubicationController);

  ubicationController.$inject = ['$resource', '$scope'];

  function ubicationController($resource, $scope) {
    // tip: to debug, open chrome dev tools and uncomment the following line
    //debugger;
    $scope.whatsapp = '8472-8298';
    $scope.actualUbication = {};
    $scope.wazeDirection = "https://embed.waze.com/iframe?zoom=16&lat=9.976001&lon=-84.009787&pin=1";
    $scope.ubications = [{
        name: 'Moravia',
        telephone: '2241-4908',
        coordinateX: 9.976001,
        coordinateY: -84.009787,
      },
      {

        name: 'Coronado',
        telephone: '2529-2479',
        coordinateX: 9.976001,
        coordinateY: -84.009787,
      },
      {

        name: 'Sabanilla',
        telephone: '2273-5331',
        coordinateX: 9.943956,
        coordinateY: -84.023248,
      },
      {

        name: 'San Jose',
        telephone: '2221-4150',
        coordinateX: 9.936233,
        coordinateY: -84.079634,
      },
    ];

    $scope.selectUbication = function (ubication) {
      $scope.actualUbication = ubication;
      createMap(ubication.coordinateX, ubication.coordinateY);

    };

  }

  app.controller('mediaController', mediaController);

  mediaController.$inject = ['$resource', '$scope', 'messageService'];

  function mediaController($resource, $scope, messageService) {
    // tip: to debug, open chrome dev tools and uncomment the following line
    //debugger;
    $scope.waze = true;
    $scope.whatsapp = true;
    $scope.facebook = true;
    $scope.whatsappMessage = function () {
      messageService.setMessage('Whatsapp', 'El numero de whatsapp para cualquier consulta es el siguiente: 8472-8298 ');

    };
  }



  app.controller('disscountsController', disscountsController);

  disscountsController.$inject = ['$resource', '$scope', 'messageService'];

  function disscountsController($resource, $scope, messageService) {
    // tip: to debug, open chrome dev tools and uncomment the following line
    //debugger;
    $scope.images = [{
        source: 'http://lorempixel.com/940/480/people/',
        description: 'Slide 1',
      },
      {
        source: 'http://lorempixel.com/940/480/nature/',
        description: 'Slide 2',
      },
      {
        source: 'http://lorempixel.com/940/480/abstract/',
        description: 'Slide 3',
      },
      {
        source: 'http://lorempixel.com/940/480/nightlife/',
        description: 'Slide 4',
      },

    ];

  }

})();

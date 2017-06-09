//    __  __ ______ _____ _____
//   |  \/  |  ____|  __ \_   _|   /\
//   | \  / | |__  | |  | || |    /  \
//   | |\/| |  __| | |  | || |   / /\ \
//   | |  | | |____| |__| || |_ / ____ \
//   |_|  |_|______|_____/_____/_/    \_\
//
app.controller('mediaController', mediaController);
mediaController.$inject = ['$scope', '$http', 'dataManager', 'messageService','$sce'];

function mediaController($scope, $http, dataManager, messageService,$sce) {

  $scope.wazeLiveMap = false;
  $scope.facebook = false;
  $scope.waze = true;
  $scope.whatsapp = true;
  $scope.facebook = true;
  $scope.whatsappMessage = function() {
    messageService.setMessage('Whatsapp', 'El numero de whatsapp para cualquier consulta es el siguiente: 8472-8298 ');

  };
  $scope.wazeDirection = null;
  $scope.ubications = [{
      name: 'Moravia',
      telephone: '2241-4908',
      coordinateX: 9.9620633,
      coordinateY: -84.0526522,
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

  $scope.setWazeDir = function(actualUbication) {
    var url = "https://embed.waze.com";
    var type = "iframe";
    var amountOfZoom = 17;
    var lat = actualUbication.coordinateX;
    var lon = actualUbication.coordinateY;
    var pinAmount = 1;

    $scope.wazeDirection = $sce.trustAsResourceUrl(url + "/" + type + "?zoom=" + amountOfZoom + "&lat=" + lat + "&lon=" + lon + "&pin=" + pinAmount);


  }


}

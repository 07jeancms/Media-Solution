//    __  __ ______ _____ _____
//   |  \/  |  ____|  __ \_   _|   /\
//   | \  / | |__  | |  | || |    /  \
//   | |\/| |  __| | |  | || |   / /\ \
//   | |  | | |____| |__| || |_ / ____ \
//   |_|  |_|______|_____/_____/_/    \_\
//
app.controller('mediaController', mediaController);
mediaController.$inject = ['$scope', '$http', 'dataManager', 'messageService'];

function mediaController($scope, $http, dataManager, messageService) {
  $scope.actorDataSet = dataManager.actorData;
  $scope.actorsCollection = {
    actors: [],
  };
  $scope.itemsByPage = 5;
  $scope.actualActor = {};
  $scope.contentType = 'application/x-www-form-urlencoded; charset=UTF-8';

  $scope.deleteActor = function (pActualActor) {
    $scope.url = 'http://www.videoextrem.com/api/actors.php?queryType=delete';
    $scope.actorData = {
      idActor: pActualActor.idActor,
    };
    $http.defaults.headers.post['Content-Type'] = $scope.contentType;
    $http.post($scope.url, $scope.actorData).
    then(function (data, status) {
      alert('El Actor ' + pActualActor.actor + ' ha sido borrado');
      location.reload();
    });
  };

  $scope.addActor = function () {
    var actorNameInput = document.getElementById('actorName').value;
    $scope.url = 'http://www.videoextrem.com/api/actors.php?queryType=add';
    $scope.actorData = {
      actor: actorNameInput,
    };
    $http.defaults.headers.post['Content-Type'] = $scope.contentType;
    $http.post($scope.url, $scope.actorData).
    then(function (data, status) {
      alert('El actor ' + actorNameInput + ' ha sido agregado');
      location.reload();
    });
  };

  $scope.setEditActor = function (pActualActor) {
    $scope.actualActor = pActualActor;
  };

  $scope.editActor = function () {
    var actorNameInput = document.getElementById('updateActorName').value;
    $scope.url = 'http://www.videoextrem.com/api/actors.php?queryType=edit';
    $scope.actorData = {
      idActor: $scope.actualActor.idActor,
      actor: actorNameInput,
    };
    $http.defaults.headers.post['Content-Type'] = $scope.contentType;
    $http.post($scope.url, $scope.actorData).
    then(function (data, status) {
      alert('El actor ' + $scope.actualActor.actor + ' ha sido actualizado a ' + actorNameInput);
      location.reload();
    });
  };

  $scope.showActor = function (pActualActor) {
    $scope.actualActor = pActualActor;
  };

}

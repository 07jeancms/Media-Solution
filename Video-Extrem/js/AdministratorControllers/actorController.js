//                 _
//       /\       | |
//      /  \   ___| |_ ___  _ __
//     / /\ \ / __| __/ _ \| '__|
//    / ____ \ (__| || (_) | |
//   /_/    \_\___|\__\___/|_|
//
//
app.controller("actorController", actorController);
actorController.$inject =['$scope', "$http","dataManager","messageService"];

function actorController($scope, $http,dataManager,messageService) {
    $scope.actorDataSet = dataManager.divData.actors;
    $scope.actorsCollection  = {data : []};
    $scope.itemsByPage=5;
    $scope.actualActor = {};

   $scope.actualDiv = dataManager.actualDiv;
    $scope.actualClass = "";



    $scope.$watch('actorDataSet.time', function() {
            var actualTime = $scope.actorDataSet.time;
            if(actualTime<=3){
                $scope.actualClass = "iconWaiting"+actualTime+" fa-spinner fa-spin";
            }
            else{
                $scope.actualClass = "iconComplete"
            }

    });

    $scope.deleteActor = function(pActualActor){
        $scope.url = "http://www.videoextrem.com/api/actors.php?queryType=delete";
        $scope.actorData = {
            'idActor' : pActualActor.idActor
        }
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $http.post($scope.url, $scope.actorData).
        then(function(data, status) {
            messageService.setMessage("El Actor " + pActualActor.actor + " se ha eliminado correctamente.");
            setTimeout(function() { window.location.reload(true); }, 2000);
        })
    }

    $scope.addActor = function(){
        var actorNameInput = document.getElementById('actorName').value;
        $scope.url = "http://www.videoextrem.com/api/actors.php?queryType=add";
        $scope.actorData = {
            'actor' : actorNameInput
        }
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $http.post($scope.url, $scope.actorData).
        then(function(data, status) {
            messageService.setMessage("El actor " + actorNameInput + " se ha agregado correctamente.");
            setTimeout(function() { window.location.reload(true); }, 2000);
        })
    }

    $scope.setEditActor = function (pActualActor) {
        $scope.actualActor = pActualActor;
    }

    $scope.editActor = function () {
        var actorNameInput = document.getElementById('updateActorName').value;
        $scope.url = "http://www.videoextrem.com/api/actors.php?queryType=edit";
        $scope.actorData = {
            'idActor' : $scope.actualActor.idActor,
            'actor' : actorNameInput
        }
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $http.post($scope.url, $scope.actorData).
        then(function(data, status) {
            messageService.setMessage("El actor " + $scope.actualActor.actor + " ha sido actualizado a " + actorNameInput + " correctamente.");
            setTimeout(function() { window.location.reload(true); }, 2000);
        })
    }

    $scope.showActor = function(pActualActor){
        $scope.actualActor = pActualActor;
    }

}

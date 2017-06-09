//    _    _ ____ _____ _____       _______ _____ ____  _   _ 
//   | |  | |  _ \_   _/ ____|   /\|__   __|_   _/ __ \| \ | |
//   | |  | | |_) || || |       /  \  | |    | || |  | |  \| |
//   | |  | |  _ < | || |      / /\ \ | |    | || |  | | . ` |
//   | |__| | |_) || || |____ / ____ \| |   _| || |__| | |\  |
//    \____/|____/_____\_____/_/    \_\_|  |_____\____/|_| \_|
//                                                             
app.controller("ubicationController", ubicationController);
ubicationController.$inject =['$scope', "$http","dataManager","messageService"];

function ubicationController($scope, $http,dataManager,messageService) {
    $scope.actorDataSet = dataManager.actorData;
    $scope.actorsCollection  = {actors : []};
    $scope.itemsByPage=5;
    $scope.actualActor = {};

    $scope.deleteActor = function(pActualActor){
        $scope.url = "http://www.videoextrem.com/api/actors.php?queryType=delete";
        $scope.actorData = {
            'idActor' : pActualActor.idActor 
        }
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $http.post($scope.url, $scope.actorData).
        then(function(data, status) {
            alert("El Actor " + pActualActor.actor + " ha sido borrado");
            location.reload();
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
            alert("El actor " + actorNameInput + " ha sido agregado");
            location.reload();
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
            alert("El actor " + $scope.actualActor.actor + " ha sido actualizado a " + actorNameInput);
            location.reload();
        })
    }

    $scope.showActor = function(pActualActor){
        $scope.actualActor = pActualActor;
    }

}
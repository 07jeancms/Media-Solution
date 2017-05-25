//    _____ _____  _____  _____ ____  _    _ _   _ _______ _____ 
//   |  __ \_   _|/ ____|/ ____/ __ \| |  | | \ | |__   __/ ____|
//   | |  | || | | (___ | |   | |  | | |  | |  \| |  | | | (___  
//   | |  | || |  \___ \| |   | |  | | |  | | . ` |  | |  \___ \ 
//   | |__| || |_ ____) | |___| |__| | |__| | |\  |  | |  ____) |
//   |_____/_____|_____/ \_____\____/ \____/|_| \_|  |_| |_____/ 
//                                                               
app.controller("discountsController", discountsController);
discountsController.$inject =['$scope', "$http","dataManager","messageService"];

function discountsController($scope, $http,dataManager,messageService) {
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
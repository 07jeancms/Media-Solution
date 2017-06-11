//     _____
//    / ____|
//   | |  __  ___ _ __  _ __ ___  ___
//   | | |_ |/ _ \ '_ \| '__/ _ \/ __|
//   | |__| |  __/ | | | | |  __/\__ \
//    \_____|\___|_| |_|_|  \___||___/
//
//
app.controller("genreController", genreController);
genreController.$inject = ['$scope', "$http","dataManager","messageService"];

function genreController($scope, $http,dataManager,messageService) {
     $scope.genreDataSet = dataManager.divData.genres;
    $scope.genresCollection  = {data : []};
    $scope.itemsByPage=5;
    $scope.actualGenre = {};
    $scope.actualClass = "";

    $scope.$watch('genreDataSet.time', function() {
            var actualTime = $scope.genreDataSet.time;
            if(actualTime<=3){
                $scope.actualClass = "iconWaiting"+actualTime+" fa-spinner fa-spin";
            }
            else{
                $scope.actualClass = "iconComplete"
            }

    });
    $scope.addGenre = function(){
        var genreNameInput = document.getElementById('GenreName').value;
        var genreDescriptionInput = document.getElementById('GenreDescription').value;
        $scope.url = "http://www.videoextrem.com/api/genres.php?queryType=add";
        $scope.genreData = {
            'genero' : genreNameInput,
            'descripcion' : genreDescriptionInput
        }
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $http.post($scope.url, $scope.genreData)
            .then(function(data, status) {
            messageService.setMessage("El genero " + genreNameInput + " se ha agregado correctamente.");
            setTimeout(function() { window.location.reload(true); }, 2000);
        })
    };

    $scope.deleteGenre = function(pActualGenre){
        $scope.url = "http://www.videoextrem.com/api/genres.php?queryType=delete";
        $scope.genreData = {
            'idGenero' : pActualGenre.idGenero
        }
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $http.post($scope.url, $scope.genreData).
        then(function(data, status) {
            messageService.setMessage("El genero " + pActualGenre.genero + " se ha eliminado correctamente.");
            setTimeout(function() { window.location.reload(true); }, 2000);
        })
    };

    $scope.setEditGenre = function (pActualGenre) {
        $scope.actualGenre = pActualGenre;
    };

    $scope.editGenre = function () {
        var genreNameInput = document.getElementById('genreNameInput').value;
        var genreDescriptionInput = document.getElementById('genreDescriptionInput').value;
        $scope.url = "http://www.videoextrem.com/api/genres.php?queryType=edit";
        $scope.genreData = {
            'idGenero' : $scope.actualGenre.idGenero,
            'genero' : genreNameInput,
            'descripcion' : genreDescriptionInput
        }
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $http.post($scope.url, $scope.genreData).
        then(function(data, status) {
            messageService.setMessage("El genero se ha actualizado correctamente.");
            setTimeout(function() { window.location.reload(true); }, 2000);
        })
    };

    $scope.showGenre = function(pActualGenre){
        $scope.actualGenre = pActualGenre;
    }

}

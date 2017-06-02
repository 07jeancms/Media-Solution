
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
     $scope.genreDataSet = dataManager.genreData;
    $scope.genresCollection  = {genres : []};
    $scope.itemsByPage=5;
    $scope.actualGenre = {};
    $scope.actualDiv = dataManager.actualDiv;
    $scope.actualClass = "";
    
    

    $scope.$watch('actualDiv["genre"].time', function() {
            var actualTime = $scope.actualDiv["genre"].time;
            console.log("Actual Div Genres "+actualTime);
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
            alert("El genero " + genreNameInput + " ha sido agregado");
            location.reload();
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
            alert("El genero " + pActualGenre.genero + " ha sido borrado");
            location.reload();
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
            alert("Nombre anterior: " + $scope.actualGenre.genero + " ==> Nombre actual: " + genreNameInput + "\n"
                  + "Descripcion anterior: " + $scope.actualGenre.descripcion + " ==> Descripcion actual: " + genreDescriptionInput);
            location.reload();
        })
    };

    $scope.showGenre = function(pActualGenre){
        $scope.actualGenre = pActualGenre;
    }

}
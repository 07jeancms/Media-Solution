//     _____       _     _   _ _   _           
//    / ____|     | |   | | (_) | | |          
//   | (___  _   _| |__ | |_ _| |_| | ___  ___ 
//    \___ \| | | | '_ \| __| | __| |/ _ \/ __|
//    ____) | |_| | |_) | |_| | |_| |  __/\__ \
//   |_____/ \__,_|_.__/ \__|_|\__|_|\___||___/
//                                             
//           
app.controller("subtitlesController", subtitlesController);
subtitlesController.$inject = ['$scope', "$http","dataManager","messageService"];

function subtitlesController($scope, $http,dataManager,messageService) {


    $scope.subtitleDataSet = dataManager.subtitleData;
    $scope.subtitlesCollection  = {subtitles : []};
    $scope.itemsByPage=5;
    $scope.actualSubtitle = {};
    
    $scope.deleteSubtitle = function(pActualSubtitle){
        $scope.url = "http://www.videoextrem.com/api/subtitles.php?queryType=delete";
        $scope.subtitleData = {
            'idSubtitulo' : pActualSubtitle.idSubtitulo 
        }
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $http.post($scope.url, $scope.subtitleData)
            .then(function(data, status) {
            alert("El subtitulo " + pActualSubtitle.subtitulo + " ha sido borrado");
            location.reload();
        })
    }

    $scope.addSubtitle = function(){
        var subtitleNameInput = document.getElementById('SubtitleName').value;
        $scope.url = "http://www.videoextrem.com/api/subtitles.php?queryType=add";
        $scope.subtitleData = {
            'subtitulo' : subtitleNameInput 
        }
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $http.post($scope.url, $scope.subtitleData).
        then(function(data, status) {
            alert("El subtitulo " + subtitleNameInput + " ha sido agregado");
            location.reload();
        })
    }

    $scope.setEditSubtitle = function (pActualSubtitle) {
        $scope.actualSubtitle = pActualSubtitle;
    }

    $scope.editSubtitle = function () {
        var subtitleNameInput = document.getElementById('editSubtitleName').value;
        $scope.url = "http://www.videoextrem.com/api/subtitles.php?queryType=edit";
        $scope.subtitleData = {
            'idSubtitulo' : $scope.actualSubtitle.idSubtitulo,
            'subtitulo' : subtitleNameInput 
        }
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $http.post($scope.url, $scope.subtitleData).
        then(function(data, status) {
            alert("El subtitulo " + $scope.actualSubtitle.subtitulo + " ha sido actualizado a " + subtitleNameInput);
            location.reload();
        })
    }

    $scope.showSubtitle = function(pActualSubtitle){
        $scope.actualSubtitle = pActualSubtitle;
    }

}
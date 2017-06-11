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


    $scope.subtitleDataSet = dataManager.divData.subtitles;
    $scope.subtitlesCollection  = {data : []};
    $scope.itemsByPage=5;
    $scope.actualSubtitle = {};

    $scope.actualDiv = dataManager.actualDiv;
    $scope.actualClass = "";



    $scope.$watch('subtitleDataSet.time', function() {
            var actualTime = $scope.subtitleDataSet.time;
            if(actualTime<=3){
                $scope.actualClass = "iconWaiting"+actualTime+" fa-spinner fa-spin";
            }
            else{
                $scope.actualClass = "iconComplete"
            }

    });

    $scope.deleteSubtitle = function(pActualSubtitle){
        $scope.url = "http://www.videoextrem.com/api/subtitles.php?queryType=delete";
        $scope.subtitleData = {
            'idSubtitulo' : pActualSubtitle.idSubtitulo
        }
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $http.post($scope.url, $scope.subtitleData)
            .then(function(data, status) {
            messageService.setMessage("El subtitulo " + pActualSubtitle.subtitulo + " se ha borrado correctamente.");
            setTimeout(function() { window.location.reload(true); }, 2000);
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
            messageService.setMessage("El subtitulo " + subtitleNameInput + " se ha agregado correctamente.");
            setTimeout(function() { window.location.reload(true); }, 2000);
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
            messageService.setMessage("El subtitulo " + $scope.actualSubtitle.subtitulo + " ha sido actualizado a " + subtitleNameInput + " correctamente.");
            setTimeout(function() { window.location.reload(true); }, 2000);
        })
    }

    $scope.showSubtitle = function(pActualSubtitle){
        $scope.actualSubtitle = pActualSubtitle;
    }

}

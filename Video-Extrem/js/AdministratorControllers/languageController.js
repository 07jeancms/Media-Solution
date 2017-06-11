//    _
//   | |
//   | |     __ _ _ __   __ _ _   _  __ _  __ _  ___
//   | |    / _` | '_ \ / _` | | | |/ _` |/ _` |/ _ \
//   | |___| (_| | | | | (_| | |_| | (_| | (_| |  __/
//   |______\__,_|_| |_|\__, |\__,_|\__,_|\__, |\___|
//                       __/ |             __/ |
//                      |___/             |___/

app.controller("languageController", languageController);
languageController.$inject = ['$scope', "$http","dataManager","messageService"];

function languageController ( $scope, $http,dataManager,messageService) {
    $scope.languageDataSet = dataManager.divData.language;
    $scope.languagesCollection  = {data : []};
    $scope.itemsByPage=5;
    $scope.actualLanguage = {};
    $scope.actualClass = "";

    $scope.$watch('languageDataSet.time', function() {
            var actualTime = $scope.languageDataSet.time;
            console.log("Actual Div language "+actualTime);
            if(actualTime<=3){
                $scope.actualClass = "iconWaiting"+actualTime+" fa-spinner fa-spin";
            }
            else{
                $scope.actualClass = "iconComplete";
            }
    });

    $scope.deleteLanguage = function(pActualIdioma){
        $scope.url = "http://www.videoextrem.com/api/language.php?queryType=delete";
        $scope.languageData = {
            'idIdioma' : pActualIdioma.idIdioma
        }
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $http.post($scope.url, $scope.languageData).
        then(function(data, status) {
            messageService.setMessage("El idioma " + pActualIdioma.idioma + " se ha eliminado correctamente.");
            setTimeout(function() { window.location.reload(true); }, 2000); 
        })
    }

    $scope.addLanguage = function(){
        var languageNameInput = document.getElementById('LanguageName').value;
        $scope.url = "http://www.videoextrem.com/api/language.php?queryType=add";
        $scope.languageData = {
            'idioma' : languageNameInput
        }
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $http.post($scope.url, $scope.languageData).
        then(function(data, status) {
            messageService.setMessage("El idioma " + languageNameInput + " se ha agregado correctamente.");
            setTimeout(function() { window.location.reload(true); }, 2000); 
        })
    }

    $scope.setEditLanguage = function (pActualLanguage) {
        $scope.actualLanguage = pActualLanguage;
    }

    $scope.editLanguage = function () {
        var languageNameInput = document.getElementById('updateLanguageName').value;
        $scope.url = "http://www.videoextrem.com/api/language.php?queryType=edit";
        $scope.languageData = {
            'idIdioma' : $scope.actualLanguage.idIdioma,
            'idioma' : languageNameInput
        }
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $http.post($scope.url, $scope.languageData).
        then(function(data, status) {
            messageService.setMessage("El idioma " + $scope.actualLanguage.idioma + " ha sido actualizado a " + languageNameInput + " correctamente.");
            setTimeout(function() { window.location.reload(true); }, 2000); 
        })
    }

    $scope.showLanguage = function(pActualLanguage){
        $scope.actualLanguage = pActualLanguage;
    }

}

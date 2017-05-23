
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
    $scope.languageDataSet = dataManager.languageData;
    $scope.languagesCollection  = {languages : []};
    $scope.itemsByPage=5;
    $scope.actualLanguage = {};

    

    $scope.deleteLanguage = function(pActualIdioma){
        $scope.url = "http://www.videoextrem.com/api/language.php?queryType=delete";
        $scope.languageData = {
            'idIdioma' : pActualIdioma.idIdioma 
        }
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $http.post($scope.url, $scope.languageData).
        then(function(data, status) {
            alert("El idioma " + pActualIdioma.idioma + " ha sido borrado");
            location.reload();
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
            alert("El idioma " + languageNameInput + " ha sido agregado");
            location.reload();
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
            alert("El idioma " + $scope.actualLanguage.idioma + " ha sido actualizado a " + languageNameInput);
            location.reload();
        })
    }

    $scope.showLanguage = function(pActualLanguage){
        $scope.actualLanguage = pActualLanguage;
    }

}
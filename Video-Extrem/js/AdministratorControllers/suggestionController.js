//     _____                             _   _                 
//    / ____|                           | | (_)                
//   | (___  _   _  __ _  __ _  ___  ___| |_ _  ___  _ __  ___ 
//    \___ \| | | |/ _` |/ _` |/ _ \/ __| __| |/ _ \| '_ \/ __|
//    ____) | |_| | (_| | (_| |  __/\__ \ |_| | (_) | | | \__ \
//   |_____/ \__,_|\__, |\__, |\___||___/\__|_|\___/|_| |_|___/
//                  __/ | __/ |                                
//                 |___/ |___/                                 

app.controller("suggestionsController", suggestionsController);
suggestionsController.$inject = ['$scope', "$http","dataManager","messageService"];;

function suggestionsController( $scope, $http,dataManager,messageService) {
    $scope.suggestionDataSet = dataManager.suggestionData;
    $scope.suggestionsCollection  = {suggestions : []};
    $scope.itemsByPage=5;
    $scope.actualSuggestions = {};
    
    $scope.deleteSuggestion = function(pActualSuggestion){
        $scope.actualSuggestion = pActualSuggestion;    
        $scope.url = "http://www.videoextrem.com/api/suggestions.php?queryType=delete";
        $scope.suggestionData = {
            'suggestionId' : pActualSuggestion.idSugerencia 
        }
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $http.post($scope.url, $scope.suggestionData)
            .then(function(data, status) {
            alert("La sugerencia ha sido eliminada");
            location.reload();
        })        
    }
    
    $scope.addSuggestion = function(){
        var dropdownStoreValue = document.getElementById("selectLocal").value;
        var suggestionBody = document.getElementById("textAreaSuggestion").value;

        if(dropdownStoreValue !== "local"){
            if(suggestionBody !== ""){
                var url = "http://www.videoextrem.com/api/suggestions.php?queryType=add";

                var suggestionData = {
                    'userId': 9,
                    'store' : dropdownStoreValue,
                    'suggestion': suggestionBody
                };
                $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
                $http.post(url, suggestionData)
                .then(function(data, status) {
                    alert("Su sugerencia ha sido enviada. Muchas gracias por su opinión");
                        document.getElementById("selectLocal").value = 'local';
                        document.getElementById("textAreaSuggestion").value = '';
                })
            }
            else{
                alert("Por favor ingrese una sugerencia");
            }
        }
        else{
            alert("Por favor ingrese un local al cual dirigir la sugerencia");
        }
    }

}  

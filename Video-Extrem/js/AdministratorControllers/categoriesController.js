//     _____      _                        _           
//    / ____|    | |                      (_)          
//   | |     __ _| |_ ___  __ _  ___  _ __ _  ___  ___ 
//   | |    / _` | __/ _ \/ _` |/ _ \| '__| |/ _ \/ __|
//   | |___| (_| | ||  __/ (_| | (_) | |  | |  __/\__ \
//    \_____\__,_|\__\___|\__, |\___/|_|  |_|\___||___/
//                         __/ |                       
//                        |___/                        
app.controller("categoriesController", categoriesController);
categoriesController.$inject = ['$scope', "$http","dataManager","messageService"];

function categoriesController($scope, $http,dataManager,messageService) {
    $scope.categoryDataSet = dataManager.categoryData;
    $scope.categoriesCollection  = {categories : []};
    $scope.itemsByPage=5;
    $scope.actualCategory  = {};
     

     $scope.actualDiv = dataManager.actualDiv;
    $scope.actualClass = "";
    
    

    $scope.$watch('actualDiv["category"].time', function() {
            var actualTime = $scope.actualDiv["category"].time;
            console.log("Actual Div categories "+actualTime);
            if(actualTime<=3){
                $scope.actualClass = "iconWaiting"+actualTime+" fa-spinner fa-spin";
            }
            else{
                $scope.actualClass = "iconComplete"
            }
        
    });

    $scope.deleteCategory = function(pActualCategory){
        $scope.url = "http://www.videoextrem.com/api/categories.php?queryType=delete";
        $scope.languageData = {
            'idCategoria' : pActualCategory.idCategoria 
        }
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $http.post($scope.url, $scope.languageData).
        then(function(data, status) {
            alert("La categoria " + pActualCategory.categoria + " ha sido borrada");
            location.reload();
        })
    }

    $scope.addCategory = function(){
        var categoryNameInput = document.getElementById('CategorieName').value;
        $scope.url = "http://www.videoextrem.com/api/categories.php?queryType=add";
        $scope.languageData = {
            'categoria' : categoryNameInput 
        }
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $http.post($scope.url, $scope.languageData).
        then(function(data, status) {
            alert("La categoria " + categoryNameInput + " ha sido agregada");
            location.reload();
        })
    }

    $scope.setEditCategory = function (pActualCategory) {
        $scope.actualCategory = pActualCategory;
    }

    $scope.editCategory = function () {
        var categoryNameInput = document.getElementById('updateCategoryName').value;
        $scope.url = "http://www.videoextrem.com/api/categories.php?queryType=edit";
        $scope.languageData = {
            'idCategoria' : $scope.actualCategory.idCategoria,
            'categoria' : categoryNameInput 
        }
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $http.post($scope.url, $scope.languageData).
        then(function(data, status) {
            alert("La categoria " + $scope.actualCategory.categoria + " ha sido actualizada a " + categoryNameInput);
            location.reload();
        })
    }

    $scope.showCategory = function(pActualCategory){
        $scope.actualCategory = pActualCategory;
    }
}  

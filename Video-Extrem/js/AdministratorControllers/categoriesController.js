//     _____      _                        _           
    //    / ____|    | |                      (_)          
    //   | |     __ _| |_ ___  __ _  ___  _ __ _  ___  ___ 
    //   | |    / _` | __/ _ \/ _` |/ _ \| '__| |/ _ \/ __|
    //   | |___| (_| | ||  __/ (_| | (_) | |  | |  __/\__ \
    //    \_____\__,_|\__\___|\__, |\___/|_|  |_|\___||___/
    //                         __/ |                       
    //                        |___/                        
    app.controller("categoriesController", categoriesController);
    categoriesController.$inject = ["NgTableParams", "$resource", "$scope", "$http"];

    function categoriesController(NgTableParams, $resource, $scope, $http) {
        // tip: to debug, open chrome dev tools and uncomment the following line 
        //debugger;
        var self = this;
        self.tableParams = new NgTableParams({
            page: 1,
            count: 5
        },{
            count : [],
            getData:function($defer, params){
                return $http.get("http://www.videoextrem.com/api/categories.php?queryType=select").then(function(response) {
                    console.log(JSON.stringify(response));
                    console.log(response.data.length);

                    self.tableParams.total(response.data.length); // recal. page nav controls
                    self.tableParams.sorting();
                    return response.data.slice((self.tableParams.page() - 1) * self.tableParams.count(), self.tableParams.page() * self.tableParams.count());
                });
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

//     _____ _                 
//    / ____| |                
//   | (___ | |_ ___  _ __ ___ 
//    \___ \| __/ _ \| '__/ _ \
//    ____) | || (_) | | |  __/
//   |_____/ \__\___/|_|  \___|
//                             
//                             
                          

app.controller("storeController", storeController);
storeController.$inject =['$scope', "$http","dataManager","messageService"];

function storeController($scope, $http,dataManager,messageService) {
    $scope.storeDataSet = dataManager.divData.stores;
    $scope.storesCollection  = {data : []};
    $scope.itemsByPage=5;
    $scope.actualStore = {};
    $scope.ubications = [];
    
    $scope.init = function(){
        $scope.populateLocations();
    }
    
    $scope.$watch('storeDataSet.time', function() {
            var actualTime = $scope.storeDataSet.time;
            console.log("Actual Div stores "+actualTime);
            if(actualTime<=3){
                $scope.actualClass = "iconWaiting"+actualTime+" fa-spinner fa-spin";
            }
            else{
                $scope.actualClass = "iconComplete";
            }
    });

    $scope.populateLocations = function(){
        $scope.ubications = [];
        $http.get("http://www.videoextrem.com/api/stores.php?queryType=select")
            .then(function(response) {
            for(actualStore=0; actualStore<response.data.length; actualStore++){
                $scope.ubications.push(response.data[actualStore]);
            }
        });
    }
    
    $scope.selectUbication = function(pStore){
        $scope.actualUbication = pStore; 
    }
    
    $scope.deleteStore = function(pActualStore){
        var url = "http://www.videoextrem.com/api/stores.php?queryType=delete";
        var storeData = {
            'idStore' : pActualStore.idLocal 
        }
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $http.post(url, storeData).
        then(function(data, status) {
            messageService.setMessage("El local " + pActualStore.local + " se ha eliminado correctamente.");
            setTimeout(function() { window.location.reload(true); }, 2000);
        })
    }
    
     $scope.validateEmail = function(sEmail) {
         var reEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

           if(!sEmail.match(reEmail)) {
               alert("Direccion de correo inválida");
                 return false;
           }
         return true;
     }
     
     $scope.isEmptyInput = function(pValue){
         if (pValue === ""){
             return true;
         }
         else{
             return false;
         }
     }

    $scope.addStore = function(){
        var storeNameInput = document.getElementById('createStoreLocal').value;
        var locationInput = document.getElementById('createStoreLocation').value;
        var linkInput = document.getElementById('createStoreLink').value;
        var phoneInput = document.getElementById('createStorePhone').value;
        var emailInput = document.getElementById('createStoreEmail').value;
        var url = "http://www.videoextrem.com/api/stores.php?queryType=add";
        
        if(!$scope.isEmptyInput(storeNameInput)){
            if(!$scope.isEmptyInput(locationInput)){
                if(!$scope.isEmptyInput(linkInput)){
                    if(!$scope.isEmptyInput(phoneInput)){
                        if(!$scope.isEmptyInput(emailInput)){
                            var storeData = {
                                'storeName' : storeNameInput,
                                'location' : locationInput,
                                'link' : linkInput,
                                'phone' : phoneInput,
                                'email' : emailInput
                            };
                            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
                            $http.post(url,storeData).
                            then(function(data, status) {
                                messageService.setMessage("El local " + storeNameInput + " se ha agregado correctamente.");
                                setTimeout(function() { window.location.reload(true); }, 2000);
                            })
                        }
                    }
                }
            }
        }
        
        var storeData = {
            'actor' : actorNameInput 
        }
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $http.post($scope.url, $scope.actorData).
        then(function(data, status) {
            messageService.setMessage("El actor " + actorNameInput + " se ha agregado correctamente.");
            setTimeout(function() { window.location.reload(true); }, 2000);
        })
    }

    $scope.setEditStore = function(pActualStore){
        $scope.actualStore = pActualStore;
    }
    
    $scope.validateInput = function(pActualStore, pInputValue, pDBvalue){
        if(pInputValue !== ""){
            if(pInputValue !== pDBvalue){
                return pInputValue;
            }
            else{
                return pDBvalue;
            }
        }
        else{
            return pDBvalue;
        }
    }
    
    
    $scope.editStore = function (pActualStore) {
        var storeInput = document.getElementById("editStoreLocal").value;
        var locationInput = document.getElementById("editStoreLocation").value;
        var phoneInput = document.getElementById("editStorePhone").value;
        var emailInput = document.getElementById("editStoreEmail").value;
        var linkInput = document.getElementById("editStoreStoreLink").value;
        var url = "http://www.videoextrem.com/api/stores.php?queryType=edit";
        
        var newStoreName = $scope.validateInput(pActualStore, storeInput, pActualStore.local);
        var newLocationName = $scope.validateInput(pActualStore, locationInput, pActualStore.ubicacion);
        var newPhone = $scope.validateInput(pActualStore, phoneInput, pActualStore.telefono);
        var newEmail = $scope.validateInput(pActualStore, emailInput, pActualStore.correo);
        var newLink = $scope.validateInput(pActualStore, linkInput, pActualStore.link);
        
        var storeData = {
            'idStore' : pActualStore.idLocal,
            'storeName' : newStoreName,
            'location' : newLocationName,
            'link' : newLink,
            'phone' : newPhone,
            'email' : newEmail
        };
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $http.post(url,storeData).
        then(function(data, status) {
            messageService.setMessage("El local " + pActualStore.local + " ha sido actualizado correctamente.");
            setTimeout(function() { window.location.reload(true); }, 2000);
        })
    }

    $scope.showStore = function(pActualStore){
        $scope.actualStore = pActualStore;
    }

}
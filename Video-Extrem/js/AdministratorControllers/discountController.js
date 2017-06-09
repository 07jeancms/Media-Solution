//    _____ _____  _____  _____ ____  _    _ _   _ _______ 
//   |  __ \_   _|/ ____|/ ____/ __ \| |  | | \ | |__   __|
//   | |  | || | | (___ | |   | |  | | |  | |  \| |  | |   
//   | |  | || |  \___ \| |   | |  | | |  | | . ` |  | |   
//   | |__| || |_ ____) | |___| |__| | |__| | |\  |  | |   
//   |_____/_____|_____/ \_____\____/ \____/|_| \_|  |_|   
//                                                          
app.controller("discountController", discountController);
discountController.$inject =['$scope', "$http","dataManager","messageService"];

function discountController($scope, $http, dataManager, messageService) {
    $scope.discountDataSet = dataManager.divData.discounts;
    $scope.discountsCollection  = {data : []};
    $scope.itemsByPage=5;
    $scope.actualDiscounts = {};

    $scope.$watch('discountDataSet.time', function() {
            var actualTime = $scope.discountDataSet.time;
            console.log("Actual Div discounts "+actualTime);
            if(actualTime<=3){
                $scope.actualClass = "iconWaiting"+actualTime+" fa-spinner fa-spin";
            }
            else{
                $scope.actualClass = "iconComplete";
            }
    });    

    $scope.deleteActor = function(pActualActor){
        $scope.url = "http://www.videoextrem.com/api/actors.php?queryType=delete";
        $scope.actorData = {
            'idActor' : pActualActor.idActor 
        }
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $http.post($scope.url, $scope.actorData).
        then(function(data, status) {
            messageService.setMessage("El Actor " + pActualActor.actor + " se ha borrado correctamente.");
            setTimeout(function() { window.location.reload(true); }, 2000); 
        })
    }

    $scope.addAddImage = function(){
        var actorNameInput = document.getElementById('actorName').value;
        $scope.url = "http://www.videoextrem.com/api/actors.php?queryType=add";
        $scope.actorData = {
            'actor' : actorNameInput 
        }
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $http.post($scope.url, $scope.actorData).
        then(function(data, status) {
            messageService.setMessage("El actor " + actorNameInput + " se ha agregado correctamente.");
            setTimeout(function() { window.location.reload(true); }, 2000); 
        })
    }

    $scope.showDiscount = function(pActualDiscount){
        $scope.actualDiscount = pActualDiscount;
    }
    
    $scope.createRadioButton = function(name, value, text, pClassName, pIsChecked){
        var label = document.createElement("label");
        var radio = document.createElement("input");
        radio.id = pClassName+value;
        radio.className = pClassName;
        radio.type = "checkbox";
        radio.name = text;
        radio.checked = pIsChecked;
        var reply_click = function(){
            $scope.globalRadioId = this.id;
            $scope.changeRadioValue();
        };
        radio.value = value;
        label.appendChild(radio);
        label.appendChild(document.createTextNode(text));
        return label;
    }
    
    $scope.populateRadioCarouselNames = function(){
        var radio_carousels = document.getElementById("radio_carousels");
        
        radio_carousels.innerHTML = '';
        $http.get("http://www.videoextrem.com/api/discounts.php?queryType=carouselNames")
            .then(function(response) {
            for(actualCarousel=0; actualCarousel< response.data.length; actualCarousel++){
                var radioElement = response.data[actualCarousel].nombre;
                var new_button = $scope.createRadioButton(radioElement, radioElement, radioElement, "carouselCreate", false);
                var br = document.createElement("br");
                radio_carousels.appendChild(new_button);
                radio_carousels.appendChild(br);
            }
        });
    }
    
    $scope.readRadioButtons = function(pClassName){
        var radios = document.getElementsByTagName('input');
        var value;

        var arrayCarousels = [];

        for (var i = 0; i < radios.length; i++) {
            if (radios[i].type === 'checkbox' && radios[i].checked && radios[i].className == pClassName) {
                value = radios[i].value;
                if(pClassName === "carouselCreate"){
                    arrayCarousels.push(value);
                }
            }
        }
        return arrayCarousels;
    }
    
    $scope.initAddDiscount = function(){
        var url_input = document.getElementById("inputCreateLink").value;
        var status_dropdown = document.getElementById("selectCreateStatus").value;
        var radioArray = $scope.readRadioButtons("carouselCreate");
        
        var url = "http://www.videoextrem.com/api/discounts.php?queryType=add";
        var discountData = {
            'url' : url_input,
            'status' : status_dropdown,
            'carouselTypes' : radioArray
        };
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $http.post(url, discountData)
            .then(function(data, status) {
                messageService.setMessage("La imagen: " + url_input + " se ha agregado correctamente.");
                setTimeout(function() { window.location.reload(true); }, 2000); 
        })
    }
    
    $scope.deleteDiscount = function(pActualDiscount){
        var url = "http://www.videoextrem.com/api/discounts.php?queryType=delete";
        var discountData = {
            'idDiscount' : pActualDiscount.idPromocion,
            'carouselName' : pActualDiscount.nombre
        };
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $http.post(url,discountData).
        then(function(data, status) {
            messageService.setMessage("La imagen: " + pActualDiscount.link + " se ha eliminado correctamente.");
            setTimeout(function() { window.location.reload(true); }, 2000); 
        })
    }
    
    $scope.setEditDiscount = function(pActualDiscount){
        $scope.actualDiscount = pActualDiscount;
        var dropdownStatus = document.getElementById("selectEditStatus");
        if(pActualDiscount.estado === "activado"){
            dropdownStatus.value = 1;
        }
        if(pActualDiscount.estado === "desactivado"){
            dropdownStatus.value = 0;
        }
    }
    
    $scope.editDiscount = function(pActualDiscount){
        var url = "http://www.videoextrem.com/api/discounts.php?queryType=edit";
        var linkInput = document.getElementById('inputEditLink').value;
        var dropdownStatus = document.getElementById("selectEditStatus").value;
        var discountData = {
            'idDiscount' : pActualDiscount.idPromocion,
            'link' : linkInput,
            'status' : dropdownStatus
        };
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $http.post(url,discountData).
        then(function(data, status) {
            messageService.setMessage("La imagen: " + pActualDiscount.link + " se ha editado correctamente.");
            setTimeout(function() { window.location.reload(true); }, 2000); 
        })
    }
}
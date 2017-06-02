//    _    _                   
//   | |  | |                  
//   | |  | |___  ___ _ __ ___ 
//   | |  | / __|/ _ \ '__/ __|
//   | |__| \__ \  __/ |  \__ \
//    \____/|___/\___|_|  |___/
//                             
//     

app.controller("userAuthenticationController", userAuthenticationController);
userAuthenticationController.$inject = ['$scope', "$http","dataManager","messageService"];

function userAuthenticationController ( $scope, $http,dataManager,messageService) {

    $scope.userDataSet = dataManager.userData;
    $scope.usersCollection  = {users : []};
    $scope.itemsByPage=5;
    $scope.actualUser = {"username":"","password":""};
    $scope.roles = dataManager.roleData;


    $scope.gobalCreateArrayRoles = [];
    $scope.globalRolesArray = [];
    $scope.globalRolesArrayAdd = [];
    $scope.globalRolesArrayRemove = [];




    $scope.readRadioButtonValues = function(pClassName, pEventType){
        $scope.gobalCreateArrayRoles = [];
        $scope.globalRolesArrayRemove = [];
        $scope.globalRolesArrayAdd = [];

        var radios = document.getElementsByTagName('input');
        var value;

        for (var i = 0; i < radios.length; i++) {
            if (radios[i].type === 'checkbox' && radios[i].checked && radios[i].className == pClassName) {
                value = radios[i].value;
                if(pClassName === "rol"){
                    $scope.gobalCreateArrayRoles.push(value);
                }
            }
        }

        if(pEventType === "edit"){
            //viejo = $scope.globalRolesArray
            //nuevo = $scope.gobalCreateArrayRoles
            for(oldRole=0; oldRole<$scope.globalRolesArray.length; oldRole++){
                var oldElement = $scope.globalRolesArray[oldRole];
                if($scope.gobalCreateArrayRoles.includes(oldElement)){
                }
                else{
                    $scope.globalRolesArrayRemove.push(oldElement);
                }
            }
            for(newRole=0; newRole<$scope.gobalCreateArrayRoles.length; newRole++){
                var newElement = $scope.gobalCreateArrayRoles[newRole];
                if($scope.globalRolesArray.includes(newElement)){
                }
                else{
                    $scope.globalRolesArrayAdd.push(newElement);
                }
            }
        }
    }

    $scope.changeRadioValue = function(){
        var actualRadioElement = document.getElementById($scope.globalRadioId);
        if(actualRadioElement.checked === true){
            actualRadioElement.checked = true;
        }
        else {
            actualRadioElement.checked = false;
        }
    }

    $scope.createRadioButton = function(name, value, text, pClassName, pIsChecked){
        var label = document.createElement("label");
        var radio = document.createElement("input");
        radio.id = pClassName;
        radio.className = pClassName;
        radio.type = "checkbox";
        radio.name = text;
        radio.checked = pIsChecked;
        var reply_click = function(){
            $scope.globalRadioId = this.id;
            $scope.changeRadioValue();
        };
        radio.onclick = reply_click;    
        radio.value = value;
        label.appendChild(radio);
        label.appendChild(document.createTextNode(text));
        return label;
    }

    $scope.addUser = function(pUserName, pEmail, pPhone, pPassword, pActualPosition, pArrayUsersLength){
        if(pActualPosition === pArrayUsersLength){
            $scope.readRadioButtonValues("rol", "create");
            $scope.url = "http://www.videoextrem.com/api/users.php?queryType=add";
            $scope.userData = {
                'token': "NO_TOKEN",
                'userName': pUserName,
                'email': pEmail,
                'phone': pPhone,
                'password': pPassword,
                'arrayRoles': $scope.gobalCreateArrayRoles
            };
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
            $http.post($scope.url, $scope.userData)
                .then(function(data, status) {
                alert("El usuario "  + pUserName + " ha sido agregado");
                location.reload();
            })
        }
    }

    $scope.isValidUser = function(){
        var userInput = document.getElementById("userNameInputCreate").value;
        var emailInput = document.getElementById("emailInputCreate").value;
        var passwordInput = document.getElementById("passwordInputCreate").value;
        var phoneInput = document.getElementById("phoneInputCreate").value;
        var actualUser=0;
        for(actualUser; actualUser<$scope.usersCollection.users.length; actualUser++){
            var userElement = $scope.usersCollection.users[actualUser];
            if(userElement.userName !== userInput){
                if(userElement.correo !== emailInput){
                    if(userInput !== "" && emailInput !== "" && passwordInput !== "" && phoneInput !== ""){
                        if($scope.validateEmail(emailInput)){
                            if(phoneInput.length>=8){

                            }
                            else{
                                alert("Ingrese un numero telefonico valido");
                                break;
                            }
                        }
                        else{
                            break;
                        }
                    }
                    else{
                        alert("Por favor completa los campos");
                        break;
                    }
                }
                else{
                    alert("Correo existente");
                    break;
                }
            }
            else{
                alert("Usuario existente");
                break;
            }
        }
        $scope.addUser(userInput, emailInput, phoneInput, passwordInput, actualUser, $scope.usersCollection.users.length);
    }

    $scope.validateEmail = function(sEmail) {
        var reEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(!sEmail.match(reEmail)) {
            alert("Direccion de correo inválida");
            return false;
        }
        return true;
    }


    $scope.populateDropDownRoles = function(){
        var selectDropdown = document.getElementById("selectRolesShow");
        selectDropdown.innerHTML = '';
        $scope.url = "http://www.videoextrem.com/api/rolesByUser.php?queryType=select";
        $scope.userData = {
            'userId' : $scope.actualUser.idUsuario
        }
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $http.post($scope.url, $scope.userData)
            .then(function(data, status) {
            var tempRolesArray = [];
            for(actualRole = 0; actualRole < data.data.length; actualRole++){
                tempRolesArray.push(data.data[actualRole].rol);
                $scope.globalRolesArray.push(data.data[actualRole].rol);
                var roleElement = data.data[actualRole].rol;
                var newOption = document.createElement("option");
                newOption.text = roleElement;
                newOption.value = 'rol'+actualRole;
                selectDropdown.appendChild(newOption);
            }
        })     
    }

    $scope.showUser = function(pActualUser){
        $scope.actualUser = pActualUser;
        $scope.populateDropDownRoles();
    }

    $scope.setAddUser = function(){
        $scope.populateFields();
    }

    $scope.populateFields = function(){
        var radio_roles = document.getElementById("radio_roles_create");
        radio_roles.innerHTML = '';
        $http.get("http://www.videoextrem.com/api/roles.php?queryType=select")
            .then(function(response) {
            for(actualRole=0; actualRole< response.data.length; actualRole++){
                var roleElement = response.data[actualRole].rol;
                var new_button = $scope.createRadioButton(roleElement, roleElement, roleElement, "rol", false);
                var br = document.createElement("br");
                radio_roles.appendChild(new_button);
                radio_roles.appendChild(br);
            }
        });
    }

    $scope.populateRemainingRoles = function(){
        var radio_roles = document.getElementById("radio_roles");
        radio_roles.innerHTML = '';
        $scope.url = "http://www.videoextrem.com/api/rolesByUser.php?queryType=roles";
        $scope.userData = {
            'userId' : $scope.actualUser.idUsuario
        }
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $http.post($scope.url, $scope.userData)
            .then(function(data, status) {
            var arrayRoles = data.data;
            for(actualRole=0 ;actualRole<arrayRoles.length; actualRole++){
                var roleElement = arrayRoles[actualRole].rol;
                var new_button = $scope.createRadioButton(roleElement, roleElement, roleElement, "rol", false);
                var br = document.createElement("br");
                radio_roles.appendChild(new_button);
                radio_roles.appendChild(br);
            }
        })
    }

    $scope.populateSelectedRoles = function(){
        $scope.globalRolesArray = [];
        var radio_roles = document.getElementById("radio_roles");
        radio_roles.innerHTML = '';
        $scope.url = "http://www.videoextrem.com/api/rolesByUser.php?queryType=select";
        $scope.userData = {
            'userId' : $scope.actualUser.idUsuario
        }
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $http.post($scope.url, $scope.userData)
            .then(function(data, status) {
            var arrayRoles = data.data;
            for(actualRole=0 ;actualRole<arrayRoles.length; actualRole++){
                var roleElement = arrayRoles[actualRole].rol;
                $scope.globalRolesArray.push(roleElement);
                var new_button = $scope.createRadioButton(roleElement, roleElement, roleElement, "rol", true);
                var br = document.createElement("br");
                radio_roles.appendChild(new_button);
                radio_roles.appendChild(br);
            }
        })
    }

    $scope.authenticateUser = function(pUserName, pPassword){

        $scope.url = "http://www.videoextrem.com/api/authentication.php?queryType=tokenAuthentication";
        $scope.userData = {
            'userName': pUserName,
            'userPassword': pPassword
        };
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $http.post($scope.url, $scope.userData)
            .then(function(data, status) {
            alert(JSON.stringify(data.data[0].result));
            if(data.data[0].result == 1){
                alert("Autenticacion","El usuario "  + pUserName + " ha sido autenticado");
                var userName = pUserName;
                sessionStorage["currentUser"]=userName;
                var encrypted = CryptoJS.AES.encrypt("true", userName);
                sessionStorage["userToken"]=encrypted;
                alert("Las credenciales coinciden. El usuario se ha conectado. ");

            }
            else{
                alert("El usuario "  + pUserName + " no se ha podido autenticar");
                $scope.logout();
            }


        })


    }

    $scope.logout= function(){
        sessionStorage.removeItem("currentUser");
        sessionStorage.removeItem("userToken");
        alert("El usuario ha sido desconectado. ");
    }






}
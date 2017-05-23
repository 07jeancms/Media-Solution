var app = angular.module("crudApp", ["ngTable", "ngResource",'dndLists','smart-table']);

(function() {
    //Press enter on modal 
    app.directive('pressEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if(event.which === 13) {
                    scope.$apply(function (){
                        scope.$eval(attrs.pressEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    });

    //    _____        _          __  __                                   
    //   |  __ \      | |        |  \/  |                                  
    //   | |  | | __ _| |_ __ _  | \  / | __ _ _ __   __ _  __ _  ___ _ __ 
    //   | |  | |/ _` | __/ _` | | |\/| |/ _` | '_ \ / _` |/ _` |/ _ \ '__|
    //   | |__| | (_| | || (_| | | |  | | (_| | | | | (_| | (_| |  __/ |   
    //   |_____/ \__,_|\__\__,_| |_|  |_|\__,_|_| |_|\__,_|\__, |\___|_|   
    //                                                      __/ |          
    //                                                     |___/           

    app.factory("dataManager" ,[ "$http", function ($http) {
        var divs={}
        var waitTime = 1000;
        //Data
        var roleData = {roles : []};
        var movieData = {movies : []};
        var languageData = {languages : []};
        var actorData = {actors : []};
        var subtitleData = {subtitles : []};
        var genreData = {genres : []};
        var categoryData = {categories : []};
        var suggestionData = {suggestions : []};
        var userData = {users : []};
        //Esta función determina si se debe de cargar los datos.
        function canBeLoaded(divKey){
            if (divs[divKey] != null){
                return !divs[divKey].loaded;
            }
            return false;

        }
        /*Esta funcion se encarga de por cada div de la pagina de administrador crear un objeto en el hash div
       con los atributos:
       -id
       -outerHeigth
       -loaded (Que sirve como bandera para saber si ya se cargo los datos de dicha tabla)

       Esto es para que mediante el evento  $(window).scroll se pueda ir cargando la pagina poco a poco.

       */

        function getData() {
            var adminDiv = document.getElementsByClassName("adminDiv");
            var adminDivIndex;
            for (adminDivIndex = 0; adminDivIndex < adminDiv.length; adminDivIndex++) {
                var id = adminDiv[adminDivIndex].id;
                var outerHeigth = $('#' + id).outerHeight(true);
                var offSetTop = $('#' + id).offset().top;
                offSetTop = Math.floor(offSetTop / 100) * 100;
                properties = {
                    "id": id,
                    "outerHeigth": outerHeigth,
                    "loaded": false
                }

                divs[offSetTop] = properties;
                console.log(JSON.stringify(divs));
            }
        }
        //el evento $(window).scroll detecta el div en el cual estamos ubicados.
        $(window).scroll(function() {
            var actualWindowScreen = $(this).scrollTop();
            actualWindowScreen = Math.floor(actualWindowScreen / 100) * 100;
            console.log(actualWindowScreen);
            if (canBeLoaded(actualWindowScreen)) {
                console.log(divs[actualWindowScreen].id);
                manageData(divs[actualWindowScreen],  actualWindowScreen);
            }

        })
        /*Esta funcion se llama una vez que el evento $(window).scroll detecte que estamos en el div indicado.
        Esta funcion espera una cantidad definida para saber si el usuario si esta esperando datos en donde esta ubicado, o solo esta de paso por el scroll.
        */
        function manageData(actualTable, actualWindowScreen){
            var actualTableId = actualTable.id;
            var pageSizePorcentage = $('#' + actualTableId).outerHeight(true) * 0.2;
            alert(actualTableId);
            setTimeout(function() {
                var newActualWindowScreen = $(this).scrollTop();
                if (actualWindowScreen >= newActualWindowScreen - pageSizePorcentage && actualWindowScreen <= newActualWindowScreen + pageSizePorcentage) {
                    switch(actualTableId){
                        case "role":
                            getRolesData();
                            actualTable.loaded = true;
                            console.log("Role getted");
                            break;
                        case "movie":
                            getMovieData();
                            actualTable.loaded = true;
                            console.log("Movie getted");
                            break;
                        case "language":
                            getLanguageData();
                            actualTable.loaded = true;
                            console.log("language getted");
                            break;
                        case "actor":
                            getActorData();
                            actualTable.loaded = true;
                            console.log("Actor getted");
                            break;
                        case "subtitle":
                            getSubtitleData();
                            actualTable.loaded = true;
                            console.log("subtitle getted");
                            break;
                        case "genre":
                            getSubtitleData();
                            actualTable.loaded = true;
                            console.log("genre getted");
                            break;
                        case "category":
                            getCategoryData();
                            actualTable.loaded = true;
                            console.log("Category getted");
                            break;
                        case "suggestion":
                            getSuggestionData();
                            actualTable.loaded = true;
                            console.log("suggestion getted");
                            break;
                        case "user":
                            getUserData();
                            actualTable.loaded = true;
                            console.log("user getted");
                            break;
                        default:
                            break;
                    }
                }
            }, waitTime);

        }

        function getRolesData(){
            $http.get("http://www.videoextrem.com/api/roles.php?queryType=select")
                .then(function(response) {
                roleData.roles =response.data;
                console.log(roleData.roles);
            });

        }
        function getMovieData(){
            $http.get("http://www.videoextrem.com/api/movies.php?queryType=select")
                .then(function(response) {
                movieData.movies =response.data;
                console.log(movieData.movies);
            });

        }
        function getLanguageData(){
            $http.get("http://www.videoextrem.com/api/language.php?queryType=select")
                .then(function(response) {
                languageData.languages =response.data;
                console.log(roleData.roles);
            });

        }
        function getActorData(){
            $http.get("http://www.videoextrem.com/api/actors.php?queryType=select")
                .then(function(response) {
                actorData.actors =response.data;
                console.log(actorData.actors);
            });

        }
        function getSubtitleData(){
            $http.get("http://www.videoextrem.com/api/subtitles.php?queryType=select")
                .then(function(response) {
                subtitleData.subtitles =response.data;
                console.log(subtitleData.subtitles);
            });

        }
        function getGenreData(){
            $http.get("http://www.videoextrem.com/api/genres.php?queryType=select")
                .then(function(response) {
                genreData.genres =response.data;
                console.log(genreData.genres);
            });

        }
        function getCategoryData(){
            $http.get("http://www.videoextrem.com/api/categories.php?queryType=select")
                .then(function(response) {
                roleData.roles =response.data;
                console.log(roleData.roles);
            });

        }
        //Falta de implementar
        function getSuggestionData(){
            $http.get("http://www.videoextrem.com/api/roles.php?queryType=select")
                .then(function(response) {
                roleData.roles =response.data;
                console.log(roleData.roles);
            });

        }
        //falta de implementar
        function getUserData(){
            $http.get("http://www.videoextrem.com/api/roles.php?queryType=select")
                .then(function(response) {
                roleData.roles =response.data;
                console.log(roleData.roles);
            });

        }
        //Se ejectua el getData para cargar la informacion de los divs
        getData();
        return {
            roleData: roleData,
            movieData : movieData,
            languageData : languageData,
            actorData : actorData,
            subtitleData : subtitleData,
            genreData : genreData,
            categoryData : categoryData,
            suggestionData : suggestionData,
            userData : userData
        };


    }]);

    //    __  __                                   _____                 _          
    //   |  \/  |                                 / ____|               (_)         
    //   | \  / | ___  ___ ___  __ _  __ _  ___  | (___   ___ _ ____   ___  ___ ___ 
    //   | |\/| |/ _ \/ __/ __|/ _` |/ _` |/ _ \  \___ \ / _ \ '__\ \ / / |/ __/ _ \
    //   | |  | |  __/\__ \__ \ (_| | (_| |  __/  ____) |  __/ |   \ V /| | (_|  __/
    //   |_|  |_|\___||___/___/\__,_|\__, |\___| |_____/ \___|_|    \_/ |_|\___\___|
    //                                __/ |                                         
    //                               |___/                                          


    app.factory('messageService', function() {
        var message ={
            header :"Mensaje",
            body :"Cuerpo",

            setMessage : function(pHeader, pMessage ) {
                this.header = pHeader;
                this.body  = pMessage ;
            },

            getHeader : function(){

                return this.header;
            },
            getBody : function(){
                return this.body;
            }
        }   


        return message;

    });
    
    /***
         *      __  __            _                     _             
         *     |  \/  |          (_)          /\       | |            
         *     | \  / | _____   ___  ___     /  \   ___| |_ ___  _ __ 
         *     | |\/| |/ _ \ \ / / |/ _ \   / /\ \ / __| __/ _ \| '__|
         *     | |  | | (_) \ V /| |  __/  / ____ \ (__| || (_) | |   
         *     |_|  |_|\___/ \_/ |_|\___| /_/    \_\___|\__\___/|_|   
         *                                                            
         *                                                            
    */
    app.controller("SimpleDemoController", function($scope) {
        $scope.model = [generateList(1)];

        $scope.onDrop = function(srcList, srcIndex, targetList, targetIndex) {
            targetList.splice(targetIndex, 0, srcList[srcIndex]);
            if (srcList == targetList && targetIndex <= srcIndex) srcIndex++;
            srcList.splice(srcIndex, 1);
            return true;
        };

        function generateList(id) {
            return ['A', 'B', 'C'].map(function(letter) {
                // angular-drag-and-drop-lists usually serializes the objects to drag, thus we
                // can not transfer functions on the objects. However, as this fiddle uses dnd-callback
                // to move the objects directly without serialization, we can use a function reference
                // on the item here.
                return {
                    labelFunc: function(index) {
                        return "Item " + id + letter + " at index " + index;
                    }
                };
            });
        }
    });



<<<<<<< Updated upstream
   
=======
        this.tableParams = new NgTableParams({}, {
            getData:function(){
                $http.get("http://www.videoextrem.com/api/genres.php?queryType=select")
                    .then(function(response) {
                    $scope.arrayGeneros = response.data;
                });
            }

        });

        $scope.addGenre = function(){
            var genreNameInput = document.getElementById('GenreName').value;
            var genreDescriptionInput = document.getElementById('GenreDescription').value;
            $scope.url = "http://www.videoextrem.com/api/genres.php?queryType=add";
            $scope.genreData = {
                'genero' : genreNameInput,
                'descripcion' : genreDescriptionInput
            }
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
            $http.post($scope.url, $scope.genreData)
                .then(function(data, status) {
                alert("El genero " + genreNameInput + " ha sido agregado");
                location.reload();
            })
        };

        $scope.deleteGenre = function(pActualGenre){
            $scope.url = "http://www.videoextrem.com/api/genres.php?queryType=delete";
            $scope.genreData = {
                'idGenero' : pActualGenre.idGenero 
            }
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
            $http.post($scope.url, $scope.genreData).
            then(function(data, status) {
                alert("El genero " + pActualGenre.genero + " ha sido borrado");
                location.reload();
            })
        };

        $scope.setEditGenre = function (pActualGenre) {
            $scope.actualGenre = pActualGenre;
        };

        $scope.editGenre = function () {
            var genreNameInput = document.getElementById('genreNameInput').value;
            var genreDescriptionInput = document.getElementById('genreDescriptionInput').value;
            $scope.url = "http://www.videoextrem.com/api/genres.php?queryType=edit";
            $scope.genreData = {
                'idGenero' : $scope.actualGenre.idGenero,
                'genero' : genreNameInput,
                'descripcion' : genreDescriptionInput
            }
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
            $http.post($scope.url, $scope.genreData).
            then(function(data, status) {
                alert("Nombre anterior: " + $scope.actualGenre.genero + " ==> Nombre actual: " + genreNameInput + "\n"
                     + "Descripcion anterior: " + $scope.actualGenre.descripcion + " ==> Descripcion actual: " + genreDescriptionInput);
                location.reload();
            })
        };

        $scope.showGenre = function(pActualGenre){
            $scope.actualGenre = pActualGenre;
        }

    }
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


    //     _____                             _   _                 
    //    / ____|                           | | (_)                
    //   | (___  _   _  __ _  __ _  ___  ___| |_ _  ___  _ __  ___ 
    //    \___ \| | | |/ _` |/ _` |/ _ \/ __| __| |/ _ \| '_ \/ __|
    //    ____) | |_| | (_| | (_| |  __/\__ \ |_| | (_) | | | \__ \
    //   |_____/ \__,_|\__, |\__, |\___||___/\__|_|\___/|_| |_|___/
    //                  __/ | __/ |                                
    //                 |___/ |___/                                 

    app.controller("suggestionsController", suggestionsController);
    suggestionsController.$inject = ["NgTableParams", "$resource", "$scope", "$http"];

    function suggestionsController(NgTableParams, $resource, $scope, $http) {
        // tip: to debug, open chrome dev tools and uncomment the following line 
        //debugger;

        this.tableParams = new NgTableParams({}, {
            getData:function(){
                $http.get("http://www.videoextrem.com/api/suggestions.php?queryType=select")
                    .then(function(response) {
                    $scope.arraySuggestions = response.data;
                });
            }
        });
        
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
    }  
    //    _    _                   
    //   | |  | |                  
    //   | |  | |___  ___ _ __ ___ 
    //   | |  | / __|/ _ \ '__/ __|
    //   | |__| \__ \  __/ |  \__ \
    //    \____/|___/\___|_|  |___/
    //                             
    //     
    app.controller("userController", userController);
    userController.$inject = ["NgTableParams", "$resource", "$scope", "$http"];

    function userController(NgTableParams, $resource, $scope, $http) {
        // tip: to debug, open chrome dev tools and uncomment the following line 
        //debugger;
        
        $scope.userData = {};
        $scope.validUserBool = false;
        $scope.gobalCreateArrayRoles = [];
        $scope.globalRolesArray = [];
        $scope.globalRolesArrayAdd = [];
        $scope.globalRolesArrayRemove = [];
        
        this.tableParams = new NgTableParams({}, {
            getData:function(){
                $http.get("http://www.videoextrem.com/api/users.php?queryType=select")
                    .then(function(response) {
                    $scope.arrayUsers = response.data;
                });
            }

        });
        
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
            radio.id = pClassName+value;
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
                        alert("El usuario " + pUserName + " ha sido agregado");
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
            for(actualUser; actualUser<$scope.arrayUsers.length; actualUser++){
                var userElement = $scope.arrayUsers[actualUser];
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
            $scope.addUser(userInput, emailInput, phoneInput, passwordInput, actualUser, $scope.arrayUsers.length);
        }

        $scope.validateEmail = function(sEmail) {
            var reEmail = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;

              if(!sEmail.match(reEmail)) {
                  alert("Direccion de correo inválida");
                    return false;
              }
            return true;
        }

        $scope.deleteUser = function(pActualUser){
           $scope.url = "http://www.videoextrem.com/api/users.php?queryType=delete";
           $scope.userData = {
            'idUser' : pActualUser.idUsuario 
           }
           $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
           $http.post($scope.url, $scope.userData).
            then(function(data, status) {
               alert("El usuario " + pActualUser.userName + " ha sido borrado");
               location.reload();
            })
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
        
        $scope.editUser = function(){
            var userInput = document.getElementById("userNameEdit").value;
            var emailInput = document.getElementById("userEmailEdit").value;
            var phoneInput = document.getElementById("userPhoneEdit").value;
            var passwordInput = document.getElementById("userNewPassword").value;
            var confirmPasswordInput = document.getElementById("userNewPasswordConfirm").value;
            
            $scope.readRadioButtonValues("rol", "edit");
            $scope.url = "http://www.videoextrem.com/api/users.php?queryType=edit"
            
            if((passwordInput === confirmPasswordInput) && (passwordInput !== "") && (confirmPasswordInput !== "")){
                $scope.userData = {
                    'userId' : $scope.actualUser.idUsuario,
                    'userName' : userInput,
                    'email': emailInput,
                    'phone': phoneInput,
                    'password': passwordInput,
                    'arrayRolesAdd': $scope.globalRolesArrayAdd,
                    'arrayRolesRemove': $scope.globalRolesArrayRemove
                }
                $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
                $http.post($scope.url, $scope.userData).
                then(function(data, status) {
                    alert("El usuario " + $scope.actualUser.userName + " ha sido actualizado");
                    location.reload();
                })
            }
            else{
                alert("Contraseñas no coinciden o nulas");
            }
        }
        
        $scope.setEditUser = function(pActualUser){
            $scope.actualUser = pActualUser;
            var radio_roles = document.getElementById("radio_roles");
            radio_roles.innerHTML = '';
            $scope.populateSelectedRoles();
            $scope.populateRemainingRoles();
        }
    }
    //    _____       _           
    //   |  __ \     | |          
    //   | |__) |___ | | ___  ___ 
    //   |  _  // _ \| |/ _ \/ __|
    //   | | \ \ (_) | |  __/\__ \
    //   |_|  \_\___/|_|\___||___/
    //                            
    //         
    app.controller("roleController", roleController);
    roleController.$inject = ["NgTableParams", "$resource", "$scope", "$http"];

    function roleController(NgTableParams, $resource, $scope, $http) {
        // tip: to debug, open chrome dev tools and uncomment the following line 
        //debugger;

        this.tableParams = new NgTableParams({}, {
            getData:function(){
            $http.get("http://www.videoextrem.com/api/roles.php?queryType=select")
                .then(function(response) {
                    $scope.arrayRoles = response.data;
            });
            }

        });
        
        $scope.deleteRol = function(pActualRol){
           $scope.url = "http://www.videoextrem.com/api/roles.php?queryType=delete";
           $scope.rolData = {
            'idRol' : pActualRol.idRol 
           }
           $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
           $http.post($scope.url, $scope.rolData).
            then(function(data, status) {
               alert("El rol " + pActualRol.rol + " ha sido borrado");
               location.reload();
            })
        }
        
        $scope.addRol = function(){
            var rolNameInput = document.getElementById('RoleName').value;
            $scope.url = "http://www.videoextrem.com/api/roles.php?queryType=add";
            $scope.rolData = {
               'rol' : rolNameInput 
            }
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
            $http.post($scope.url, $scope.rolData).
                then(function(data, status) {
                    alert("El rol " + rolNameInput + " ha sido agregado");
                    location.reload();
            })
        }
        
        $scope.setEditRol = function (pActualRol) {
            $scope.actualRol = pActualRol;
        }
        
        $scope.editRol = function () {
            var rolNameInput = document.getElementById('updateRolName').value;
            console.log(rolNameInput);
            $scope.url = "http://www.videoextrem.com/api/roles.php?queryType=edit";
            $scope.rolData = {
                'idRol' : $scope.actualRol.idRol,
                'rol' : rolNameInput
            }
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
            $http.post($scope.url, $scope.rolData).
                then(function(data, status) {
                    alert("El rol " + $scope.actualRol.rol + " ha sido actualizado a " + rolNameInput);
                    location.reload();
            })
        }
        
        $scope.showRol = function(pActualRol){
            $scope.actualRol = pActualRol;
        }
>>>>>>> Stashed changes


})();
//Esta funcion es para que el marco del poster de la pelicula cambie cada vez que se da visualizar.


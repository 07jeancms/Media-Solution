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
        var waitTime = 500;
        //Data
        var roleData = {roles : []};
        var movieData = {movies : []};
        var languageData = {languages : []};
        var actorData = {actors : []};
        var subtitleData = {subtitles : []};
        var  genreData = {genres : []};
        var categoryData = {categories : []};
        var suggestionData = {suggestions : []};
        var userData = {users : []};
        var bookingMasterData = {booking : []};
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
            }
        }

        function isInDiv(){
            var actualWindowScreen = $(this).scrollTop();
            actualWindowScreen = Math.floor(actualWindowScreen / 100) * 100;
            if (canBeLoaded(actualWindowScreen)) {
                console.log(divs[actualWindowScreen].id);
                manageData(divs[actualWindowScreen],  actualWindowScreen);
            }
        }
        //el evento $(window).scroll detecta el div en el cual estamos ubicados.
        $(window).scroll(function() {

            isInDiv();
        })

        /*Esta funcion se llama una vez que el evento $(window).scroll detecte que estamos en el div indicado.
        Esta funcion espera una cantidad definida para saber si el usuario si esta esperando datos en donde esta ubicado, o solo esta de paso por el scroll.
        */
        function manageData(actualTable, actualWindowScreen){
            var actualTableId = actualTable.id;
            var pageSizePorcentage = $('#' + actualTableId).outerHeight(true) * 0.2;
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
                            getGenreData();
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
                        case "discounts":
                            showTestMessage("discounts");
                            break;
                        case "suggestionIndex":
                            showTestMessage("suggestionIndex");
                            break;
                        case "booking":
                            getBookingMasterData();
                            actualTable.loaded = true;
                            console.log("bookingMaster getted");
                            break;
                        default:
                            break;
                    }
                }
            }, waitTime);

        }
        
        function showTestMessage(pMessage){
            console.log("NG-APP working on " + pMessage);
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
                categoryData.categories =response.data;
                console.log(roleData.roles);
            });

        }
        //Falta de implementar
        function getSuggestionData(){
            $http.get("http://www.videoextrem.com/api/suggestions.php?queryType=select")
                .then(function(response) {
                suggestionData.suggestions =response.data;
                console.log(suggestionData.suggestions);
            });

        }
        //falta de implementar
        function getUserData(){
            $http.get("http://www.videoextrem.com/api/users.php?queryType=select")
                .then(function(response) {
                userData.users =response.data;
                console.log(userData.users);
            });

        }

        function getBookingMasterData(){
            $http.get("http://www.videoextrem.com/api/bookingMovie.php?queryType=getBookingMaster")
                .then(function(response) {
                bookingMasterData.booking =response.data;
                console.log(bookingMasterData.booking);
            });

        }
        //Se ejectua el getData para cargar la informacion de los divs
        getData();
        //Y se ejecuta una vez el isInDiv() para que cargue los datos de la parte de la pagina de donde inicia
        isInDiv()
        return {
            roleData: roleData,
            movieData : movieData,
            genreData : genreData,
            languageData : languageData,
            actorData : actorData,
            subtitleData : subtitleData,
            categoryData : categoryData,
            suggestionData : suggestionData,
            userData : userData,
            bookingMasterData : bookingMasterData
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





})();
//Esta funcion es para que el marco del poster de la pelicula cambie cada vez que se da visualizar.


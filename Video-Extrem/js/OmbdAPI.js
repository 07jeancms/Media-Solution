var $Form = $('form'), $Container = $('#container');
$Container.hide();
$Form.on('submit', function (p_oEvent) {
    "use strict";
    var sUrl, sMovie, oData;
    p_oEvent.preventDefault();
    sMovie = $Form.find('input').val();
    sUrl = 'https://www.omdbapi.com/?t=' + sMovie + '&type=movie&tomatoes=true';
    $.ajax(sUrl, {
        complete: function (p_oXHR, p_sStatus) {
            oData = $.parseJSON(p_oXHR.responseText);
            $Container.find('.title').text(oData.Title);
            $Container.find('.plot').text(oData.Plot);
            document.getElementById('moviePoster').src = oData.Poster;
            $Container.find('.year').text(oData.Year);
            $Container.show();
        }
    });
});




var app = angular.module("crudApp", ["ngTable", "ngResource",'dndLists']);
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
    //    __  __            _      
    //   |  \/  |          (_)     
    //   | \  / | _____   ___  ___ 
    //   | |\/| |/ _ \ \ / / |/ _ \
    //   | |  | | (_) \ V /| |  __/
    //   |_|  |_|\___/ \_/ |_|\___|
    //                             
    //   
    app.controller("movieTableController", movieTableController);
    movieTableController.$inject = ["NgTableParams", "$resource","$scope", "$http"];

    function movieTableController(NgTableParams, $resource, $scope, $http) {
        // tip: to debug, open chrome dev tools and uncomment the following line 
        //debugger;
        $scope.actualMovie = {


        };
        $scope.actors = [];
        $scope.loading = false;
        $scope.globalGenresArray = [];
        $scope.globalLanguagesArray = [];
        $scope.globalActorsArray = [];
        $scope.globalRadioId = 0;
        $scope.movieGenres = [];
        $scope.movieLanguages = [];
        $scope.movieActors = [];
        
        $scope.genresArrayAdd = [];
        $scope.genresArrayRemove = [];

        $scope.languagesArrayRemove = [];
        $scope.languagesArrayAdd = [];
        
        $scope.actorsArrayRemove = [];
        $scope.actorsArrayAdd = [];
    
        this.tableParams = new NgTableParams({page: 1, // show first page
                                              count: 3, // count per page
                                              filter: {
                                                  name: '' // initial filter
                                              }
                                             }, {
            getData:function(){
                $http.get("http://www.videoextrem.com/api/movies.php?queryType=select")
                    .then(function(response) {
                    $scope.arrayPeliculas = response.data;
                    for(actualMovie = 0; actualMovie < response.data.length; actualMovie++){
                        var movieElement = response.data[actualMovie];
                        $scope.populateGeneresByMovie(movieElement);
                        $scope.populateLanguagesByMovie(movieElement);
                        $scope.populateActorsByMovie(movieElement);
                    }
                    //console.log("Hi JC");
                    //console.log($scope.globalGenresArray);
                    //console.log($scope.globalLanguagesArray);
                    //console.log($scope.globalActorsArray);
                   });
            }
        });
        //-----------------------------------------------------------------------------------------------------------------------------------//
        //-----------------------------------------------------------------------------------------------------------------------------------//
        $scope.setAddMovie = function(){
            $scope.populateGenresCreate();
            $scope.populateLanguagesCreate();
            $scope.populateActorsCreate();
        }
        //-----------------------------------------------------------------------------------------------------------------------------------//
        //-----------------------------------------------------------------------------------------------------------------------------------//
        $scope.addMovie_aux = function(pClassName){
            var radios = document.getElementsByTagName('input');
            var value;                   
        
            for (var actualInputElement = 0; actualInputElement < radios.length; actualInputElement++) {
                if (radios[actualInputElement].type === 'checkbox' && radios[actualInputElement].checked && radios[actualInputElement].className == pClassName) {
                    value = radios[actualInputElement].value;
                    if(pClassName === "generoCreate"){
                        $scope.movieGenres.push(value);
                    }
                    if(pClassName === "idiomaCreate"){
                        $scope.movieLanguages.push(value);
                    }
                    if(pClassName === "actorCreate"){
                        $scope.movieActors.push(value);
                    }
                }
            }
        }
        
        $scope.addMovie = function(){
            alert("addMovie");

            var movieNameCreateInput = document.getElementById("movieNameInputCreate").value;
            var yearCreateInput = document.getElementById("movieYearInputCreate").value;
            var descriptionCreateInput = document.getElementById("movieDescriptionInputCreate").value;
            var priceCreateInput = document.getElementById("moviePriceInputCreate").value;
            var linkImageCreateInput = document.getElementById("movieImageInputCreate").value;
            
            var actualArrayGenres = [];
            var actualArrayLanguages = [];
            var actualArrayActors = []; 
        
            $scope.addMovie_aux("generoCreate");
            $scope.addMovie_aux("idiomaCreate");
            $scope.addMovie_aux("actorCreate");
            
            $scope.url = "http://www.videoextrem.com/api/movies.php?queryType=add";
            
            $scope.movieData = {
                'pelicula' : movieNameCreateInput,
                'ano': yearCreateInput,
                'trama': descriptionCreateInput,
                'precio': priceCreateInput,
                'linkImagen': linkImageCreateInput,
                'genresArray': $scope.movieGenres,
                'languagesArray': $scope.movieLanguages,
                'actorsArray': $scope.movieActors
            }
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
            $http.post($scope.url, $scope.movieData).
            then(function(data, status) {
                alert("La pelicula " + movieNameCreateInput + " ha sido creada");
                location.reload();
            })
        }
        //-----------------------------------------------------------------------------------------------------------------------------------//
        //-----------------------------------------------------------------------------------------------------------------------------------//
        $scope.populateGenresCreate = function(){
            var radio_genres = document.getElementById("radio_genres_create");
            radio_genres.innerHTML = '';
            $http.get("http://www.videoextrem.com/api/genres.php?queryType=select")
                .then(function(response) {
                $scope.genresArrayToPopulate = response.data;
                for(actualGenre=0; actualGenre< $scope.genresArrayToPopulate.length; actualGenre++){
                    var genreElement = $scope.genresArrayToPopulate[actualGenre].genero;
                    var new_button = $scope.createRadioButton(genreElement, genreElement, genreElement, "generoCreate", false);
                    var br = document.createElement("br");
                    radio_genres.appendChild(new_button);
                    radio_genres.appendChild(br);
                }
            });
        }
        //-----------------------------------------------------------------------------------------------------------------------------------//
        //-----------------------------------------------------------------------------------------------------------------------------------//
        $scope.populateLanguagesCreate = function(){
            var radio_languages = document.getElementById("radio_languages_create");
            radio_languages.innerHTML = '';
            $http.get("http://www.videoextrem.com/api/language.php?queryType=select")
                .then(function(response) {
                $scope.languagesArrayToPopulate = response.data;
                for(actualLanguage=0; actualLanguage< $scope.languagesArrayToPopulate.length; actualLanguage++){
                    var languageElement = $scope.languagesArrayToPopulate[actualLanguage].idioma;
                    var new_button = $scope.createRadioButton(languageElement, languageElement, languageElement, "idiomaCreate", false);
                    var br = document.createElement("br");
                    radio_languages.appendChild(new_button);
                    radio_languages.appendChild(br);
                }
            });
        }
        //-----------------------------------------------------------------------------------------------------------------------------------//
        //-----------------------------------------------------------------------------------------------------------------------------------//
        $scope.populateActorsCreate = function(){
            var radio_actors = document.getElementById("actors_languages_create");
            radio_actors.innerHTML = '';
            $http.get("http://www.videoextrem.com/api/actors.php?queryType=select")
                .then(function(response) {
                $scope.actorsArrayToPopulate = response.data;
                for(actualActor=0; actualActor< $scope.actorsArrayToPopulate.length; actualActor++){
                    var actorElement = $scope.actorsArrayToPopulate[actualActor].actor;
                    var new_button = $scope.createRadioButton(actorElement, actorElement, actorElement, "actorCreate", false);
                    var br = document.createElement("br");
                    radio_actors.appendChild(new_button);
                    radio_actors.appendChild(br);
                }
            });
        }
        //-----------------------------------------------------------------------------------------------------------------------------------//
        //-----------------------------------------------------------------------------------------------------------------------------------//
        $scope.populateGeneresByMovie = function(pActualMovie){
            $scope.url = "http://www.videoextrem.com/api/genresByMovie.php?queryType=select";
            $scope.movieData = {
                'idPelicula' : pActualMovie.idPelicula
            }
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
            $http.post($scope.url, $scope.movieData)
                .then(function(data, status) {
                var tempGenresArray = [];
                for(actualGenre = 0; actualGenre < data.data.length; actualGenre++){
                    tempGenresArray.push(data.data[actualGenre].genero);
                }
                $scope.globalGenresArray.push({"idPelicula":pActualMovie.idPelicula, "generos":tempGenresArray});
            })
        }
        //-----------------------------------------------------------------------------------------------------------------------------------//
        //-----------------------------------------------------------------------------------------------------------------------------------//
        $scope.populateLanguagesByMovie = function(pActualMovie){
            $scope.url = "http://www.videoextrem.com/api/languagesByMovie.php?queryType=select";
            $scope.movieData = {
                'idPelicula' : pActualMovie.idPelicula
            }
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
            $http.post($scope.url, $scope.movieData)
                .then(function(data, status) {
                var tempLanguagesArray = [];
                for(actualLanguage = 0; actualLanguage < data.data.length; actualLanguage++){
                    tempLanguagesArray.push(data.data[actualLanguage].idioma);
                }
                $scope.globalLanguagesArray.push({"idPelicula":pActualMovie.idPelicula, "idiomas":tempLanguagesArray});
            })
        }        
        //-----------------------------------------------------------------------------------------------------------------------------------//
        //-----------------------------------------------------------------------------------------------------------------------------------//
        $scope.populateActorsByMovie = function(pActualMovie){
            $scope.url = "http://www.videoextrem.com/api/actorsByMovie.php?queryType=select";
            $scope.movieData = {
                'idPelicula' : pActualMovie.idPelicula
            }
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
            $http.post($scope.url, $scope.movieData)
                .then(function(data, status) {
                var tempActorsArray = [];
                for(actualActor = 0; actualActor < data.data.length; actualActor++){
                    tempActorsArray.push(data.data[actualActor].actor);
                }
                $scope.globalActorsArray.push({"idPelicula":pActualMovie.idPelicula, "actores":tempActorsArray});
            })
        }        
        //-----------------------------------------------------------------------------------------------------------------------------------//
        //-----------------------------------------------------------------------------------------------------------------------------------//    
        $scope.randomColor = function(){
            var colors = ['#D64900', '#008684', '#860002'];
            var random_color = colors[Math.floor(Math.random() * colors.length)];
            $('#sidebar').css('background-color', random_color);
        }
        //-----------------------------------------------------------------------------------------------------------------------------------//
        //-----------------------------------------------------------------------------------------------------------------------------------//
        $scope.cleanDropdown = function (comboBox) {
            while (comboBox.options.length > 0) {                
                comboBox.remove(0);
            }        
        }
        //-----------------------------------------------------------------------------------------------------------------------------------//
        //-----------------------------------------------------------------------------------------------------------------------------------//
        $scope.cleanRadioValues = function (pId) {
            var elements = document.getElementById(pId).getElementsByTagName('label');
            var size = elements.length;
            for(var i = 0; i < size; i++){
                elements[i].parentNode.removeChild(elements[i]);
                
            }
        }
        //-----------------------------------------------------------------------------------------------------------------------------------//
        //-----------------------------------------------------------------------------------------------------------------------------------//
        $scope.showMovie = function(selectedMovie){
            var selectDropdown = document.getElementById('selectGenresShow');
            var selectDropdownLanguages = document.getElementById('selectLanguagesShow');
            var selectDropdownActors = document.getElementById('selectActorsShow');
            $scope.cleanDropdown(selectDropdown);
            $scope.cleanDropdown(selectDropdownLanguages);
            $scope.randomColor();
            $scope.actualMovie = selectedMovie;
            var genres = [];
            var languages = [];
            var actors = [];
            for(actualGenre = 0; actualGenre < $scope.globalGenresArray.length; actualGenre++){
                if($scope.globalGenresArray[actualGenre].idPelicula == selectedMovie.idPelicula){
                    genres = $scope.globalGenresArray[actualGenre].generos;
                    break;
                }
            }
            for(actualGenre = 0; actualGenre < genres.length; actualGenre++){
                var genreElement = genres[actualGenre];
                var newOption = document.createElement("option");
                newOption.text = genreElement;
                newOption.value = 'genero'+actualGenre;
                selectDropdown.appendChild(newOption);
            }
            for(actualLanguage = 0; actualLanguage < $scope.globalLanguagesArray.length; actualLanguage++){
                if($scope.globalLanguagesArray[actualLanguage].idPelicula == selectedMovie.idPelicula){
                    languages = $scope.globalLanguagesArray[actualLanguage].idiomas;
                    break;
                }
            }
            for(actualLanguage = 0; actualLanguage < languages.length; actualLanguage++){
                var languageElement = languages[actualLanguage];
                var newOption = document.createElement("option");
                newOption.text = languageElement;
                newOption.value = 'idioma'+actualLanguage;
                selectDropdownLanguages.appendChild(newOption);
            }
            for(actualActor = 0; actualActor < $scope.globalActorsArray.length; actualActor++){
                if($scope.globalActorsArray[actualActor].idPelicula == selectedMovie.idPelicula){
                    actors = $scope.globalActorsArray[actualActor].actores;
                    break;
                }
            }
            for(actualActor = 0; actualActor < actors.length; actualActor++){
                var actorElement = actors[actualActor];
                var newOption = document.createElement("option");
                newOption.text = actorElement;
                newOption.value = 'actor'+actualActor;
                selectDropdownActors.appendChild(newOption);
            }
        }
        //-----------------------------------------------------------------------------------------------------------------------------------//
        //-----------------------------------------------------------------------------------------------------------------------------------//
        $scope.changeRadioValue = function(){
            var actualRadioElement = document.getElementById($scope.globalRadioId);
            if(actualRadioElement.checked === true){
                actualRadioElement.checked = true;
            }
            else {
                actualRadioElement.checked = false;
            }
        }
        //-----------------------------------------------------------------------------------------------------------------------------------//
        //-----------------------------------------------------------------------------------------------------------------------------------//
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
        //-----------------------------------------------------------------------------------------------------------------------------------//
        //-----------------------------------------------------------------------------------------------------------------------------------//
        $scope.setEditMovie = function(selectedMovie){
            $scope.actualMovie = selectedMovie;
            $scope.randomColor();
            
            var radio_langauges = document.getElementById("radio_languages");
            var radio_genres = document.getElementById("radio_genres");
            var radio_actors = document.getElementById("radio_actors");
            
            radio_langauges.innerHTML = '';
            radio_genres.innerHTML = '';
            radio_genres.innerHTML = '';
            radio_actors.innerHTML = '';
            
            var genres = [];
            var languages = [];
            var actors = [];
            
            for(actualGenre = 0; actualGenre < $scope.globalGenresArray.length; actualGenre++){
                if($scope.globalGenresArray[actualGenre].idPelicula == selectedMovie.idPelicula){
                    genres = $scope.globalGenresArray[actualGenre].generos;
                    $scope.movieGenres = $scope.globalGenresArray[actualGenre].generos;
                    break;
                }
            }
            for(actualGenre = 0; actualGenre < genres.length; actualGenre++){        
                var genreElement = genres[actualGenre];
                var new_button = $scope.createRadioButton(genreElement, genreElement, genreElement, "genero", true);
                var br = document.createElement("br");
                radio_genres.appendChild(new_button);
                radio_genres.appendChild(br);
            }
            for(actualLanguage = 0; actualLanguage < $scope.globalLanguagesArray.length; actualLanguage++){
                if($scope.globalLanguagesArray[actualLanguage].idPelicula == selectedMovie.idPelicula){
                    languages = $scope.globalLanguagesArray[actualLanguage].idiomas;
                    $scope.movieLanguages = $scope.globalLanguagesArray[actualLanguage].idiomas;
                    break;
                }
            }
            for(actualLanguage = 0; actualLanguage < languages.length; actualLanguage++){
                var languageElement = languages[actualLanguage];
                var new_button = $scope.createRadioButton(languageElement, languageElement, languageElement, "idioma", true);
                var br = document.createElement("br");
                radio_langauges.appendChild(new_button);
                radio_langauges.appendChild(br);
            }
            for(actualActor = 0; actualActor < $scope.globalActorsArray.length; actualActor++){
                if($scope.globalActorsArray[actualActor].idPelicula == selectedMovie.idPelicula){
                    actors = $scope.globalActorsArray[actualActor].actores;
                    $scope.movieActors = $scope.globalActorsArray[actualActor].actores;
                    break;
                }
            }
            for(actualActor = 0; actualActor < actors.length; actualActor++){
                var actorElement = actors[actualActor];
                var new_button = $scope.createRadioButton(actorElement, actorElement, actorElement, "actor", true);
                var br = document.createElement("br");
                radio_actors.appendChild(new_button);
                radio_actors.appendChild(br);
            }
            $scope.populateRemainingGenres($scope.actualMovie);
            $scope.populateRemainingLanguages($scope.actualMovie);
            $scope.populateRemainingActors($scope.actualMovie);
        }
        //-----------------------------------------------------------------------------------------------------------------------------------//
        //-----------------------------------------------------------------------------------------------------------------------------------//       
        $scope.editMovie = function(){
            var nameInput = document.getElementById("movieNameEdit").value;
            var yearInput = document.getElementById("movieYearEdit").value;
            var descriptionInput = document.getElementById("movieDescriptionEdit").value;
            var priceInput = document.getElementById("moviePriceEdit").value;
            var linkInput = document.getElementById("movieLinkInput").value;
            $scope.url = "http://www.videoextrem.com/api/movies.php?queryType=edit";
            
            $scope.updateRadioButtons('genero');
            $scope.updateRadioButtons('idioma');
            $scope.updateRadioButtons('actor');
            
            $scope.movieData = {
                'idPelicula' : $scope.actualMovie.idPelicula,
                'pelicula' : nameInput,
                'ano': yearInput,
                'trama': descriptionInput,
                'precio': priceInput,
                'linkImagen': linkInput,
                'arrayAdd': $scope.genresArrayAdd,
                'arrayRemove': $scope.genresArrayRemove,
                'arrayAddLanguages': $scope.languagesArrayAdd,
                'arrayRemoveLanguages': $scope.languagesArrayRemove,
                'arrayAddActors': $scope.actorsArrayAdd,
                'arrayRemoveActors': $scope.actorsArrayRemove
            }
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
            $http.post($scope.url, $scope.movieData).
            then(function(data, status) {
                alert("La pelicula " + $scope.actualMovie.pelicula + " ha sido actualizada");
                location.reload();
            })
        }
        //-----------------------------------------------------------------------------------------------------------------------------------//
        //-----------------------------------------------------------------------------------------------------------------------------------//
        $scope.updateRadioButtons = function(pClassName){
            var radios = document.getElementsByTagName('input');
            var value;
            
            var actualArrayGenres = [];
            var actualArrayLanguages = [];
            var actualArrayActors = [];
            
            for (var i = 0; i < radios.length; i++) {
                if (radios[i].type === 'checkbox' && radios[i].checked && radios[i].className == pClassName) {
                    value = radios[i].value;
                    if(pClassName === "genero"){
                        actualArrayGenres.push(value);
                    }
                    if(pClassName === "idioma"){
                        actualArrayLanguages.push(value);
                    }
                    if(pClassName === "actor"){
                        actualArrayActors.push(value);
                    }
                }
            }
            if(pClassName === "genero"){
                for(actualGenre=0; actualGenre<$scope.movieGenres.length; actualGenre++){
                    var oldElementGenre = $scope.movieGenres[actualGenre];
                    if(actualArrayGenres.includes(oldElementGenre)){    
                    }
                    else{
                        $scope.genresArrayRemove.push(oldElementGenre);
                    }
                }
                
                for(actualGenre=0; actualGenre<actualArrayGenres.length; actualGenre++){
                    var newElementGenre = actualArrayGenres[actualGenre];
                    if($scope.movieGenres.includes(newElementGenre)){
                    }
                    else{
                        $scope.genresArrayAdd.push(newElementGenre);
                    }
                }
            }
            if(pClassName === "idioma"){
                for(actualLanguage=0; actualLanguage<$scope.movieLanguages.length; actualLanguage++){
                    var oldElementLanguage = $scope.movieLanguages[actualLanguage];
                    if(actualArrayLanguages.includes(oldElementLanguage)){    
                    }
                    else{
                        $scope.languagesArrayRemove.push(oldElementLanguage);
                    }
                }
                
                for(actualLanguage=0; actualLanguage<actualArrayLanguages.length; actualLanguage++){
                    var newElementLanguage = actualArrayLanguages[actualLanguage];
                    if($scope.movieLanguages.includes(newElementLanguage)){
                    }
                    else{
                        $scope.languagesArrayAdd.push(newElementLanguage);
                    }
                }
            }
            if(pClassName === "actor"){
                for(actualActor=0; actualActor<$scope.movieActors.length; actualActor++){
                    var oldElementActor = $scope.movieActors[actualActor];
                    if(actualArrayActors.includes(oldElementActor)){    
                    }
                    else{
                        $scope.actorsArrayRemove.push(oldElementActor);
                    }
                }
                
                for(actualActor=0; actualActor<actualArrayActors.length; actualActor++){
                    var newElementActor = actualArrayActors[actualActor];
                    if($scope.movieActors.includes(newElementActor)){
                    }
                    else{
                        $scope.actorsArrayAdd.push(newElementActor);
                    }
                }
            }
            console.log("Update movie: " + $scope.actualMovie.pelicula);
        }
        //-----------------------------------------------------------------------------------------------------------------------------------//
        //-----------------------------------------------------------------------------------------------------------------------------------//
        $scope.populateRemainingGenres = function(pActualMovie){
            $scope.url = "http://www.videoextrem.com/api/genresByMovie.php?queryType=genres";
            $scope.movieData = {
                'idPelicula' : pActualMovie.idPelicula
            }
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
            $http.post($scope.url, $scope.movieData)
                .then(function(data, status) {
                for(actualGenre = 0; actualGenre < data.data.length; actualGenre++){
                    var genre = data.data[actualGenre].genero;
                    var new_button = $scope.createRadioButton(genre, genre, genre, "genero", false);
                    var br = document.createElement("br");
                    radio_genres.appendChild(new_button);
                    radio_genres.appendChild(br);
                }
            })
        }
        //-----------------------------------------------------------------------------------------------------------------------------------//
        //-----------------------------------------------------------------------------------------------------------------------------------//
        $scope.populateRemainingLanguages = function(pActualMovie){
            $scope.url = "http://www.videoextrem.com/api/languagesByMovie.php?queryType=languages";
            $scope.movieData = {
                'idPelicula' : pActualMovie.idPelicula
            }
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
            $http.post($scope.url, $scope.movieData)
                .then(function(data, status) {
                for(actualLanguage = 0; actualLanguage < data.data.length; actualLanguage++){
                    var language = data.data[actualLanguage].idioma;
                    var new_button = $scope.createRadioButton(language, language, language, "idioma", false);
                    var br = document.createElement("br");
                    radio_languages.appendChild(new_button);
                    radio_languages.appendChild(br);
                }
            })
        }
        //-----------------------------------------------------------------------------------------------------------------------------------//
        //-----------------------------------------------------------------------------------------------------------------------------------//
        $scope.populateRemainingActors = function(pActualMovie){
            $scope.url = "http://www.videoextrem.com/api/actorsByMovie.php?queryType=actors";
            $scope.movieData = {
                'idPelicula' : pActualMovie.idPelicula
            }
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
            $http.post($scope.url, $scope.movieData)
                .then(function(data, status) {
                for(actualActor = 0; actualActor < data.data.length; actualActor++){
                    var actor = data.data[actualActor].actor;
                    var new_button = $scope.createRadioButton(actor, actor, actor, "actor", false);
                    var br = document.createElement("br");
                    radio_actors.appendChild(new_button);
                    radio_actors.appendChild(br);
                }
            })
        }
        //-----------------------------------------------------------------------------------------------------------------------------------//
        //-----------------------------------------------------------------------------------------------------------------------------------//
        $scope.verifyRadioValues = function(){
            var radios = document.getElementsByTagName('input');
            var value;
            for (var i = 0; i < radios.length; i++) {
                if (radios[i].type === 'radio' && radios[i].checked && radios[i].className == 'idioma') {
                    value = radios[i].value;
                    alert(value);
                }
            }
        }
        //-----------------------------------------------------------------------------------------------------------------------------------//
        //-----------------------------------------------------------------------------------------------------------------------------------//
        $scope.deleteMovie = function(pActualMovie){
           $scope.url = "http://www.videoextrem.com/api/movies.php?queryType=delete";
           $scope.movieData = {
            'idPelicula' : pActualMovie.idPelicula
           }
           $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
           $http.post($scope.url, $scope.movieData).
            then(function(data, status) {
               alert("La pelicula " + pActualMovie.pelicula + " ha sido borrada");
               location.reload();
            })
        }
        $scope.reply_click = function(clicked_id){
            alert(clicked_id);
        }
        //-----------------------------------------------------------------------------------------------------------------------------------//
        //-----------------------------------------------------------------------------------------------------------------------------------//
        $scope.searchMovie = function(){
            /*
            "Title":"Lalaland","Year":"2014","Rated":"N/A","Released":"22 Sep 2014","Runtime":"N/A","Genre":"Comedy","Director":"N/A","Writer":"N/A","Actors":"Lauren Ashley Berry, Ritza Calixte, Julian Curi, Matthew Helfer","Plot":"N/A","Language":"English","Country":"USA","Awards":"N/A","Poster":"N/A","Metascore":"N/A","imdbRating":"N/A","imdbVotes":"N/A","imdbID":"tt4321350","Type":"series","totalSeasons":"N/A","Response":"True"}
            */
            $scope.loading = true;
            var sUrl = 'http://www.omdbapi.com/?t='+$scope.actualMovie.title+'&type=movie&tomatoes=true';
            return $.ajax(sUrl,{
                complete: function(p_oXHR, p_sStatus) {
                    var data =$.parseJSON(p_oXHR.responseText);
                    console.log(data);
                    $scope.actualMovie.title = data.Title;
                    var released = data.Released;
                    var year = released.substring(released.length-4, released.length);
                    console.log(year);
                    $scope.actualMovie.year = parseInt(year);
                    $scope.actualMovie.genre = data.Genre;
                    $scope.actualMovie.actors = data.Actors;
                    $scope.actualMovie.language = data.Language;
                    $scope.actualMovie.poster = data.Poster;
                    $scope.actualMovie.plot = data.Plot;
                    var actors = data.Actors.split(",");
                    console.log(actors);
                    for (actualActorIndex in actors){

                        console.log(actualActorIndex, actors[actualActorIndex]);
                        $scope.addActor(actors[actualActorIndex],actualActorIndex);
                    }
                    $scope.loading = false;
                    $scope.$apply();

                    return data
                }}).done(function(data) {


            });
        }
        //-----------------------------------------------------------------------------------------------------------------------------------//
        //-----------------------------------------------------------------------------------------------------------------------------------//
        $scope.addActor = function(actorName, id){
            //Aqui se deberia de agregar a la base de datos si no existe y por otro lado traerse los que si existen.
            var actualActor = {
                "Actor" : actorName,
                "id" : id
            }
            $scope.actors.push(actualActor);
        }    
    }
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

    //    _                                              
    //   | |                                             
    //   | |     __ _ _ __   __ _ _   _  __ _  __ _  ___ 
    //   | |    / _` | '_ \ / _` | | | |/ _` |/ _` |/ _ \
    //   | |___| (_| | | | | (_| | |_| | (_| | (_| |  __/
    //   |______\__,_|_| |_|\__, |\__,_|\__,_|\__, |\___|
    //                       __/ |             __/ |     
    //                      |___/             |___/      

    app.controller("languageController", languageController);
    languageController.$inject = ["NgTableParams", "$resource", "$scope", "$http"];

    function languageController(NgTableParams, $resource, $scope, $http) {
        // tip: to debug, open chrome dev tools and uncomment the following line 
        //debugger;

        this.tableParams = new NgTableParams({}, {
            getData:function(){
                $http.get("http://www.videoextrem.com/api/language.php?queryType=select")
                    .then(function(response) {
                    $scope.arrayLanguages = response.data;
                });
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

    //                 _             
    //       /\       | |            
    //      /  \   ___| |_ ___  _ __ 
    //     / /\ \ / __| __/ _ \| '__|
    //    / ____ \ (__| || (_) | |   
    //   /_/    \_\___|\__\___/|_|   
    //                               
    //   
    app.controller("actorController", actorController);
    actorController.$inject = ["NgTableParams", "$resource", "$scope", "$http"];

    function actorController(NgTableParams, $resource, $scope, $http) {
        // tip: to debug, open chrome dev tools and uncomment the following line 
        //debugger;

        this.tableParams = new NgTableParams({}, {
            getData:function(){
            $http.get("http://www.videoextrem.com/api/actors.php?queryType=select")
                .then(function(response) {
                    $scope.arrayActores = response.data;
            });
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
               alert("El Actor " + pActualActor.actor + " ha sido borrado");
               location.reload();
            })
        }
        
        $scope.addActor = function(){
            var actorNameInput = document.getElementById('actorName').value;
            $scope.url = "http://www.videoextrem.com/api/actors.php?queryType=add";
            $scope.actorData = {
               'actor' : actorNameInput 
            }
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
            $http.post($scope.url, $scope.actorData).
                then(function(data, status) {
                    alert("El actor " + actorNameInput + " ha sido agregado");
                    location.reload();
            })
        }
        
        $scope.setEditActor = function (pActualActor) {
            $scope.actualActor = pActualActor;
        }
        
        $scope.editActor = function () {
            var actorNameInput = document.getElementById('updateActorName').value;
            $scope.url = "http://www.videoextrem.com/api/actors.php?queryType=edit";
            $scope.actorData = {
                'idActor' : $scope.actualActor.idActor,
                'actor' : actorNameInput
            }
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
            $http.post($scope.url, $scope.actorData).
                then(function(data, status) {
                    alert("El actor " + $scope.actualActor.actor + " ha sido actualizado a " + actorNameInput);
                    location.reload();
            })
        }
        
        $scope.showActor = function(pActualActor){
            $scope.actualActor = pActualActor;
        }

    }
    //     _____       _     _   _ _   _           
    //    / ____|     | |   | | (_) | | |          
    //   | (___  _   _| |__ | |_ _| |_| | ___  ___ 
    //    \___ \| | | | '_ \| __| | __| |/ _ \/ __|
    //    ____) | |_| | |_) | |_| | |_| |  __/\__ \
    //   |_____/ \__,_|_.__/ \__|_|\__|_|\___||___/
    //                                             
    //           
    app.controller("subtitlesController", subtitlesController);
    subtitlesController.$inject = ["NgTableParams", "$resource", "$scope", "$http"];

    function subtitlesController(NgTableParams, $resource, $scope, $http) {
        // tip: to debug, open chrome dev tools and uncomment the following line 
        //debugger;

        this.tableParams = new NgTableParams({}, {
            getData:function(){
                $http.get("http://www.videoextrem.com/api/subtitles.php?queryType=select")
                    .then(function(response) {
                    $scope.arraySubtitulos = response.data;
                });
            }

        });

        $scope.deleteSubtitle = function(pActualSubtitle){
            $scope.url = "http://www.videoextrem.com/api/subtitles.php?queryType=delete";
            $scope.subtitleData = {
                'idSubtitulo' : pActualSubtitle.idSubtitulo 
            }
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
            $http.post($scope.url, $scope.subtitleData)
                .then(function(data, status) {
                alert("El subtitulo " + pActualSubtitle.subtitulo + " ha sido borrado");
                location.reload();
            })
        }

        $scope.addSubtitle = function(){
            var subtitleNameInput = document.getElementById('SubtitleName').value;
            $scope.url = "http://www.videoextrem.com/api/subtitles.php?queryType=add";
            $scope.subtitleData = {
                'subtitulo' : subtitleNameInput 
            }
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
            $http.post($scope.url, $scope.subtitleData).
            then(function(data, status) {
                alert("El subtitulo " + subtitleNameInput + " ha sido agregado");
                location.reload();
            })
        }

        $scope.setEditSubtitle = function (pActualSubtitle) {
            $scope.actualSubtitle = pActualSubtitle;
        }

        $scope.editSubtitle = function () {
            var subtitleNameInput = document.getElementById('editSubtitleName').value;
            $scope.url = "http://www.videoextrem.com/api/subtitles.php?queryType=edit";
            $scope.subtitleData = {
                'idSubtitulo' : $scope.actualSubtitle.idSubtitulo,
                'subtitulo' : subtitleNameInput 
            }
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
            $http.post($scope.url, $scope.subtitleData).
            then(function(data, status) {
                alert("El subtitulo " + $scope.actualSubtitle.subtitulo + " ha sido actualizado a " + subtitleNameInput);
                location.reload();
            })
        }

        $scope.showSubtitle = function(pActualSubtitle){
            $scope.actualSubtitle = pActualSubtitle;
        }

    }
    //     _____                          
    //    / ____|                         
    //   | |  __  ___ _ __  _ __ ___  ___ 
    //   | | |_ |/ _ \ '_ \| '__/ _ \/ __|
    //   | |__| |  __/ | | | | |  __/\__ \
    //    \_____|\___|_| |_|_|  \___||___/
    //                                    
    //  
    app.controller("genreController", genreController);
    genreController.$inject = ["NgTableParams", "$resource", "$scope", "$http"];

    function genreController(NgTableParams, $resource, $scope, $http) {
        // tip: to debug, open chrome dev tools and uncomment the following line 
        //debugger;

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
    suggestionsController.$inject = ["NgTableParams", "$resource"];

    function suggestionsController(NgTableParams, $resource) {
        // tip: to debug, open chrome dev tools and uncomment the following line 
        //debugger;

        this.tableParams = new NgTableParams({}, {
            getData:function(){
                return []
            }

        });

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
    userController.$inject = ["NgTableParams", "$resource"];

    function userController(NgTableParams, $resource) {
        // tip: to debug, open chrome dev tools and uncomment the following line 
        //debugger;

        this.tableParams = new NgTableParams({}, {
            getData:function(){
                return []
            }

        });

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


    }
})();
//Esta funcion es para que el marco del poster de la pelicula cambie cada vez que se da visualizar.


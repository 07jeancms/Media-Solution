//    __  __            _
//   |  \/  |          (_)
//   | \  / | _____   ___  ___
//   | |\/| |/ _ \ \ / / |/ _ \
//   | |  | | (_) \ V /| |  __/
//   |_|  |_|\___/ \_/ |_|\___|
//
//
app.controller("movieTableController", movieTableController);
movieTableController.$inject = ['$scope', "$http", "dataManager", "messageService"];

function movieTableController($scope, $http, dataManager, messageService) {
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

  $scope.movieData = dataManager.divData.movies;

  $scope.moviesCollection = {
    data: []
  };
  $scope.itemsByPage = 5;



  $scope.$watch('movieData.data', function() {
    if ($scope.movieData.data != undefined) {
      for (actualMovie = 0; actualMovie < $scope.movieData.data.length; actualMovie++) {
        var movieElement = $scope.movieData.movies[actualMovie];
        $scope.populateGeneresByMovie(movieElement);
        $scope.populateLanguagesByMovie(movieElement);
        $scope.populateActorsByMovie(movieElement);
      }
    }

  });

<<<<<<< Updated upstream
  $scope.actualDiv = dataManager.actualDiv;
  $scope.actualClass = "";

=======
    //-----------------------------------------------------------------------------------------------------------------------------------//
    //-----------------------------------------------------------------------------------------------------------------------------------//
    $scope.setAddMovie = function(){
        $scope.populateGenresCreate();
        $scope.populateLanguagesCreate();
        $scope.populateActorsCreate();
    }
    //-----------------------------------------------------------------------------------------------------------------------------------//
    //-----------------------------------------------------------------------------------------------------------------------------------//

    $scope.generateBackup = function(){
        var backupName = document.getElementById('backupName').value;
        var url = "http://www.videoextrem.com/api/generate_backup_movies_csv_file.php?queryType=getBackup";
        $scope.backupData = {
            'file' : backupName
        };

        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $http.post(url, $scope.backupData).
        then(function(data, status) {
            messageService.setMessage("El archivo " + backupName + " ha sido creado correctamente");
        })

    }

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
        var movieNameCreateInput = document.getElementById("movieNameInputCreate").value;
        var yearCreateInput = document.getElementById("movieYearInputCreate").value;
        var descriptionCreateInput = document.getElementById("movieDescriptionInputCreate").value;
        var priceCreateInput = document.getElementById("moviePriceInputCreate").value;
        var linkImageCreateInput = document.getElementById("movieImageInputCreate").value;

        var actualArrayGenres = [];
        var actualArrayLanguages = [];
        var actualArrayActors = []; 

        var e = document.getElementById("movieTypeHtml");
        var selected_type = e.options[e.selectedIndex].value;
        $scope.addMovie_aux("generoCreate");
        $scope.addMovie_aux("idiomaCreate");
        $scope.addMovie_aux("actorCreate");

        var url = "http://www.videoextrem.com/api/movies.php?queryType=add";

        var movieData = {
            'pelicula' : movieNameCreateInput,
            'ano': yearCreateInput,
            'trama': descriptionCreateInput,
            'precio': priceCreateInput,
            'linkImagen': linkImageCreateInput,
            'genresArray': $scope.movieGenres,
            'languagesArray': $scope.movieLanguages,
            'actorsArray': $scope.movieActors,
            'movieType' : selected_type
        };
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $http.post(url, movieData).
        then(function(data, status) {
            messageService.setMessage("La pelicula " + movieNameCreateInput + " se ha agregado correctamente.");
            setTimeout(function() { window.location.reload(true); }, 2000);
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
        var url = "http://www.videoextrem.com/api/genresByMovie.php?queryType=select";
        var movieData = {
            'idPelicula' : pActualMovie.idPelicula
        }
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $http.post(url, movieData)
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
        var url = "http://www.videoextrem.com/api/languagesByMovie.php?queryType=select";
        var movieData = {
            'idPelicula' : pActualMovie.idPelicula
        }
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $http.post(url,movieData)
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
        var url = "http://www.videoextrem.com/api/actorsByMovie.php?queryType=select";
        var movieData = {
            'idPelicula' : pActualMovie.idPelicula
        }
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $http.post(url,movieData)
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
>>>>>>> Stashed changes


  $scope.$watch('movieData.time', function() {
    var actualTime = $scope.movieData.time;
    console.log("Actual Div Movie " + actualTime);
    if (actualTime < 4) {
      $scope.actualClass = "iconWaiting" + actualTime % 3 + " fa-spinner fa-spin";
    } else {
      $scope.actualClass = "iconComplete"
    }

  });


  //-----------------------------------------------------------------------------------------------------------------------------------//
  //-----------------------------------------------------------------------------------------------------------------------------------//
  $scope.setAddMovie = function() {
    $scope.populateGenresCreate();
    $scope.populateLanguagesCreate();
    $scope.populateActorsCreate();
  }
  //-----------------------------------------------------------------------------------------------------------------------------------//
  //-----------------------------------------------------------------------------------------------------------------------------------//

  $scope.generateBackup = function() {
    var backupName = document.getElementById('backupName').value;
    var url = "http://www.videoextrem.com/api/generate_backup_movies_csv_file.php?queryType=getBackup";
    $scope.backupData = {
      'file': backupName
    };

    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    $http.post(url, $scope.backupData).
    then(function(data, status) {
      alert("El archivo " + backupName + " ha sido creado correctamente");
    })

  }

  $scope.addMovie_aux = function(pClassName) {
    var radios = document.getElementsByTagName('input');
    var value;

    for (var actualInputElement = 0; actualInputElement < radios.length; actualInputElement++) {
      if (radios[actualInputElement].type === 'checkbox' && radios[actualInputElement].checked && radios[actualInputElement].className == pClassName) {
        value = radios[actualInputElement].value;
        if (pClassName === "generoCreate") {
          $scope.movieGenres.push(value);
        }
        if (pClassName === "idiomaCreate") {
          $scope.movieLanguages.push(value);
        }
        if (pClassName === "actorCreate") {
          $scope.movieActors.push(value);
        }
      }
    }
  }

  $scope.addMovie = function() {
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

    var url = "http://www.videoextrem.com/api/movies.php?queryType=add";

    var movieData = {
      'pelicula': movieNameCreateInput,
      'ano': yearCreateInput,
      'trama': descriptionCreateInput,
      'precio': priceCreateInput,
      'linkImagen': linkImageCreateInput,
      'genresArray': $scope.movieGenres,
      'languagesArray': $scope.movieLanguages,
      'actorsArray': $scope.movieActors
    };
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    $http.post(url, movieData).
    then(function(data, status) {
      alert("La pelicula " + movieNameCreateInput + " ha sido creada");
      location.reload();
    })
  }
  //-----------------------------------------------------------------------------------------------------------------------------------//
  //-----------------------------------------------------------------------------------------------------------------------------------//
  $scope.populateGenresCreate = function() {
    var radio_genres = document.getElementById("radio_genres_create");
    radio_genres.innerHTML = '';
    $http.get("http://www.videoextrem.com/api/genres.php?queryType=select")
      .then(function(response) {
        $scope.genresArrayToPopulate = response.data;
        for (actualGenre = 0; actualGenre < $scope.genresArrayToPopulate.length; actualGenre++) {
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
  $scope.populateLanguagesCreate = function() {
    var radio_languages = document.getElementById("radio_languages_create");
    radio_languages.innerHTML = '';
    $http.get("http://www.videoextrem.com/api/language.php?queryType=select")
      .then(function(response) {
        $scope.languagesArrayToPopulate = response.data;
        for (actualLanguage = 0; actualLanguage < $scope.languagesArrayToPopulate.length; actualLanguage++) {
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
  $scope.populateActorsCreate = function() {
    var radio_actors = document.getElementById("actors_languages_create");
    radio_actors.innerHTML = '';
    $http.get("http://www.videoextrem.com/api/actors.php?queryType=select")
      .then(function(response) {
        $scope.actorsArrayToPopulate = response.data;
        for (actualActor = 0; actualActor < $scope.actorsArrayToPopulate.length; actualActor++) {
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
  $scope.populateGeneresByMovie = function(pActualMovie) {
    var url = "http://www.videoextrem.com/api/genresByMovie.php?queryType=select";
    var movieData = {
      'idPelicula': pActualMovie.idPelicula
    }
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    $http.post(url, movieData)
      .then(function(data, status) {
        var tempGenresArray = [];
        for (actualGenre = 0; actualGenre < data.data.length; actualGenre++) {
          tempGenresArray.push(data.data[actualGenre].genero);
        }
        $scope.globalGenresArray.push({
          "idPelicula": pActualMovie.idPelicula,
          "generos": tempGenresArray
        });
      })
  }
  //-----------------------------------------------------------------------------------------------------------------------------------//
  //-----------------------------------------------------------------------------------------------------------------------------------//
  $scope.populateLanguagesByMovie = function(pActualMovie) {
    var url = "http://www.videoextrem.com/api/languagesByMovie.php?queryType=select";
    var movieData = {
      'idPelicula': pActualMovie.idPelicula
    }
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    $http.post(url, movieData)
      .then(function(data, status) {
        var tempLanguagesArray = [];
        for (actualLanguage = 0; actualLanguage < data.data.length; actualLanguage++) {
          tempLanguagesArray.push(data.data[actualLanguage].idioma);
        }
        $scope.globalLanguagesArray.push({
          "idPelicula": pActualMovie.idPelicula,
          "idiomas": tempLanguagesArray
        });
      })
  }
  //-----------------------------------------------------------------------------------------------------------------------------------//
  //-----------------------------------------------------------------------------------------------------------------------------------//
  $scope.populateActorsByMovie = function(pActualMovie) {
    var url = "http://www.videoextrem.com/api/actorsByMovie.php?queryType=select";
    var movieData = {
      'idPelicula': pActualMovie.idPelicula
    }
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    $http.post(url, movieData)
      .then(function(data, status) {
        var tempActorsArray = [];
        for (actualActor = 0; actualActor < data.data.length; actualActor++) {
          tempActorsArray.push(data.data[actualActor].actor);
        }
        $scope.globalActorsArray.push({
          "idPelicula": pActualMovie.idPelicula,
          "actores": tempActorsArray
        });
      })
  }
  //-----------------------------------------------------------------------------------------------------------------------------------//
  //-----------------------------------------------------------------------------------------------------------------------------------//
  $scope.randomColor = function() {
    var colors = ['#D64900', '#008684', '#860002'];
    var random_color = colors[Math.floor(Math.random() * colors.length)];
    $('#sidebar').css('background-color', random_color);
  }
  //-----------------------------------------------------------------------------------------------------------------------------------//
  //-----------------------------------------------------------------------------------------------------------------------------------//
  $scope.cleanDropdown = function(comboBox) {
    while (comboBox.options.length > 0) {
      comboBox.remove(0);
    }
  }
  //-----------------------------------------------------------------------------------------------------------------------------------//
  //-----------------------------------------------------------------------------------------------------------------------------------//
  $scope.cleanRadioValues = function(pId) {
    var elements = document.getElementById(pId).getElementsByTagName('label');
    var size = elements.length;
    for (var i = 0; i < size; i++) {
      elements[i].parentNode.removeChild(elements[i]);

    }
  }
  //-----------------------------------------------------------------------------------------------------------------------------------//
  //-----------------------------------------------------------------------------------------------------------------------------------//
  $scope.showMovie = function(selectedMovie) {
    var selectDropdown = document.getElementById('selectGenresShow');
    var selectDropdownLanguages = document.getElementById('selectLanguagesShow');
    var selectDropdownActors = document.getElementById('selectActorsShow');
    selectDropdown.innerHTML = '';
    selectDropdownLanguages.innerHTML = '';
    selectDropdownActors.innerHTML = '';
    $scope.cleanDropdown(selectDropdown);
    $scope.cleanDropdown(selectDropdownLanguages);
    $scope.randomColor();
    $scope.actualMovie = selectedMovie;
    var genres = [];
    var languages = [];
    var actors = [];
    for (actualGenre = 0; actualGenre < $scope.globalGenresArray.length; actualGenre++) {
      if ($scope.globalGenresArray[actualGenre].idPelicula == selectedMovie.idPelicula) {
        genres = $scope.globalGenresArray[actualGenre].generos;
        break;
      }
    }
    for (actualGenre = 0; actualGenre < genres.length; actualGenre++) {
      var genreElement = genres[actualGenre];
      var newOption = document.createElement("option");
      newOption.text = genreElement;
      newOption.value = 'genero' + actualGenre;
      selectDropdown.appendChild(newOption);
    }
    for (actualLanguage = 0; actualLanguage < $scope.globalLanguagesArray.length; actualLanguage++) {
      if ($scope.globalLanguagesArray[actualLanguage].idPelicula == selectedMovie.idPelicula) {
        languages = $scope.globalLanguagesArray[actualLanguage].idiomas;
        break;
      }
    }
    for (actualLanguage = 0; actualLanguage < languages.length; actualLanguage++) {
      var languageElement = languages[actualLanguage];
      var newOption = document.createElement("option");
      newOption.text = languageElement;
      newOption.value = 'idioma' + actualLanguage;
      selectDropdownLanguages.appendChild(newOption);
    }
    for (actualActor = 0; actualActor < $scope.globalActorsArray.length; actualActor++) {
      if ($scope.globalActorsArray[actualActor].idPelicula == selectedMovie.idPelicula) {
        actors = $scope.globalActorsArray[actualActor].actores;
        break;
      }
    }
    for (actualActor = 0; actualActor < actors.length; actualActor++) {
      var actorElement = actors[actualActor];
      var newOption = document.createElement("option");
      newOption.text = actorElement;
      newOption.value = 'actor' + actualActor;
      selectDropdownActors.appendChild(newOption);
    }
  }
  //-----------------------------------------------------------------------------------------------------------------------------------//
  //-----------------------------------------------------------------------------------------------------------------------------------//
  $scope.changeRadioValue = function() {
    var actualRadioElement = document.getElementById($scope.globalRadioId);
    if (actualRadioElement.checked === true) {
      actualRadioElement.checked = true;
    } else {
      actualRadioElement.checked = false;
    }
  }
  //-----------------------------------------------------------------------------------------------------------------------------------//
  //-----------------------------------------------------------------------------------------------------------------------------------//
  $scope.createRadioButton = function(name, value, text, pClassName, pIsChecked) {
    var label = document.createElement("label");
    var radio = document.createElement("input");
    radio.id = pClassName + value;
    radio.className = pClassName;
    radio.type = "checkbox";
    radio.name = text;
    radio.checked = pIsChecked;
    var reply_click = function() {
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
  $scope.setEditMovie = function(selectedMovie) {
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

    for (actualGenre = 0; actualGenre < $scope.globalGenresArray.length; actualGenre++) {
      if ($scope.globalGenresArray[actualGenre].idPelicula == selectedMovie.idPelicula) {
        genres = $scope.globalGenresArray[actualGenre].generos;
        $scope.movieGenres = $scope.globalGenresArray[actualGenre].generos;
        break;
      }
    }
    for (actualGenre = 0; actualGenre < genres.length; actualGenre++) {
      var genreElement = genres[actualGenre];
      var new_button = $scope.createRadioButton(genreElement, genreElement, genreElement, "genero", true);
      var br = document.createElement("br");
      radio_genres.appendChild(new_button);
      radio_genres.appendChild(br);
    }
    for (actualLanguage = 0; actualLanguage < $scope.globalLanguagesArray.length; actualLanguage++) {
      if ($scope.globalLanguagesArray[actualLanguage].idPelicula == selectedMovie.idPelicula) {
        languages = $scope.globalLanguagesArray[actualLanguage].idiomas;
        $scope.movieLanguages = $scope.globalLanguagesArray[actualLanguage].idiomas;
        break;
      }
    }

    for (actualLanguage = 0; actualLanguage < languages.length; actualLanguage++) {
      var languageElement = languages[actualLanguage];
      var new_button = $scope.createRadioButton(languageElement, languageElement, languageElement, "idioma", true);
      var br = document.createElement("br");
      radio_langauges.appendChild(new_button);
      radio_langauges.appendChild(br);
    }
    for (actualActor = 0; actualActor < $scope.globalActorsArray.length; actualActor++) {
      if ($scope.globalActorsArray[actualActor].idPelicula == selectedMovie.idPelicula) {
        actors = $scope.globalActorsArray[actualActor].actores;
        $scope.movieActors = $scope.globalActorsArray[actualActor].actores;
        break;
      }
    }
    for (actualActor = 0; actualActor < actors.length; actualActor++) {
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
  $scope.editMovie = function() {
    var nameInput = document.getElementById("movieNameEdit").value;
    var yearInput = document.getElementById("movieYearEdit").value;
    var descriptionInput = document.getElementById("movieDescriptionEdit").value;
    var priceInput = document.getElementById("moviePriceEdit").value;
    var linkInput = document.getElementById("movieLinkInput").value;
    var url = "http://www.videoextrem.com/api/movies.php?queryType=edit";

    $scope.updateRadioButtons('genero');
    $scope.updateRadioButtons('idioma');
    $scope.updateRadioButtons('actor');

    var movieData = {
      'idPelicula': $scope.actualMovie.idPelicula,
      'pelicula': nameInput,
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
    $http.post(url, movieData).
    then(function(data, status) {
      alert("La pelicula " + $scope.actualMovie.pelicula + " ha sido actualizada");
      location.reload();
    })
  }
  //-----------------------------------------------------------------------------------------------------------------------------------//
  //-----------------------------------------------------------------------------------------------------------------------------------//
  $scope.updateRadioButtons = function(pClassName) {
    var radios = document.getElementsByTagName('input');
    var value;

    var actualArrayGenres = [];
    var actualArrayLanguages = [];
    var actualArrayActors = [];

    for (var i = 0; i < radios.length; i++) {
      if (radios[i].type === 'checkbox' && radios[i].checked && radios[i].className == pClassName) {
        value = radios[i].value;
        if (pClassName === "genero") {
          actualArrayGenres.push(value);
        }
        if (pClassName === "idioma") {
          actualArrayLanguages.push(value);
        }
        if (pClassName === "actor") {
          actualArrayActors.push(value);
        }
      }
    }
    if (pClassName === "genero") {
      for (actualGenre = 0; actualGenre < $scope.movieGenres.length; actualGenre++) {
        var oldElementGenre = $scope.movieGenres[actualGenre];
        if (actualArrayGenres.includes(oldElementGenre)) {} else {
          $scope.genresArrayRemove.push(oldElementGenre);
        }
      }

      for (actualGenre = 0; actualGenre < actualArrayGenres.length; actualGenre++) {
        var newElementGenre = actualArrayGenres[actualGenre];
        if ($scope.movieGenres.includes(newElementGenre)) {} else {
          $scope.genresArrayAdd.push(newElementGenre);
        }
<<<<<<< Updated upstream
      }
    }
    if (pClassName === "idioma") {
      for (actualLanguage = 0; actualLanguage < $scope.movieLanguages.length; actualLanguage++) {
        var oldElementLanguage = $scope.movieLanguages[actualLanguage];
        if (actualArrayLanguages.includes(oldElementLanguage)) {} else {
          $scope.languagesArrayRemove.push(oldElementLanguage);
=======
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $http.post(url,movieData).
        then(function(data, status) {
            messageService.setMessage("La pelicula " + $scope.actualMovie.pelicula + " se ha editado correctamente.");
            setTimeout(function() { window.location.reload(true); }, 2000);
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
>>>>>>> Stashed changes
        }
      }

      for (actualLanguage = 0; actualLanguage < actualArrayLanguages.length; actualLanguage++) {
        var newElementLanguage = actualArrayLanguages[actualLanguage];
        if ($scope.movieLanguages.includes(newElementLanguage)) {} else {
          $scope.languagesArrayAdd.push(newElementLanguage);
        }
      }
    }
    if (pClassName === "actor") {
      for (actualActor = 0; actualActor < $scope.movieActors.length; actualActor++) {
        var oldElementActor = $scope.movieActors[actualActor];
        if (actualArrayActors.includes(oldElementActor)) {} else {
          $scope.actorsArrayRemove.push(oldElementActor);
        }
      }

      for (actualActor = 0; actualActor < actualArrayActors.length; actualActor++) {
        var newElementActor = actualArrayActors[actualActor];
        if ($scope.movieActors.includes(newElementActor)) {} else {
          $scope.actorsArrayAdd.push(newElementActor);
        }
      }
    }
  }
  //-----------------------------------------------------------------------------------------------------------------------------------//
  //-----------------------------------------------------------------------------------------------------------------------------------//
  $scope.populateRemainingGenres = function(pActualMovie) {
    var url = "http://www.videoextrem.com/api/genresByMovie.php?queryType=genres";
    var movieData = {
      'idPelicula': pActualMovie.idPelicula
    }
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    $http.post(url, movieData)
      .then(function(data, status) {
        for (actualGenre = 0; actualGenre < data.data.length; actualGenre++) {
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
  $scope.populateRemainingLanguages = function(pActualMovie) {
    var url = "http://www.videoextrem.com/api/languagesByMovie.php?queryType=languages";
    var movieData = {
      'idPelicula': pActualMovie.idPelicula
    }
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    $http.post(url, movieData)
      .then(function(data, status) {
        for (actualLanguage = 0; actualLanguage < data.data.length; actualLanguage++) {
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
  $scope.populateRemainingActors = function(pActualMovie) {
    var url = "http://www.videoextrem.com/api/actorsByMovie.php?queryType=actors";
    var movieData = {
      'idPelicula': pActualMovie.idPelicula
    }
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    $http.post(url, movieData)
      .then(function(data, status) {
        for (actualActor = 0; actualActor < data.data.length; actualActor++) {
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
  $scope.verifyRadioValues = function() {
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
  $scope.deleteMovie = function(pActualMovie) {
    var url = "http://www.videoextrem.com/api/movies.php?queryType=delete";
    var movieData = {
      'idPelicula': pActualMovie.idPelicula
    }
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    $http.post(url, movieData).
    then(function(data, status) {
      alert("La pelicula " + pActualMovie.pelicula + " ha sido borrada");
      location.reload();
    })
  }
  $scope.reply_click = function(clicked_id) {
    alert(clicked_id);
  }
  //-----------------------------------------------------------------------------------------------------------------------------------//
  //-----------------------------------------------------------------------------------------------------------------------------------//
  $scope.searchMovie = function() {

    $scope.loading = true;
    var sUrl = 'http://www.omdbapi.com/?t=' + $scope.actualMovie.title + '&type=movie&tomatoes=true';
    return $.ajax(sUrl, {
      complete: function(p_oXHR, p_sStatus) {
        var data = $.parseJSON(p_oXHR.responseText);
        $scope.actualMovie.title = data.Title;
        var released = data.Released;
        var year = released.substring(released.length - 4, released.length);
        $scope.actualMovie.year = parseInt(year);
        $scope.actualMovie.genre = data.Genre;
        $scope.actualMovie.actors = data.Actors;
        $scope.actualMovie.language = data.Language;
        $scope.actualMovie.poster = data.Poster;
        $scope.actualMovie.plot = data.Plot;
        var actors = data.Actors.split(",");
        for (actualActorIndex in actors) {
          $scope.addActor(actors[actualActorIndex], actualActorIndex);
        }
<<<<<<< Updated upstream
        $scope.loading = false;
        $scope.$apply();
=======
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $http.post(url,movieData).
        then(function(data, status) {
            messageService.setMessage("La pelicula " + pActualMovie.pelicula + " se ha borrado correctamente.");
            setTimeout(function() { window.location.reload(true); }, 2000);
        })
    }
    $scope.reply_click = function(clicked_id){
        alert(clicked_id);
    }
    //-----------------------------------------------------------------------------------------------------------------------------------//
    //-----------------------------------------------------------------------------------------------------------------------------------//
    $scope.searchMovie = function(){

        $scope.loading = true;
        var sUrl = 'http://www.omdbapi.com/?t='+$scope.actualMovie.title+'&type=movie&tomatoes=true';
        return $.ajax(sUrl,{
            complete: function(p_oXHR, p_sStatus) {
                var data =$.parseJSON(p_oXHR.responseText);
                $scope.actualMovie.title = data.Title;
                var released = data.Released;
                var year = released.substring(released.length-4, released.length);
                $scope.actualMovie.year = parseInt(year);
                $scope.actualMovie.genre = data.Genre;
                $scope.actualMovie.actors = data.Actors;
                $scope.actualMovie.language = data.Language;
                $scope.actualMovie.poster = data.Poster;
                $scope.actualMovie.plot = data.Plot;
                var actors = data.Actors.split(",");
                for (actualActorIndex in actors){
                    $scope.addActor(actors[actualActorIndex],actualActorIndex);
                }
                $scope.loading = false;
                $scope.$apply();

                return data
            }}).done(function(data) {
>>>>>>> Stashed changes

        return data
      }
    }).done(function(data) {


    });
  }
  //-----------------------------------------------------------------------------------------------------------------------------------//
  //-----------------------------------------------------------------------------------------------------------------------------------//
  $scope.addActor = function(actorName, id) {
    //Aqui se deberia de agregar a la base de datos si no existe y por otro lado traerse los que si existen.
    var actualActor = {
      "Actor": actorName,
      "id": id
    }
    $scope.actors.push(actualActor);
  }
}

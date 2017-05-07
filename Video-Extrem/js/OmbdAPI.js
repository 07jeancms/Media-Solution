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
    movieTableController.$inject = ["NgTableParams", "$resource",'$scope'];

    function movieTableController(NgTableParams, $resource, $scope) {
        // tip: to debug, open chrome dev tools and uncomment the following line 
        //debugger;
        $scope.actualMovie = {
          

        };
        $scope.actors = [];
        $scope.loading = false;

        this.tableParams = new NgTableParams({page: 1, // show first page
                                              count: 3, // count per page
                                              filter: {
                                                  name: '' // initial filter
                                              }
                                             }, {
            getData: function(params) {
                // ajax request to api
                var sUrl = 'http://www.omdbapi.com/?s=Harry'
                return $.ajax(sUrl,{
                    complete: function(p_oXHR, p_sStatus) {
                        var oData =$.parseJSON(p_oXHR.responseText);
                        return oData.Search
                    }}).done(function(data) {
                    params.total(data.inlineCount); // recal. page nav controls
                    return data.results;
                });
            } 

        });

        $scope.randomColor = function(){
            var colors = ['#D64900', '#008684', '#860002'];
            var random_color = colors[Math.floor(Math.random() * colors.length)];
            $('#sidebar').css('background-color', random_color);
        }
        $scope.showMovie = function(selectedMovie){
            $scope.randomColor();
            $scope.actualMovie = selectedMovie;
        }
        $scope.editMovie = function(selectedMovie){
            $scope.actualMovie = selectedMovie;
            alert( $scope.actualMovie.Year)
        }
        $scope.deleteMovie = function(selectedMovie){
            alert( "Deleting "+$scope.actualMovie.Title)
        }
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
            var categoryNameInput = document.getElementById('updateLanguageName').value;
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
        
        $scope.showCategory = function(pActualLanguage){
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
    actorController.$inject = ["NgTableParams", "$resource"];

    function actorController(NgTableParams, $resource) {
        // tip: to debug, open chrome dev tools and uncomment the following line 
        //debugger;

        this.tableParams = new NgTableParams({}, {
            getData:function(){
                return []
            }

        });

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
    subtitlesController.$inject = ["NgTableParams", "$resource"];

    function subtitlesController(NgTableParams, $resource) {
        // tip: to debug, open chrome dev tools and uncomment the following line 
        //debugger;

        this.tableParams = new NgTableParams({}, {
            getData:function(){
                return []
            }

        });

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
        }
        
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
        }
        
        $scope.setEditGenre = function (pActualGenre) {
            $scope.actualGenre = pActualGenre;
        }
        
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
                    alert("El genero " + $scope.actualGenre.genero + " ha sido actualizado a " + genreNameInput);
                    location.reload();
            })
        }
        
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

        this.tableParams = new NgTableParams({}, {
            getData:function(){
            $http.get("http://www.videoextrem.com/api/categories.php?queryType=select")
                .then(function(response) {
                    $scope.arrayCategories = response.data;
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
    roleController.$inject = ["NgTableParams", "$resource"];

    function roleController(NgTableParams, $resource) {
        // tip: to debug, open chrome dev tools and uncomment the following line 
        //debugger;

        this.tableParams = new NgTableParams({}, {
            getData:function(){
                return []
            }

        });

    }
})();
//Esta funcion es para que el marco del poster de la pelicula cambie cada vez que se da visualizar.


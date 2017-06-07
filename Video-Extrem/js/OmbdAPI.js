var app = angular.module('crudApp', ['ngTable', 'ngResource', 'dndLists', 'smart-table']);

(function() {
  //Press enter on modal
  app.directive('pressEnter', function() {
    return function(scope, element, attrs) {
      element.bind('keydown keypress', function(event) {
        if (event.which === 13) {
          scope.$apply(function() {
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

  app.factory('dataManager', ['$http', function($http) {
    var divs = {};
    var waitTime = 1000;
    var timeSections = 3;

    //Data
    var roleData = {
      roles: [],
    };
    var movieData = {
      movies: [],
    };
    var languageData = {
      languages: [],
    };
    var actorData = {
      actors: [],
    };
    var subtitleData = {
      subtitles: [],
    };
    var genreData = {
      genres: [],
    };
    var categoryData = {
      categories: [],
    };
    var suggestionData = {
      suggestions: [],
    };
    var discountData = {
      discounts: [],
    };
    var userData = {
      users: [],
    };
    var bookingMasterData = {
      booking: [],
    };

    var storeData = {
      stores: [],
    };

    //Flags
    var actualDiv = {};
    //Esta función determina si se debe de cargar los datos.
    function canBeLoaded(divKey) {
      if (divs[divKey] != null) {
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
            actualDivProperties = {
                "id" : id,
                "time" : 1
            }
            actualDiv[id] = actualDivProperties;
        }
    }

        function isInDiv(){
            var actualWindowScreen = $(this).scrollTop();
            actualWindowScreen = Math.floor(actualWindowScreen / 100) * 100;
            if (canBeLoaded(actualWindowScreen)) {



                //Loading actual div
                var actualId = divs[actualWindowScreen].id;
                actualDivProperties = {
                    "id" : actualId,
                    "time" : 1
                }
                actualDiv[actualId] = actualDivProperties;
                for (var actualTime = 0 ; actualTime < timeSections; actualTime++) {
                    (function(ind) {
                        setTimeout(function(){

                            manageData(divs[actualWindowScreen],  actualWindowScreen);
                            actualDiv[actualId].time = actualDiv[actualId].time +1;
                        }, waitTime * ind);
                    })(actualTime);
                }
            }
        }
        //el evento $(window).scroll detecta el div en el cual estamos ubicados.
        $(window).scroll(function() {
            isInDiv();
        })

        /*Esta funcion se llama una vez que el evento $(window).scroll detecte que estamos en el div indicado.
        Esta funcion espera una cantidad definida para saber si el usuario si esta esperando datos en donde esta ubicado, o solo esta de paso por el scroll.
        */

    function isInDiv() {
      var actualWindowScreen = $(this).scrollTop();
      actualWindowScreen = Math.floor(actualWindowScreen / 100) * 100;
      if (canBeLoaded(actualWindowScreen)) {



        //Loading actual div
        var actualId = divs[actualWindowScreen].id;
        actualDivProperties = {
          "id": actualId,
          "time": 1
        }
        actualDiv[actualId] = actualDivProperties;
        for (var actualTime = 0; actualTime < timeSections; actualTime++) {
          (function(ind) {
            setTimeout(function() {

              manageData(divs[actualWindowScreen], actualWindowScreen);
              actualDiv[actualId].time = actualDiv[actualId].time + 1;
            }, waitTime * ind);
          })(actualTime);
        }
      }
    }
    //el evento $(window).scroll detecta el div en el cual estamos ubicados.
    $(window).scroll(function() {
      isInDiv();
    })

    /*Esta funcion se llama una vez que el evento $(window).scroll detecte que estamos en el div indicado.
    Esta funcion espera una cantidad definida para saber si el usuario si esta esperando datos en donde esta ubicado, o solo esta de paso por el scroll.
    */
    function manageData(actualTable, actualWindowScreen) {
      var actualTableId = actualTable.id;
      var pageSizePorcentage = $('#' + actualTableId).outerHeight(true) * 0.4;
      var newActualWindowScreen = $(this).scrollTop();
      actualDiv[divs[actualWindowScreen].id];
      var actualTime = actualDiv[actualTableId].time;
      if (actualWindowScreen >= newActualWindowScreen - pageSizePorcentage && actualWindowScreen <= newActualWindowScreen + pageSizePorcentage) {
        switch (actualTableId) {
          case "role":
            if (actualTime < timeSections) {
              console.log("Counting " + actualTableId + "  " + actualTime)
            } else {
              getRolesData();
              actualTable.loaded = true;

              console.log("Role getted");
            }
            break;
          case "movie":
            if (actualTime < timeSections) {
              console.log("Counting " + actualTableId + "  " + actualTime)
            } else {
              getMovieData();
              actualTable.loaded = true;
              console.log("Movie getted");
            }

            break;
          case "language":
            if (actualTime < timeSections) {
              console.log("Counting " + actualTableId + "  " + actualTime)
            } else {
              getLanguageData();
              actualTable.loaded = true;
              console.log("language getted");
            }
            break;
          case "actor":
            if (actualTime < timeSections) {
              console.log("Counting " + actualTableId + "  " + actualTime)
            } else {
              getActorData();
              actualTable.loaded = true;
              console.log("Actor getted");
            }
            break;
          case "subtitle":
            if (actualTime < timeSections) {
              console.log("Counting " + actualTableId + "  " + actualTime)
            } else {
              getSubtitleData();
              actualTable.loaded = true;
              console.log("subtitle getted");
            }
            break;
          case "genre":
            if (actualTime < timeSections) {
              console.log("Counting " + actualTableId + "  " + actualTime)
            } else {
              getGenreData();
              actualTable.loaded = true;
              console.log("genre getted");
            }
            break;
          case "category":
            if (actualTime < timeSections) {
              console.log("Counting " + actualTableId + "  " + actualTime)
            } else {
              getCategoryData();
              actualTable.loaded = true;
              console.log("Category getted");
            }
            break;
          case "suggestion":
            if (actualTime < timeSections) {
              console.log("Counting " + actualTableId + "  " + actualTime)
            } else {
              getSuggestionData();
              actualTable.loaded = true;
              console.log("suggestion getted");
            }
            break;
          case "user":
            if (actualTime < timeSections) {
              console.log("Counting " + actualTableId + "  " + actualTime)
            } else {
              getUserData();
              actualTable.loaded = true;
              console.log("user getted");
            }
            break;
          case "discounts":
            if (actualTime < timeSections) {
              console.log("Counting " + actualTableId + "  " + actualTime)
            } else {
              getDiscountsData();
              actualTable.loaded = true;
              console.log("discounts getted");
            }
            break;
          case "suggestionIndex":
            if (actualTime < timeSections) {
              console.log("Counting " + actualTableId + "  " + actualTime)
            } else {
              showTestMessage("suggestionIndex");
            }
            break;
          case "booking":
            if (actualTime < timeSections) {
              console.log("Counting " + actualTableId + "  " + actualTime)
            } else {
              getBookingMasterData();
              actualTable.loaded = true;
            }
            break;
          case "local":
            getStoreData();
            actualTable.loaded = true;
            break;
          default:
            break;
        }

      } else {
        actualDiv[actualTableId].time = 0;
      }



    }

    function showTestMessage(pMessage) {
      console.log("NG-APP working on " + pMessage);
    }

    function getStoreData() {
      $http.get("http://www.videoextrem.com/api/stores.php?queryType=select")
        .then(function(response) {
          storeData.stores = response.data;
        });

    }

    function getDiscountsData() {
      $http.get("http://www.videoextrem.com/api/discounts.php?queryType=select")
        .then(function(response) {
          discountData.discounts = response.data;
        });

    }

    function getRolesData() {
      $http.get("http://www.videoextrem.com/api/roles.php?queryType=select")
        .then(function(response) {
          roleData.roles = response.data;
        });

    }

    function getMovieData() {
      $http.get("http://www.videoextrem.com/api/movies.php?queryType=select")
        .then(function(response) {
          movieData.movies = response.data;
        });

    }

    function getLanguageData() {
      $http.get("http://www.videoextrem.com/api/language.php?queryType=select")
        .then(function(response) {
          languageData.languages = response.data;
        });

    }

    function getActorData() {
      $http.get("http://www.videoextrem.com/api/actors.php?queryType=select")
        .then(function(response) {
          actorData.actors = response.data;
        });

    }

    function getSubtitleData() {
      $http.get("http://www.videoextrem.com/api/subtitles.php?queryType=select")
        .then(function(response) {
          subtitleData.subtitles = response.data;
        });

    }

    function getGenreData() {
      $http.get("http://www.videoextrem.com/api/genres.php?queryType=select")
        .then(function(response) {
          genreData.genres = response.data;
        });

    }

    function getCategoryData() {
      $http.get("http://www.videoextrem.com/api/categories.php?queryType=select")
        .then(function(response) {
          categoryData.categories = response.data;
        });

    }
    //Falta de implementar
    function getSuggestionData() {
      $http.get("http://www.videoextrem.com/api/suggestions.php?queryType=select")
        .then(function(response) {
          suggestionData.suggestions = response.data;
        });

    }
    //falta de implementar
    function getUserData() {
      $http.get("http://www.videoextrem.com/api/users.php?queryType=select")
        .then(function(response) {
          userData.users = response.data;
        });

    }

    function getBookingMasterData() {
      $http.get("http://www.videoextrem.com/api/bookingMovie.php?queryType=getBookingMaster")
        .then(function(response) {
          bookingMasterData.booking = response.data;
        });

    }
    //Se ejectua el getData para cargar la informacion de los divs
    getData();
    //Y se ejecuta una vez el isInDiv() para que cargue los datos de la parte de la pagina de donde inicia
    isInDiv()
    return {
      roleData: roleData,
      movieData: movieData,
      genreData: genreData,
      languageData: languageData,
      actorData: actorData,
      subtitleData: subtitleData,
      categoryData: categoryData,
      suggestionData: suggestionData,
      userData: userData,
      bookingMasterData: bookingMasterData,
      discountData: discountData,
      storeData: storeData,
      actualDiv: actualDiv
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
    var message = {
      header: "Mensaje",
      body: "Cuerpo",

      setMessage: function(pHeader, pMessage) {
        var visible_modal = jQuery('.modal.in').attr('id'); // modalID or undefined
        if (visible_modal) { // modal is active
          jQuery('#' + visible_modal).modal('hide'); // close modal
        }
        this.header = pHeader;
        this.body = pMessage;
        $('#messageModal').modal('show')

      },

      getHeader: function() {

        return this.header;
      },
      getBody: function() {
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




  app.controller('modalController', modalController);

  modalController.$inject = ['$resource', '$scope', 'messageService'];

  function modalController($resource, $scope, messageService) {
    // tip: to debug, open chrome dev tools and uncomment the following line
    //debugger;
    $scope.body = messageService.getBody();
    $scope.header = messageService.getHeader();
    $scope.$watch(function() {
      return messageService.header
    }, function(NewValue, OldValue) {
      $scope.body = messageService.getBody();
      $scope.header = messageService.getHeader();

    }, true);

  }

  app.controller('mediaController', mediaController);

  mediaController.$inject = ['$resource', '$scope', 'messageService'];

  function mediaController($resource, $scope, messageService) {
    // tip: to debug, open chrome dev tools and uncomment the following line
    //debugger;
    $scope.waze = true;
    $scope.whatsapp = true;
    $scope.facebook = true;
    $scope.whatsappMessage = function() {
      messageService.setMessage('Whatsapp', 'El numero de whatsapp para cualquier consulta es el siguiente: 8472-8298 ');

    };
  }







})();
//Esta funcion es para que el marco del poster de la pelicula cambie cada vez que se da visualizar.

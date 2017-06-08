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
    var timesCalled = 0;
    //Data
    var divData = {};

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
      var adminDiv = document.getElementsByClassName('adminDiv');
      var adminDivIndex;
      for (adminDivIndex = 0; adminDivIndex < adminDiv.length; adminDivIndex++) {
        var id = adminDiv[adminDivIndex].id;
        var outerHeigth = $('#' + id).outerHeight(true);
        var offSetTop = $('#' + id).offset().top;
        offSetTop = Math.floor(offSetTop / 100) * 100;
        var dataLink = "http://www.videoextrem.com/api/" + id + ".php?queryType=select";
        //Create div hash with position as key
        var actualDivProperties = {
          "id": id,
          "loaded": false,
          "outerHeigth": outerHeigth,
          'url': dataLink,
        }
        divs[offSetTop] = actualDivProperties;
        //Create div hash with id as key
        var actualDivDataProperties = {
          "time": 1,
        }
        divData[id] = actualDivDataProperties;

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
        divData[actualId].time = 1;
        for (var actualTime = 1; actualTime < timeSections; actualTime++) {
          (function(ind) {
            setTimeout(function() {

              manageData(divs[actualWindowScreen], actualWindowScreen);

              divData[actualId].time = divData[actualId].time + 1;

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
      var actualTime = divData[actualTableId].time;

      var isInRangeTop = (actualWindowScreen >= (newActualWindowScreen - pageSizePorcentage))
      var isInRangeDown = (actualWindowScreen <= (newActualWindowScreen + pageSizePorcentage))

      if (isInRangeTop && isInRangeDown) {

        if (actualTime < timeSections) {
          console.log("Counting " + actualTableId + "  " + actualTime)
        } else {
          getDivData(actualTable);
          actualTable.loaded = true;
          console.log(actualTableId + " getted");
        }

      } else {
        divData[actualTableId].time = 0;
      }

    }

    function showTestMessage(pMessage) {
      console.log("NG-APP working on " + pMessage);
    }

    function getDivData(actualDiv) {
      var actualDivId = actualDiv.id;
      var isLoaded = actualDiv.loaded;
      if (!isLoaded) {
        actualDiv.loaded = true;
        $http.get(actualDiv.url)
          .then(function(response) {
            divData[actualDivId].data = response.data;
              console.log(JSON.stringify(divData,null, 2));
          });

      }

    }

    //Se ejectua el getData para cargar la informacion de los divs
    getData();
    //Y se ejecuta una vez el isInDiv() para que cargue los datos de la parte de la pagina de donde inicia
    isInDiv();

    return {
      divData: divData,
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

app.controller('bookingController', bookingController);
bookingController.$inject = ['$scope', '$http', 'dataManager', 'messageService'];

function bookingController($scope, $http, dataManager, messageService) {

  $scope.bookingDataSet = dataManager.divData.bookingMovie;
  $scope.bookingCollection = {
    data: []
  };
  $scope.itemsByPage = 5;
  $scope.actualBooking = {};
  $scope.moviesSelected = {
    moviesBooked: []
  };
  $scope.moviesSelectedDataset = {
    moviesBooked: []
  };;
  $scope.moviesToBook = [];

  $scope.storesCounter = 0;

  $scope.chartCounter = 0;

  $scope.actualDiv = dataManager.actualDiv;
  $scope.actualClass = '';

  $scope.$watch('bookingDataSet.time', function() {
    if ($scope.bookingDataSet != null) {
      var actualTime = $scope.bookingDataSet.time;
      if (actualTime <= 3) {
        $scope.actualClass = 'iconWaiting' + actualTime + ' fa-spinner fa-spin';
      } else {
        $scope.actualClass = "iconComplete"
      }
    }

  });

  $scope.getBookingMovie = function() {
    $scope.moviesSelected = [];
    var movieNameInput = document.getElementById('movieName').value;
    $scope.url = "http://www.videoextrem.com/api/bookingMovie.php?queryType=select";
    $scope.bookingMovieData = {
      'pelicula': movieNameInput
    }
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    $http.post($scope.url, $scope.bookingMovieData).
    then(function(data, status) {
      if (data.data.length === 0) {
        messageService.setMessage("La pelicula " + movieNameInput + " no se encuentra actualmente en nuestro inventario.");
      } else {
        for (actualMovie = 0; actualMovie < data.data.length; actualMovie++) {
          $scope.moviesSelectedDataset.moviesBooked.push(data.data[actualMovie]);
        }
      }
    })
  }

  $scope.addBookingMovie = function(pBookingMovie) {
    var index = $scope.moviesToBook.indexOf(pBookingMovie);
    var selectDropdown = document.getElementById('selectCreateBookingMovie');
    selectDropdown.innerHTML = '';
    if (index === -1) {
      $scope.chartCounter += 1;
      var counter_cart = document.getElementById('pruebita');
      counter_cart.innerHTML = " " + $scope.chartCounter;
      $scope.storesCounter += 1;
      $scope.moviesToBook.push(pBookingMovie);
      if ($scope.storesCounter !== 0) {
        $scope.url = "http://www.videoextrem.com/api/bookingMovie.php?queryType=stores";
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $http.get($scope.url)
          .then(function(response) {
            for (actualStore = 0; actualStore < response.data.length; actualStore++) {
              var storeElement = response.data[actualStore].local;
              var newOption = document.createElement("option");
              newOption.text = storeElement;
              newOption.value = storeElement;
              selectDropdown.appendChild(newOption);
            }
            messageService.setMessage("La película ha sido agregada correctamente.");    
          })
      }
    }
    else{
        messageService.setMessage("La película ya se encuentra registrada, por favor selecciona otra película.");
    }
  }

  $scope.deleteBookingMovie = function(pBookingMovie) {
    var index = $scope.moviesToBook.indexOf(pBookingMovie);
    if (index > -1) {
      $scope.chartCounter -= 1
      if ($scope.chartCounter > 0) {
        var counter_cart = document.getElementById('pruebita');
        counter_cart.innerHTML = " " + $scope.chartCounter;
      }
      if ($scope.chartCounter == 0) {
        var counter_cart = document.getElementById('pruebita');
        counter_cart.innerHTML = "";
      }
      $scope.moviesToBook.splice(index, 1);
    }
  }

  $scope.addBooking = function(pBookingMovieList,pUserId) {
    var selectDropdown = document.getElementById('selectCreateBookingMovie').value;
    var description = document.getElementById('textAreaDescripcion').value;
    $scope.chartCounter = 0;
    var counter_cart = document.getElementById('pruebita');
    counter_cart.innerHTML = " Carrito " + $scope.chartCounter;
    var x;
    for (x in pBookingMovieList) {
      $scope.url = "http://www.videoextrem.com/api/bookingMovie.php?queryType=booking";
      $scope.bookingMovieData = {
        'pdescription': description,
        'pstore': selectDropdown,
        'pmovie': pBookingMovieList[x].pelicula,
        'puser': pUserId,
        'pcounter': x
      }
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
      $http.post($scope.url, $scope.bookingMovieData).
      then(function(data, status) {

      })
    }
    messageService.setMessage("Su reserva esta siendo procesada");
    setTimeout(function() { window.location.reload(true); }, 2000); 
  }
  $scope.deleteBookingMaster = function(pActualBookingMasterData) {
    $scope.url = "http://www.videoextrem.com/api/bookingMovie.php?queryType=delete";
    $scope.BookingMasterData = {
      'idBooking': pActualBookingMasterData.idReservacionMaestra
    }
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    $http.post($scope.url, $scope.BookingMasterData).
    then(function(data, status) {
      messageService.setMessage("La reservacion se ha borrado correctamente.");
      setTimeout(function() { window.location.reload(true); }, 2000);
    })
  };



}

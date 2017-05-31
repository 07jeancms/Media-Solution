app.controller("bookingController", bookingController);
bookingController.$inject =['$scope', "$http","dataManager","messageService"];

function bookingController($scope, $http,dataManager,messageService) {

    $scope.bookingDataSet = dataManager.bookingMasterData;
    $scope.bookingCollection  = {booking : []};
    $scope.itemsByPage=5;
    $scope.actualBooking = {};

    $scope.moviesSelected = [];
    $scope.moviesToBook = [];

    $scope.storesCounter = 0;

    $scope.getBookingMovie = function(){
        $scope.moviesSelected = [];
        var movieNameInput = document.getElementById('movieName').value;
        $scope.url = "http://www.videoextrem.com/api/bookingMovie.php?queryType=select";
        $scope.bookingMovieData = {
            'pelicula' : movieNameInput
        }
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $http.post($scope.url, $scope.bookingMovieData).
        then(function(data, status) {
            if(data.data.length === 0){
                alert("La pelicula " + movieNameInput + " no se encuentra actualmente en nuestro inventario.");
            }
            else {
                for(actualMovie=0; actualMovie<data.data.length; actualMovie++){
                    $scope.moviesSelected.push(data.data[actualMovie]);
                }
            }
        })      
    }

    $scope.addBookingMovie = function(pBookingMovie){
        var index = $scope.moviesToBook.indexOf(pBookingMovie);
        var selectDropdown = document.getElementById('selectCreateBookingMovie');
        selectDropdown.innerHTML = '';
        if (index === -1) {
            $scope.storesCounter += 1;
            $scope.moviesToBook.push(pBookingMovie);
            if ($scope.storesCounter !== 0) {
                $scope.url = "http://www.videoextrem.com/api/bookingMovie.php?queryType=stores";
                $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
                $http.get($scope.url)
                .then(function(response) {
                    for(actualStore=0; actualStore<response.data.length; actualStore++){
                        var storeElement = response.data[actualStore].local;
                        var newOption = document.createElement("option");
                        newOption.text = storeElement;
                        newOption.value = storeElement;
                        selectDropdown.appendChild(newOption);
                    }
            })
        }
    }
}

    $scope.deleteBookingMovie = function(pBookingMovie){
        var index = $scope.moviesToBook.indexOf(pBookingMovie);
        if (index > -1) {
            $scope.moviesToBook.splice(index, 1);
        }
    }

    $scope.addBooking = function(pBookingMovieList){
        var selectDropdown = document.getElementById('selectCreateBookingMovie').value;
        var description = document.getElementById('textAreaDescripcion').value;
        console.log(selectDropdown);
        var x;
        for (x in pBookingMovieList) {
            console.log(pBookingMovieList[x].pelicula);
            $scope.url = "http://www.videoextrem.com/api/bookingMovie.php?queryType=booking";
            $scope.bookingMovieData = {
                'pdescription' : description,
                'pstore' : selectDropdown,
                'pmovie' : pBookingMovieList[x].pelicula,
                'puser' : 9,
                'pcounter' : x
            }
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
            $http.post($scope.url, $scope.bookingMovieData).
            then(function(data, status) {
                alert("La reservacion se completo de manera exitosa");
                location.reload();
            })

        }
    }
    $scope.deleteBookingMaster = function(pActualBookingMasterData){
        $scope.url = "http://www.videoextrem.com/api/bookingMovie.php?queryType=delete";
        $scope.BookingMasterData = {
            'idBooking' : pActualBookingMasterData.idReservacionMaestra 
        }
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $http.post($scope.url, $scope.BookingMasterData).
        then(function(data, status) {
            alert("La reservacion ha sido borrada correctamente");
            location.reload();
        })
    };
    


}
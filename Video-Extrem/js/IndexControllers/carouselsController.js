
app.controller("carouselsController", carouselsController);
carouselsController.$inject =['$scope', "$http","dataManager","messageService"];

function carouselsController($scope, $http, dataManager, messageService) {

    $scope.discountArray = [];

    $scope.showDiscount = function(pActualDiscount){
        $scope.actualDiscount = pActualDiscount;
    }

    $scope.init = function(pCarousel){
        $scope.loadImages(pCarousel);
    }
    $scope.actualClass = "";





    $scope.loadImages = function(pIdCarousel) {
        var url = "http://www.videoextrem.com/api/discounts.php?queryType=select1";
        var carouselDiv = "";
        var carouselIndicator = "";

        if(pIdCarousel === 1){
            carouselDiv = document.getElementById('premiereCarousel');
            carouselIndicator = document.getElementById('carouselIndicatorPremieres');
        }
        if(pIdCarousel === 2){
            carouselDiv = document.getElementById('topCarousel');
            carouselIndicator = document.getElementById('carouselIndicatorTop');
        }
        if(pIdCarousel === 3){
            carouselDiv = document.getElementById('oscarCarousel');
            carouselIndicator = document.getElementById('carouselIndicatorOscar');
        }

        if(pIdCarousel === 4){
            carouselDiv = document.getElementById('discountCarousel');
            carouselIndicator = document.getElementById('carouselIndicator');
        }

        var discountData = {
            'idCarousel' : pIdCarousel
        };
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $http.post(url, discountData).
        then(function(data, status) {
            for(actualDiscount=0; actualDiscount<data.data.length; actualDiscount++){
                var newDiv = document.createElement('div');
                var newImg = document.createElement('img');
                var newLi = document.createElement('li');
                carouselIndicator.appendChild(newLi);
                newDiv.className = 'item';
                newImg.src = data.data[actualDiscount].link;
                newImg.alt = "test";
                newDiv.appendChild(newImg);
                carouselDiv.appendChild(newDiv);
            }
        })
    }
}

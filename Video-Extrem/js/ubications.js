var app = angular.module("ubicationApp", [ "ngResource"],);
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
    app.controller("ubicationController", ubicationController);

    ubicationController.$inject = [ "$resource",'$scope'];

    function ubicationController( $resource, $scope) {
        // tip: to debug, open chrome dev tools and uncomment the following line 
        //debugger;
        $scope.whatsapp = "8472-8298";
        $scope.actualUbication = {
        };
        $scope.ubications = [
            {
                
                "name" : "Moravia",
                "telephone" : "2241-4908",
                "coordinateX" : 9.976001,
                "coordinateY" : -84.009787
            },
             {
                
                "name" : "Coronado",
                "telephone" : "2529-2479",
                "coordinateX" : 9.976001,
                "coordinateY" : -84.009787
            },
             {
                
                "name" : "Sabanilla",
                "telephone" : "2273-5331",
                "coordinateX" :9.943956,
                "coordinateY" : -84.023248
            },
             {
                
                "name" : "San Jose",
                "telephone" : "2221-4150",
                "coordinateX" : 9.936233,
                "coordinateY" : -84.079634
            }
        ];
        $scope.selectUbication = function(ubication){
            $scope.actualUbication = ubication;
            createMap(ubication.coordinateX,ubication.coordinateY);
            
        }

    }})();
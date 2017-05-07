var app = angular.module("indexApp", [ "ngResource" ],);
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

    }

    app.controller("mediaController", mediaController);

    mediaController.$inject = [ "$resource",'$scope','messageService'];

    function mediaController( $resource, $scope,messageService) {
        // tip: to debug, open chrome dev tools and uncomment the following line 
        //debugger;
        $scope.waze = true;
        $scope.whatsapp = true;
        $scope.facebook = true;
        $scope.whatsappMessage = function(){
            messageService.setMessage("Whatsapp","El numero de whatsapp para cualquier consulta es el siguiente: 8472-8298 ");

        }
    }   

    app.controller("modalController", modalController);

    modalController.$inject = [ "$resource",'$scope','messageService'];

    function modalController( $resource, $scope,messageService) {
        // tip: to debug, open chrome dev tools and uncomment the following line 
        //debugger;
        $scope.body = messageService.getBody();
        $scope.header = messageService.getHeader();




        $scope.$watch(function(){return messageService.header}, function(NewValue, OldValue){
            $scope.body = messageService.getBody();
            $scope.header = messageService.getHeader();

        }, true);



    }

    app.controller("disscountsController", disscountsController);

    disscountsController.$inject = [ "$resource",'$scope','messageService'];

    function disscountsController( $resource, $scope,messageService) {
        // tip: to debug, open chrome dev tools and uncomment the following line 
        //debugger;
        $scope.images = [
            {
                source: 'http://lorempixel.com/940/480/people/',
                description : 'Slide 1'
            },
            {
                source: 'http://lorempixel.com/940/480/nature/',
                description : 'Slide 2'
            },
            {
                source: 'http://lorempixel.com/940/480/abstract/',
                description : 'Slide 3'
            },
            {
                source: 'http://lorempixel.com/940/480/nightlife/',
                description : 'Slide 4'
            },
        
        ];



    }



})();
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


var app = angular.module("crudApp", ["ngTable", "ngResource"]);
(function() {
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
        $scope.actualMovie = {};
        this.tableParams = new NgTableParams({}, {
            getData: function(params) {
                // ajax request to api
                var sUrl = 'http://www.omdbapi.com/?s=Harry'
                return $.ajax(sUrl,{
                    complete: function(p_oXHR, p_sStatus) {
                        var oData =$.parseJSON(p_oXHR.responseText);
                        console.log(oData.Search);
                        return oData.Search
                    }})
            } 
        });
        $scope.showMovie = function(selectedMovie){
            $scope.actualMovie = selectedMovie;
        }
        $scope.editMovie = function(selectedMovie){
            $scope.actualMovie = selectedMovie;
            alert( $scope.actualMovie.Year)
        }
        $scope.deleteMovie = function(selectedMovie){
            alert( "Deleting "+$scope.actualMovie.Title)
        }

    }

    //    _                                              
    //   | |                                             
    //   | |     __ _ _ __   __ _ _   _  __ _  __ _  ___ 
    //   | |    / _` | '_ \ / _` | | | |/ _` |/ _` |/ _ \
    //   | |___| (_| | | | | (_| | |_| | (_| | (_| |  __/
    //   |______\__,_|_| |_|\__, |\__,_|\__,_|\__, |\___|
    //                       __/ |             __/ |     
    //                      |___/             |___/      

    app.controller("languageController", languageController);
    languageController.$inject = ["NgTableParams", "$resource"];

    function languageController(NgTableParams, $resource) {
        // tip: to debug, open chrome dev tools and uncomment the following line 
        //debugger;

        this.tableParams = new NgTableParams({}, {
            getData:function(){
                return []
            }

        });

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
    genreController.$inject = ["NgTableParams", "$resource"];

    function genreController(NgTableParams, $resource) {
        // tip: to debug, open chrome dev tools and uncomment the following line 
        //debugger;

        this.tableParams = new NgTableParams({}, {
            getData:function(){
                return []
            }

        });

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
    categoriesController.$inject = ["NgTableParams", "$resource"];

    function categoriesController(NgTableParams, $resource) {
        // tip: to debug, open chrome dev tools and uncomment the following line 
        //debugger;

        this.tableParams = new NgTableParams({}, {
            getData:function(){
                return []
            }

        });

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
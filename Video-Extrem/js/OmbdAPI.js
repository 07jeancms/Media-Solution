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


var app = angular.module("myApp", ["ngTable", "ngResource"]);
(function() {

  app.controller("demoController", demoController);
  demoController.$inject = ["NgTableParams", "$resource"];

  function demoController(NgTableParams, $resource) {
    // tip: to debug, open chrome dev tools and uncomment the following line 
    //debugger;
    
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
    
  }
})();
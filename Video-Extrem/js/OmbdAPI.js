var $Form = $('form'), $Container = $('#container');
$Container.hide();
<<<<<<< Updated upstream
$Form.on('submit', function(p_oEvent){
   
=======
$Form.on('submit', function (p_oEvent) {
    "use strict";
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    });    
});


=======
    });
});
>>>>>>> Stashed changes

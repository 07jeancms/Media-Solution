var loadSuggestion = true;

function loadImagesForDiscounts(pIdCarousel) {
    var url = "http://www.videoextrem.com/api/discounts.php?queryType=select1";

    var discountData = {
        'idCarousel' : pIdCarousel
    };
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    console.log(JSON.stringify(discountData));
    $http.post(url, discountData).
    then(function(data, status) {
        console.log(data);
        console.log("Hello babes");
    })
}

loadImagesForDiscounts(4);
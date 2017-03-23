// for every slide in carousel, copy the next slide's item in the slide.
// Do the same for the next, next item.
$('.multi-item-carousel .item').each(function () {
    var next = $(this).next();
    if (!next.length) {
        next = $(this).siblings(':first');
    }
    next.children(':first-child').clone().appendTo($(this));
    var amountOfSlides = 2;
    while (amountOfSlides > 0) {
        amountOfSlides -= 1;
        if (next.next().length > 0) {
            next.next().children(':first-child').clone().appendTo($(this));
            next = next.next();
        } else {
            $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
        }
    }
});
// interval is in milliseconds. 1000 = 1 second - so 1000 * 10 = 10 seconds
$('.carousel').carousel({ interval: 3000 });

function changeCarousel(selected){
    //Reset the classes 

    document.getElementById("estrenos").className = "btn btn-default btn-lg";
    document.getElementById("estrenosDiv").style.display = "none";
    
    document.getElementById("top").className = "btn btn-default btn-lg";
    document.getElementById("topDiv").style.display = "none";
    
    document.getElementById("otro").className = "btn btn-default btn-lg";
    document.getElementById("otroDiv").style.display = "none";

    //Asign the selected Class to the one is selected
    switch(selected){
        case 1:
            document.getElementById("estrenos").className = "btn btn-default btn-lg selected";
            document.getElementById("estrenosDiv").style.display="block";
            break;
        case 2:
            document.getElementById("top").className = "btn btn-default btn-lg selected";
            document.getElementById("topDiv").style.display="block";
            break;
        case 3: 
            document.getElementById("otro").className = "btn btn-default btn-lg selected";
            document.getElementById("otroDiv").style.display="block";
            break;
        default:
            break;
    }
}
changeCarousel(1);
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
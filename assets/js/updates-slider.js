// --------------------------------------------------
// Updates Slider.js
// --------------------------------------------------
(function($){
  $(document).ready(function() {
    if($(".updates-slider").length) {
      $(".updates-slider").slick({
        arrows: false,
        centerMode: false,
        dots: false,
        infinite: true,
        mobileFirst: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        prevArrow: '<button type="button" class="slick-arrow story__slick-arrow slick-prev"><span class="show-for-sr">Previous Update</span></button>',
        nextArrow: '<button type="button" class="slick-arrow story__slick-arrow slick-next"><span class="show-for-sr">Next Update</span></button>',
        appendArrows: $(".updates-slider-arrows"),
        responsive: [
          {
            breakpoint: 640,
            settings: {
              slidesToShow: 2,
              variableWidth: true,
            }
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              arrows: true,
              variableWidth: false,
            }
          }
        ]
      });
    }
  }); // END DOC READY
})(jQuery);
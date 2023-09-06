// --------------------------------------------------
// Profile Slider.js
// --------------------------------------------------
(function($) {
  $(document).ready(function() {
    if($(".slider-row--profiles").length) {
      $(".slider-row--profiles").slick({
        arrows: true,
        centerMode: false,
        dots: false,
        infinite: true,
        mobileFirst: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        appendArrows: ".profile-slider-container",
        prevArrow: '<button type="button" class="slick-arrow slick-prev"><span class="show-for-sr">Previous Profile</span></button>',
        nextArrow: '<button type="button" class="slick-arrow slick-next"><span class="show-for-sr">Next Profile</span></button>',
        responsive: [
          {
            breakpoint: 860,
            settings: {
              slidesToShow: 2,
            }
          }
        ]
      });
    }
  }); // END DOC READY
})(jQuery);
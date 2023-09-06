// -------------------
// four-year-plan.js
// -------------------
(function($){
  $(document).ready(function() {
    if($(".four-year-plan__slider").length) {
      $(".four-year-plan__slider").slick({
        arrows: false,
        centerMode: false,
        dots: false,
        infinite: true,
        mobileFirst: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        responsive: [
          {
            breakpoint: 641,
            slidesToShow: 2,
          },
          {
            breakpoint: 769,
            settings: "unslick",
          }
        ]
      });
    }
  }); // END DOC READY
})(jQuery);
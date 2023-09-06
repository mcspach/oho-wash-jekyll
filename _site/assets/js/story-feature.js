// --------------------------------------------------
// discover-opportunities.js
// --------------------------------------------------
(function($){
  $(document).ready(function() {
    if($(".section--story-feature .story").length > 1) {
      $(".section--story-feature  .slider-row--stories").slick({
        arrows: true,
        centerMode: false,
        dots: false,
        infinite: true,
        mobileFirst: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        prevArrow: '<button type="button" class="slick-arrow story__slick-arrow slick-prev"><span class="show-for-sr">Previous Story</span></button>',
        nextArrow: '<button type="button" class="slick-arrow story__slick-arrow slick-next"><span class="show-for-sr">Next Story</span></button>',
        appendArrows: $(".story-arrow-container"),
      });
    }

    // ------- Adding classes to previos sections to the story feature for a more intuitive overlapping logic
    $(".section--story-feature").each(function() {
      $(this).prev("section").addClass("section--preceeds-story-feature js-processed--classing");
    });
    
    // Slider Arrows need to be positioned in relation to the photo.
    // Because the arrows need to be outside of the slides we have added
    // fake buttons within the slide media div that click the real buttons
    
    // check if there are enough slides to merrit this
    if($(".section--story-feature .slick-slide").length > 2) {
      
      // add buttons
      $(".story.slick-slide .story__media").append('<div class="story-arrow-container--fake js-processed"><button type="button" class="slick-arrow slick-prev slick-prev--fake" style=""><span class="show-for-sr">Previous Story</span></button><button type="button" class="slick-arrow slick-next slick-next--fake" style=""><span class="show-for-sr">Next Story</span></button></div>');
      
    }
    
    // clicking a fake button will click the real hidden buttons
    $(".slick-next--fake").on("click", function(){ $(this).parents(".section--story-feature").find(".story__slick-arrow.slick-next").click() });
    $(".slick-prev--fake").on("click", function(){ $(this).parents(".section--story-feature").find(".story__slick-arrow.slick-prev").click() });    
    
  }); // END DOC READY
})(jQuery);
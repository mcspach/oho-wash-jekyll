(function($){
  $(document).ready(function() {
    
    $('.more-or-less').append('  <div class="more-or-less__button-strip more-or-less__load-more"><button type="button" class="btn btn--teal"><div aria-hidden="true" class="far fa-arrow-alt-circle-down"></div><span>Show More<span></a></div>');

    
    $('.more-or-less__load-more .btn').click(function(){
      $(this).parents('.more-or-less').addClass('open');
      $(this).toggle();
      
      if ( $('.section--img-grid').length ) {
        $(this).parents('.section--img-grid').find('.lined-divide-container--center button').attr("tabindex","0");
        $(this).parents('.section--img-grid').find('.img-grid-item > a').attr("tabindex","0");
        $(this).parents('.section--img-grid').find('.img-grid-item-collection').attr("tabindex","0");
        $(this).parents('.section--img-grid').find('.img-grid-item-collection:first-child').focus();
      }      
      
    });    
    $('.more-or-less__fewer .btn').click(function(){
      var thisContainer = $(this).parents('.more-or-less');
      $(thisContainer).removeClass('open');
      $(thisContainer).delay(500).find('.more-or-less__load-more .btn').toggle();
      $('html, body').animate({
        scrollTop: $(thisContainer).offset().top - 100
      }, 500);
    });    
    
  });
})(jQuery);
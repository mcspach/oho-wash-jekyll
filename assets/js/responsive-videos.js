/*
  -----------------------
  Video Upload Class assignment for responsivity
  -----------------------
*/  
(function($){
  $(document).ready(function(){ 
    if($("iframe").not("#map").length) {
      $("iframe").each(function(){
        $(this).wrap('<div class="iframe-video-container js-processed"></div>');
      });
    }
  });
})(jQuery);
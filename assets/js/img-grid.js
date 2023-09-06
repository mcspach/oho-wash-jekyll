// ---------
// IMG GRID
// ---------
(function($) {
  $(document).ready(function() {
    initImgGrid();    
	
  	function initImgGrid() {
      var $grid = $('.img-grid'),
        $slider;
  
      if($grid.length) {
        
        // Wrap All IMG Grid Items in their own Div
        var $gridItem = $(".img-grid__selector");
        for(var i = 0; i < $gridItem.length; i+=3) {
          $gridItem.slice(i, i+3).wrapAll("<div class='img-grid-item-collection'></div>");
        }
/*
  			// init Isotope
        $grid = $grid.isotope({
  			  // options...
  			});
  			// layout Isotope after each image loads
  			$grid.imagesLoaded().progress( function() {
  			  $grid.isotope('layout');
  			});
*/
  	
        // Assign number labels
          $('.img-grid-item__toggle').each(function(i) {
            $(this).attr('data-grid-number', + (i+0));
          });
        $('.img-grid-item--slide').each(function(i) {
            $(this).attr('data-grid-number', + (i+0));
        });
  
        $slider = $(".img-grid-slider");
        if ($slider.length && !$slider.hasClass('slick-initialized')) {
          $slider.slick({
            arrows: true,
            dots: false,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            variableWidth: true,
            fade: true,
            responsive: [
              {
                breakpoint: 768,
                settings: {
                  variableWidth: false,
                  draggable: true,
                  arrows: true,
                  centerMode: false,
                  centerPadding: 'auto',
                  speed: 500,
                  fade: false,
                }
              }
            ]

          });
  
          // there are arrows intended to be in each slide,
          // Slick doesn't provide functionality for this
          // so we have faux buttons that click the real Slick Arrows buttons
          $(".img-grid-item--slide__nav button").on("click", function () {
            var label = $(this).attr("aria-label");
            $(this).parents(".img-grid-slider").find(".slick-arrow[aria-label=" + label + "]").click();
          });
  
          $(".img-grid-item__toggle").on("click", function (e) {
  
            e.preventDefault();
  
            // parse assigned grid-number attr
            var ImgGridNum = $(this).attr("data-grid-number");
            
            if($(this).attr("data-fancybox") == "") {
              $(".img-grid-slider").find("[data-grid-number='" + ImgGridNum + "'] a").click();
            }
  
            // slide to the correct position within the slider - and move focue
            $(".img-grid-slider").slick('slickGoTo', ImgGridNum);
            $(".img-grid-slider").find("[data-slick-index='" + ImgGridNum + "']").focus();
  
            // show the modal
            $(this).parents(".section--img-grid").addClass("modal-active").find(".modal").addClass("active");
            $(".site-header").addClass("header-modal-active");
          });
          // hide the modal and put focus on the first img grid item
          $(".modal-close").on("click", function() {
            $(this).parents(".modal").removeClass("active");
            $(".site-header").removeClass("header-modal-active");
          });
        }
  		}
  	}
  });
})(jQuery);
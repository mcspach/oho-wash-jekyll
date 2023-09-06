// ----------------------
// ACCORDION
// ----------------------
(function ($) {
	
	// call the function again after mobile init
	function accordion() {
		$(".accordion-drop-down__toggle").click(function(event) {
      event.preventDefault();
      // Hide the toggles for explore
      if($(this).hasClass("arrow-link--button") && $(window).width() > 769) {
        $(this).parents(".explore-grid-container").addClass("explore-grid-container--open");
        $(this).siblings(".accordion-drop-down__toggle").removeClass("accordion-drop-down__toggle--active");
        $(this).siblings(".accordion--open").slideUp();
      }
      // Hide the toggles for explore
      if($(this).parents("header") .length) {
        var thisAccordionContainer = $(this).parents(".accordion-container");
        $("header .accordion-drop-down__toggle--active").not($(this)).click();
      }
      // Hide Toggles for Concentrations Panel
      if($(this).hasClass("accordion-drop-down__toggle--concentrations") && $(window).width() > 769) {
        $(this).siblings(".accordion-drop-down__toggle").removeClass("accordion-drop-down__toggle--active");
        $(this).siblings(".accordion--open").slideUp();
      }
      $(this).toggleClass("accordion-drop-down__toggle--active");
      $(this).next().slideToggle().addClass("accordion--open");
      $(this).find('span').not(".arrow-link__link").text(function(i, v) {
        return v === 'Click to Open' ? 'Click to Close' : 'Click to Open'
      });
      $(this).addClass("accordion-init");      
    });
	} // ---------- End Accordion Core Function
	
	// ------ Mobile Only jQuery Plugin
	$.fn.accordionBuilder = function(accordionButtonText, containerClassModifier, buttonClassModifier, accordionIcon) {
		var $this = $(this),
		    attr = $this.attr('data-mobile-accordion-btn-text');

		// if there is a mobile value for text on the html we'll use that instead.
		if (typeof attr !== typeof undefined && attr !== false) {
  		var accordionButtonText = attr;
		}
		
		if(accordionIcon == "caret") {
      var accordionIconMarkup = '<svg version="1.1" class="accordion-drop-down__icon caret" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 18 18" style="enable-background:new 0 0 18 18;" xml:space="preserve"><path class="caret-path" d="M9,0C4,0,0,4,0,9s4,9,9,9s9-4,9-9S14,0,9,0z M9,16.3C5,16.3,1.7,13,1.7,9S5,1.7,9,1.7 S16.3,5,16.3,9S13,16.3,9,16.3z M12.1,6.8c-0.2,0-0.5,0.1-0.6,0.3l0,0L9,9.7L6.5,7l0,0C6.4,6.9,6.2,6.7,5.9,6.7 c-0.5,0-0.8,0.4-0.8,0.8c0,0.2,0.1,0.4,0.2,0.6l0,0l3.1,3.4c0.2,0.2,0.4,0.3,0.6,0.3c0.2,0,0.5-0.1,0.6-0.3l3.1-3.4l0,0 c0.1-0.2,0.2-0.3,0.2-0.6C12.9,7.1,12.6,6.8,12.1,6.8z"/></svg>';
		} else if (accordionIcon == "plus" || "plus-minus" || "minus") {
        var accordionIconMarkup = '<svg version="1.1" class="accordion-drop-down__icon plus" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 30 30" style="enable-background:new 0 0 30 30;" xml:space="preserve"><rect class="vertical" x="14" width="2" height="30"/><rect class="horizontal" y="14" width="30" height="2"/></svg>';
		}
		
		var accordionMarkup = '<button type="button" class="' + buttonClassModifier + '"><div>' + accordionButtonText + '</div><span class="show-for-sr">Click to Open</span>'+ accordionIconMarkup +'</button>';
		$this.wrap("<div class='accordion-container'></div>");
		if(!$this.hasClass("accordion-init")) {
  		$this.addClass("accordion-init");
  		$this.parents(".accordion-container").prepend(accordionMarkup).addClass(containerClassModifier);  		
    }
	};

	$(document).ready(function() {
		// Target Mobile Accordion Elements and add markup/classes
		$(".mobile-accordion").accordionBuilder('See More', "mobile-accordion-container--filter", "btn accordion-drop-down__toggle accordion-drop-down__toggle--mobile", "caret");

		$(".info-for").accordionBuilder('Information For', "info-for-accordion-container", "accordion-drop-down__toggle accordion-drop-down__toggle--info-for", "caret");
		
		$("#area-of-study").accordionBuilder('area of study name', "area-of-study-accordion-container", "accordion-drop-down__toggle accordion-drop-down__toggle--discover-opportunities", "caret");
		$("#learn-by-doing").accordionBuilder('learn by doing', "learn-by-doing-accordion-container", "accordion-drop-down__toggle accordion-drop-down__toggle--discover-opportunities", "caret");
		
		// ---- Explore Accordions		
		$(".explore-close").on("click", function() {
  		$(this).parents(".explore-panel").slideUp();
  		$(this).parents(".explore-grid-container").removeClass("explore-grid-container--open");
  		$(this).parents(".explore-grid-container").find(".accordion-drop-down__toggle--active").removeClass("accordion-drop-down__toggle--active");
		});
		
		// ---------- Listing Accordions
    // Stories
		$("#story-topics-criteria").accordionBuilder('All Story Topics', "filter-accordion-container", "accordion-drop-down__toggle accordion-drop-down__toggle--filter", "caret");
		$("#story-types-criteria").accordionBuilder('All Story Types', "filter-accordion-container", "accordion-drop-down__toggle accordion-drop-down__toggle--filter", "caret");
    // Directory
		$("#profile-types-criteria").accordionBuilder('All Profile Types', "filter-accordion-container", "accordion-drop-down__toggle accordion-drop-down__toggle--filter", "caret");
		$("#profile-departments-criteria").accordionBuilder('All Departments', "filter-accordion-container", "accordion-drop-down__toggle accordion-drop-down__toggle--filter", "caret");
    // Programs
		$("#program-areas-criteria").accordionBuilder('Areas of Study', "filter-accordion-container", "accordion-drop-down__toggle accordion-drop-down__toggle--filter", "caret");
    //  Section Navigation
		$(".section--navigation nav").accordionBuilder('More in This Section', "more-in-accordion-container", "accordion-drop-down__toggle accordion-drop-down__toggle--more-in", "plus");

		// Global Accordion Init
      	$(".accordion-drop-down__toggle").unbind("click"); // solves double firing and also single firing issues in Drupal after AJAX load
  			accordion();
		// ---------------------
		// ---------------------
		// Concentrations
    if($(".accordion-drop-down__toggle--concentrations").length) {
      $(".accordion-drop-down__toggle--concentrations").first().click();
    }	
	});
})(jQuery);

// --------------------------------------------------
// OHO-STICKY-HEADER.JS
// --------------------------------------------------

(function($) {
  $(document).ready(function(){

        window.addEventListener("load", function(){
          var cookieUrl = "http://wwww." + $(".cookie-compliance-popup").attr("data-url");
        window.cookieconsent.initialise({
          "container": document.getElementById("cookie-compliance-popup"),
          "palette": {
            "popup": {
              "background": "#cddfe1"
            },
            "button": {
              "background": "#7d092d"
            }
          },
          "theme": "classic",
          "content": {
            "message": "By using this website you consent to Washington College’s privacy policy.",
            "dismiss": "Dismiss",
            "link": "Review Privacy Policy",
            "href": cookieUrl
          }
        })
        $(".cc-banner > *").wrapAll("<div class='padded-row row'></div>");
      });
        
        //We Add our classes before we clone

        // Add .has-ul class to menu items with submenu children
        $(".navigation li:has(ul) > a").addClass("has-ul");

        // Add a button to toggle the child menu
        $(".navigation li:has(ul)").each(function(){
          
          // collect the text from the parent anchor
          var $parentText = $(this).children('a').text();
          
          // add a class to style width of anchor
          $(this).addClass("has-ul");
          
          // add the button
          var $ulChild = $(this).children('ul');
          
          $('<button type="button"><span>Open</span> the ' + $parentText + ' menu</button>').insertBefore( $ulChild );
        });

        // code in which we use buttons to toggle sub menus
        
        $('li.has-ul > button').click(function(){
          
          $(this).children('span').text(function(i, v){
            return v === 'Open' ? 'Close' : 'Open'
          })    
                
          $(this).toggleClass('engaged');
          $(this).next('ul.menu').slideToggle();
          
          if ($(window).width() > 1023){
            $(this).parent('li.has-ul').siblings('li.has-ul').find('ul.menu').hide();
            $(this).parent('li.has-ul').siblings('li.has-ul').find('button').removeClass('engaged');
          }
        });

        // Toggles between two strings
        // Used for changing mobile menu button text on click
        $.fn.toggleText = (function(t1, t2) {
          this.each(function() {
            var $this = $(this)
            if ($this.text() == t1) { $this.text(t2); }

            else { $this.text(t1); }

          })
          return this;
        });

        $('.hamburger-menu-wrapper').on('click', function() {
      		$(this).find(".hamburger-menu").toggleClass('animate');
      		$(".main-menu-container").slideToggle();
      	});

        // ------------------------------- Search toggle / Overlay Toggles
          //close them all
          $(".overlay__close").click(function(e) {
            $(".overlay").removeClass("active");
            e.preventDefault();
          });
          //search
          $(".search-toggle").click(function(e) {
            $(".header__search-overlay").addClass("active");
            e.preventDefault();
          });
				// ----------------------------------------
				// ------- STICKY HEADER FUNCTION
				// ----------------------------------------
					var $lastScrollTop = 0;
					ohoSticky = function($stickyTarget, $stickyItem, mediaQueryValue, directionalScrollReveal="false") {
		        var $stickyContainer = $($stickyTarget),
				        $stickyHeaderItem = $stickyContainer.find($stickyItem),
				        headerHeight = $stickyContainer.outerHeight(),
				        stickyItemOuterHeight = $stickyHeaderItem.outerHeight(),
				        headerMainOffsetTop = $stickyContainer.offset().top + $stickyContainer.outerHeight() - stickyItemOuterHeight;
				        
		        if($stickyContainer.attr("data-directional-scroll-reveal")  === "true" || directionalScrollReveal === "true") {
			        headerMainOffsetTop = headerMainOffsetTop + stickyItemOuterHeight;
			        directionalScrollReveal = true;
			      }

		        enquire.register("screen and (min-width:"+mediaQueryValue+")", {
		
		          match : function() {
								// -------------------------------------------------------
								// if we want to hide/show the header based on scroll direction
								// -------------------------------------------------------
								if(directionalScrollReveal) {
									// We are using the HTML attr in the CSS - if we're explicitly setting it to be true
									// we will make sure to add the ATTR to the HTML so we can use it
									if(!$stickyContainer.attr("data-directional-scroll-reveal") === "true" ) {
										$stickyContainer.attr("data-directional-scroll-reveal", "true");
									}
		              var $st = $(window).scrollTop();
		               if ($st > $lastScrollTop) {
		                 // downscroll code
		                 $stickyContainer.removeClass("sticky--scrolling-up");
		               } else {
		                // upscroll code
		                $stickyContainer.addClass("sticky--scrolling-up");
		               }
		               $lastScrollTop = $st;
								}
								
								
								// -------------------------------------------------------
		            // Conditions for when the $stickyHeaderItem should stick
								// -------------------------------------------------------
		            if ($(window).scrollTop() > headerMainOffsetTop && !$stickyContainer.hasClass("sticky")) {
		              $stickyContainer.addClass("sticky");
		              if($(".accordion-drop-down__toggle--search.accordion-drop-down__toggle--active").length) {
    		              $(".accordion-drop-down__toggle--search").click();
		              }
		              if($(".accordion-drop-down__toggle--info-for.accordion-drop-down__toggle--active").length) {
    		              $(".accordion-drop-down__toggle--info-for").click();
		              }
		            } else if ($(window).scrollTop() < headerMainOffsetTop && $stickyContainer.hasClass("sticky")) {
		              $stickyContainer.removeClass("sticky");
		              if($(".accordion-drop-down__toggle--info-for.accordion-drop-down__toggle--active").length) {
    		              $(".accordion-drop-down__toggle--info-for").click();
		              }
		            }
		            // -------------------------------------------------------
		          },
		
		          unmatch : function() {
		            $stickyContainer.removeClass("sticky");
		          },
		        });
		      };
				// ------- OHO STICKY INIT
				$("[data-sticky-container]").each(function() {
					var $this = $(this);
					ohoSticky($this, "[data-sticky-item]", "1025px");
					$(window).scroll(function() {
						ohoSticky($this, "[data-sticky-item]", "1025px");
					});
				});




    }); // Doc Ready
})(jQuery); // function

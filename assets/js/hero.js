// --------------------------------------------------
// hero-video.js
// --------------------------------------------------
(function($){
  $(document).ready(function(){

      // Opera 8.0+
      var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
      
      // Firefox 1.0+
      var isFirefox = typeof InstallTrigger !== 'undefined';
      
      // Safari 3.0+ "[object HTMLElementConstructor]" 
      var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
      
      // Internet Explorer 6-11
      var isIE = /*@cc_on!@*/false || !!document.documentMode;
      
      // Edge 20+
      var isEdge = !isIE && !!window.StyleMedia;
      
      // Chrome 1 - 71
      var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
      
      // Blink engine detection
      var isBlink = (isChrome || isOpera) && !!window.CSS;    

      // Edge is an unfortunate browser and our last resort for object fit is to target it directly using JS
      if(isEdge) { $("body").addClass("is-edge"); }

      // Establish parallax for both the video
      // and messaging components to create some depth.
       var parallaxScroll = function(){
            var scrolled = $(window).scrollTop(),
            	divOffset = $('.video-feature').scrollTop();
                            
              $('.hero--parallax .hero__media img, .hero--parallax video, .hero--parallax iframe').css('top',(-1-(scrolled*.090))+'px');
        }
        // We add autoplay if touch is disabled (Safest way to assume an internet connection)
        // --- additionally Safari does not support autoplay on any touch device
        if($(".hero--video").length && !$(".touchevents").length) {
          $(".hero video").attr("autoplay", "");
          $(".hero video")[0].play();
        }
        
        if(!$(".alert--site-wide, .touchevents").length) {
          if($(".hero--parallax").length) {
            // Establish parallax for both the video & Images
            $(window).bind("scroll", parallaxScroll);
          }
        }
        if($("#bgndVideo").length) {
          $("#bgndVideo").YTPlayer();
          
          // setting the video to "body" is the only way to toggle its parallax behavior
          // This makes it a direct child of the <body> and we still want it in its hero container
          $("#wrapper_bgndVideo").appendTo(".video-feature");
        }
  }); // END DOC READY
})(jQuery);
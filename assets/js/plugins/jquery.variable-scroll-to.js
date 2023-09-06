/**
 * @file
 * jQuery plugin to smooth scroll to an anchor,
 * with a speed relative to distance traveled.
 */
(function($) {

  /**
   * Variable scroll function.
   *
   * @param int offset (default: 0)
   *    An offset to add to the scroll target. Negative is up the page.
   * @param int maxDuration (default: 1000)
   *    The maximum duration of the scroll animation, in milliseconds.
   * @return bool
   *    True if the animation runs, false otherwise.
   */
  $.fn.variableScrollTo = function(offset = 0, maxDuration = 1000) {

    var $target = $(this),
      $page = $('html, body'),
      stopScrollEvents = 'scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove';

    if (1 !== $target.length) {
      return false;
    }

    var windowHeight = $(window).height(),
        documentHeight = $(document).height(),
        maxOffset = documentHeight - windowHeight,
        currentPosition = $(window).scrollTop(),
        targetPosition = $target.offset().top + offset,
        scrollDistance = Math.abs(currentPosition - targetPosition);
        calculatedSpeed = maxDuration * (scrollDistance / maxOffset);

    // Enforce the maximums. The speed/distance calculations
    // above don't take into account the document height.
    scrollDistance = Math.min(maxOffset, scrollDistance);
    calculatedSpeed = Math.min(maxDuration, calculatedSpeed);

    // Allow the stopping of scroll behaviors by events in the stopScrollEvents
    // variable. We don't want to continue scrolling if the user decides to
    // interact with the page. We also don't want to continue the current
    // animation if the user interacts with a new scroll animation before the
    // current animation is finished.
    $page.on(stopScrollEvents, function() {
      $page.stop();
    })

    $page.animate({
      scrollTop: targetPosition,
    }, calculatedSpeed, function() {
      $page.off(stopScrollEvents);
    });

    return true;
  }

})(jQuery);
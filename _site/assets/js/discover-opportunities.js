// --------------------------------------------------
// discover-opportunities.js
// --------------------------------------------------
(function($){
  $(document).ready(function(){
    var $accordion = $(".accordion-drop-down__toggle--discover-opportunities"),
        $areaOfStudyAccordion = $(".area-of-study-accordion-container .accordion-drop-down__toggle--discover-opportunities"),
        $learnByDoingAccordion = $(".learn-by-doing-accordion-container .accordion-drop-down__toggle--discover-opportunities"),
        $accordionOptions = $(".discover-opportunities__select a"),
        $modal = $(".discover-opportunities__modal");


        // Building the panelID
    		$.fn.panelIDBuilder = function() {
          var $this = $(this),
              selectionsMade = $("#discover-opportunities-container .selected").length,
              $optionsSelected = $("#discover-opportunities-container .option-selected"),
              combinedAttr = ''; $optionsSelected.each(function(index, element) {if ('' != combinedAttr) combinedAttr = combinedAttr  + '-'; combinedAttr = combinedAttr + $(element).attr('data-discover-opportunities-item-id');}),
                $accordionPanelID = $("[data-discover-opportunities-panel-id="+combinedAttr+"]");
          
          if(selectionsMade > 1) {
            $modal.not($accordionPanelID).slideUp();
            $accordionPanelID.slideDown();
          } else if (!$accordionPanelID.length) {
            $modal.slideUp();
          }
      
      	}; // ---------- End PanelID Builder
        
        // ------------ Reseting Interface
        function opportunitiesReset() {
          // Change Button Text back to its original state
          $areaOfStudyAccordion.find("div").text("area of study name");
          $learnByDoingAccordion.find("div").text("learn by doing");
          $modal.slideUp(200);
          $accordionOptions.removeClass("option-selected");
        }
        $(".discover-opportunities__modal__close").on("click", function() {
          opportunitiesReset();
        });
        // ----------- End Opportunities Reset

        // ---- What happens to each accordion when we click on an option
        $accordionOptions.on("click", function(e) {
          var $this = $(this),
              $accordionOptionID = $this.attr("data-discover-opportunities-item-id");
          
          // The links don't actually link anywhere
          e.preventDefault();
          
          // Reset Options Selected
          $this.parents("ul").find(".option-selected").removeClass("option-selected");
          
          // Change the button text to what is now selected
          $this.parents(".accordion-container").find("button div").text($this.text());
          // Click the accordion button to close
          $this.parents(".accordion-container").find("button.accordion-drop-down__toggle--active").click();
          // Show that we've made a selection on the container and current element
          $this.parents(".accordion-container").addClass('selected');
          $this.addClass('option-selected');
          
          $this.panelIDBuilder();
        });
        
        // Show a Random Selection
        $(".btn--random").on("click", function() {
        var randomStudy = Math.floor(Math.random()*$(".area-of-study-accordion-container li").length + 1),
            randomLearn = Math.floor(Math.random()*$(".learn-by-doing-accordion-container li").length + 1);

            $(".area-of-study-accordion-container li:nth-child("+randomStudy+") a").click();
            $(".learn-by-doing-accordion-container li:nth-child("+randomLearn+") a").click();

        });
  }); // END DOC READY
})(jQuery);
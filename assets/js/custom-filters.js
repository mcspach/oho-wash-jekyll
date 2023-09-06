(function($) {
  $(document).ready(function() {
    // -------------------------------------------
    // -------------------- LISTING FILTERS
    // -------------------------------------------

    // -------------------------------
    // GLOBAL VARS
    var topics = [],
        oneOfEachTopic = [],
        type = [],
        oneOfEachType = [],
        department = [],
        oneOfEachDepartment = [];


    // -------------------------------
    // FUNCTIONS

    /*
      A function used to loop through each topic,
      and wrap in appropriate markup
    */
    function checkboxBuilder(element, checkboxesLocation) {
      $.each(element, function(key, value) {
        var spacelessElement = value.replace(' ', ''),
            checkbox = '<div class="checkbox"><input type="checkbox" value="'+ value +'" name="'+ spacelessElement +'" id="'+ spacelessElement +'"><label for="'+ spacelessElement +'">' + value + '</label></div>';
        $(checkboxesLocation).append(checkbox);
      });
    };
            
    /*
      Parse the values from our JSON objects array,
      get only the items we're filtering on, and push them into new arrays
    */
    if($("#directory-filter").length) {    
      // --------- DIRECTORY
      $.each( directoryList, function(key, value) {
        // Departments
        for(var i = 0; i < value.department.length; i++) {
          if($.inArray(value.department[i], oneOfEachDepartment) === -1) {
            oneOfEachDepartment.push(value.department[i]);
          }
        }
        // Types
        for(var i = 0; i < value.type.length; i++) {
          if($.inArray(value.type[i], oneOfEachType) === -1) {
            oneOfEachType.push(value.type[i]);
          }
        }
      });
      // ----- INIT
      // Run the checkbox builder with our updated array without duplicates
      checkboxBuilder(oneOfEachDepartment, "#profile-departments-criteria");
      checkboxBuilder(oneOfEachType, "#profile-types-criteria");
    }
    if($("#story-filter").length) {
      // --------- STORY
      $.each( storyList, function(key, value) {
        // Topics
        for(var i = 0; i < value.topics.length; i++) {
          if($.inArray(value.topics[i], oneOfEachTopic) === -1) {
            oneOfEachTopic.push(value.topics[i]);
          }
        }
        // Types
        for(var i = 0; i < value.type.length; i++) {
          if($.inArray(value.type[i], oneOfEachType) === -1) {
            oneOfEachType.push(value.type[i]);
          }
        }
      });
      // ----- INIT
      // Run the checkbox builder with our updated array without duplicates
      checkboxBuilder(oneOfEachTopic, "#story-topics-criteria");
      checkboxBuilder(oneOfEachType, "#story-types-criteria");
    }
    // -------------------------------
    // BUILDING LISTING ELEMENTS AND FILTERING FUNCTIONALITY
    
    // ---------- STORY
    if($(".story-list").length) {    
      // Establish filters and location to put list items
      
      var FJSStories = FilterJS(storyList, '#storyList', {
        template: '#story-template',
        //filter_on_init: true,
        pagination: {
          container: '#pagination',
          visiblePages: 5,
          perPage: {
            values: [10, 20, 30],
            container: '#per_page'
          },
        },
      });
    
      FJSStories.addCriteria({field: 'topics', ele: '#story-topics-criteria input:checkbox'});
      FJSStories.addCriteria({field: 'type', ele: '#story-types-criteria input:checkbox'});
      window.FJSStories = FJSStories;
    }
    // ---------- DIRECTORY
    if($(".directory-list").length) {    
      
      // sort array to be alpha order by last name
      directoryList.sort(function(a, b) {
        var nameA = a.lastName.toUpperCase(); // ignore upper and lowercase
        var nameB = b.lastName.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      
        // names must be equal
        return 0;
      });

      // Establish filters and location to put list items
      var FJSDirectory = FilterJS(directoryList, '#directoryList', {
        template: '#directory-template',
        //filter_on_init: true,
        pagination: {
          container: '#pagination',
          visiblePages: 5,
          perPage: {
            values: [10, 20, 30],
            container: '#per_page'
          },
        },
        search: { ele: '#searchbox', start_length: 1, fields: ['firstName', 'lastName'] },
      });
    
      FJSDirectory.addCriteria({field: 'type', ele: '#profile-types-criteria input:checkbox'});
      FJSDirectory.addCriteria({field: 'department', ele: '#profile-departments-criteria input:checkbox'});
      window.FJSDirectory = FJSDirectory;
      
      $("#directory-submit").on("click", function(e) {
        e.preventDefault();
      })
    }
    // ---------- PROGRAMS
    // Building Dropdown 
    if($(".program-list").length) {
      var areasOfStudy = [],
          oneOfEachArea = [],
          oneOfEachLetter = [],
          $areaSelector = $('.area-of-study-item');
      
      $areaSelector.each(function() {
        var attr = $(this).attr("data-area-of-study");
        areasOfStudy.push(attr);
        for(var i = 0; i < areasOfStudy.length; i++) {
          if($.inArray(areasOfStudy[i], oneOfEachArea) === -1) {
            oneOfEachArea.push(areasOfStudy[i]);
          }
        }
      });
      checkboxBuilder(oneOfEachArea, "#program-areas-criteria");
      
      /*
      get first letter of each program and 
      add it to the data attr on the parent list item
      */
      $(".name-alpha").each(function() {
        var thisLetter = $(this).text().charAt(0);
        
        $(this).parents(".program-large-list").attr("data-letter", thisLetter);
        $(this).parents(".program-large-list").addClass("data-letter--" + thisLetter);
      });
      //Find the first instance of each letter and add a divider
      $("[data-letter]").each(function(index, element) {
        var $this = $(element),
            letter = $this.attr("data-letter"),
            letterMarkup = "<div class='letter-divider data-letter--" + letter +"'><div class='letter-divider__row'><h2>" + letter + "</h2></div></div>";


        if($.inArray(letter, oneOfEachLetter) === -1) {
          oneOfEachLetter.push(letter);          
          $(letterMarkup).insertBefore("[data-letter='" + letter + "']:first");
          $("[data-letter='" + letter + "']:last").addClass("program-large-list--last");
        }
        $this.appendTo(".letter-divider.data-letter--" + letter);
        
        //$("[data-letter='"+letter+"']").appendTo(".data-letter--" + letter + " .program-letter-listing-target");
      });
      
      
        // ----------- PROGRAM FILTERING
        $("#program-filter").on("change", function() {
          var areasAttr = $("#program-areas-criteria input:checked").val(),
              degreesChecked = $("#program-degree-criteria input:checked"),
              degreeAttr = degreesChecked.val(),
              activeSelector = '';
        
          // Unset All Active Filters.
          $(".program-large-list").removeAttr("data-filtered-by-area");
          $(".program-large-list").removeAttr("data-filtered-by-degree");
          $("#program-areas-criteria input").removeAttr("disabled");
        
          // we disable "unchecking" behavior
          $("#program-areas-criteria input:checked").attr("disabled", "");
        
          if ("undefined" !== typeof areasAttr) {
            $("[data-area-of-study='" + areasAttr + "']").parents(".program-large-list").attr("data-filtered-by-area", "true");
            activeSelector += "[data-filtered-by-area='true']";
          }
        
          // Only need to filter by degree if one and only one is active.
          degreesChecked.each(function(index, element){
            $("[data-" + $(element).val() + "]").parents(".program-large-list").attr("data-filtered-by-" + $(element).val(), "true");
            activeSelector += "[data-filtered-by-" + $(element).val() + "='true']"
          });
        
          $(".program-large-list").hide();
        
          // Hide and Show items with their data-filtered on attrs
          if ('' != activeSelector) {
            $(activeSelector).show();
          }
          else if (areasAttr == null && degreeAttr == null) {
            $(".program-large-list").show();
          }
          
          // If all letters in a section are hidden we should also hide the letter divider.
          $(".letter-divider").each(function(index, element) {
            var numberOfPrograms = $(element).find(".program-large-list").length,
                numberOfHiddenPrograms = $(element).find("[style='display: none;']").length;
            
            //console.log("Hidden programs: " +numberOfHiddenPrograms+ "  ||  All Programs " + numberOfPrograms + "Letter " + $(element).attr("class"));
            
            if(numberOfHiddenPrograms == numberOfPrograms) {
              $(element).hide();
            } else {
              $(element).show();
            }
          })
          
          // No results Message
            var totalNumberOfPrograms = $(".program-large-list").length,
                totalNumberOfHiddenPrograms = $(".program-large-list[style='display: none;']").length;

          // If the number of hidden programs is the same as there are porgrams you've got no results!      
          if(totalNumberOfPrograms === totalNumberOfHiddenPrograms) {
            $(".no-results").show();
          } else {
            $(".no-results").hide();
          }

      });
      
    }
    /*
    // -------------------------------
    // GLOBAL LISTING FUNCTIONS
    
      Our 3rd party filter.js lib does most of the
      filtering work for us, but needs to operate
      like a select list, below we refine the 
      interactions of a checkbox to behave like selects
    */    
    // If you click the top reset selection button
    $('.checkboxes-reset').on('click', function(e){
      $(this).parents("fieldset").find('input[type=checkbox]').prop('checked', false);
      /*
      We use classes on reset checkboxes because setting those to checked
      breaks our filtering since we do not have all array objects tagged as all
      */
      $(this).addClass("active");
    });    
    // Unselect siblings
    $(".filter input[type=checkbox]").on("change", function() {
      $(this).parents(".checkbox").siblings().find('input[type=checkbox]').prop('checked', false);
      $(this).parents(".checkbox").siblings().find('.checkboxes-reset').removeClass("active");
    });
    
    // Selecting from the options
    // ** note accordions are INIT within accordions.js
    $(".filter input[type=checkbox]").on("change", function() {
      var $this = $(this),
          newText = $this.siblings("label").text();

      // Change button text to newly selected text
      $this.parents(".accordion-container").find("button div").text(newText);
      // remove active classes and slide the content back up
      $this.parents(".accordion-container").find("button").removeClass("accordion-drop-down__toggle--active");
      $this.parents(".accordion--open").slideUp().removeClass("accordion--open");
    });
    
    // Reset Button for all filtering
    // for our makeshift select dropdowns
    $(".filter input").on("change", function() {
      var resetNumber = $(".checkboxes-reset").length;
      if($(".checkboxes-reset.active").length == resetNumber && $(".checkbox--single input:checked").length == 0) {
        $(".btn--reset").hide();
      } else {
        $(".btn--reset").show();
      }
    });
    $('#searchbox').on('input',function(){
      if( $(this).val().length === 0 ) {
        $(".btn--reset").hide();
      } else {
        $(".btn--reset").show();
      }
    });
    $('#searchbox').focusout(function() {
      if( $(this).val().length === 0 ) {
        $(".btn--reset").hide();
      } else {
        $(".btn--reset").show();
      }
    });
    
    // when you click the reset button
    $(".btn--reset").on("click", function() {
      // find all inputs and unset them
      $(this).parents(".filter").find(".checkboxes-reset").click();
      $(this).parents(".filter").find(".checkbox--single input").prop("checked", false);
      $(this).hide();
      
      if($(".program-list").length) {
        $(".program-large-list").removeAttr("data-filtered-by-area")
        $(".program-large-list").removeAttr("data-filtered-by-degree");
        $(".program-large-list").removeAttr("data-filtered");
        $(".program-large-list").show();
        $(".letter-divider").show();
        $(".filter input[type=checkbox]").prop('checked', false);
      }      
    });
  });  
})(jQuery); // function
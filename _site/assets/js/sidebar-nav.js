(function($){
  $(document).ready(function(){
    

  // define an ordinary expanded menu's anchor
  var subnavTrigger = $('.sidebar-menu ul.menu li.menu-item--expanded > a, .sidebar-menu--streamlined ul.menu li.menu-item--expanded > a');
  
  // define an active expanded menu's anchor
  var subnavActiveTrigger = $('.sidebar-menu ul.menu .active-trail, .sidebar-menu--streamlined ul.menu .active-trail > a');
  
  // insert a button to access the children of the anchor
  $('<button class="togglyBox" tabindex="0">Open the sub-menu</button>').insertAfter(subnavTrigger);
  
  // replace the text if it's the active page
  $(subnavActiveTrigger).siblings('.togglyBox').text('Close the sub-menu');
  
  // make Buttons active with open menus
  $(subnavActiveTrigger).addClass("engaged")
  
  // when you click the button, the anchor changes from plus to minus, the children are opened, and the text changes
  $(subnavTrigger).siblings('.togglyBox').click(function(){
    $(this).siblings(subnavTrigger).toggleClass('engaged');
    $(this).siblings('ul.menu').slideToggle();
    $(this).text(function(i, v){
      return v === 'Open the sub-menu' ? 'Close the sub-menu' : 'Open the sub-menu'
    })
  });

  // adds a separate class to change from minus to plus
  $(subnavActiveTrigger).each(function(){
    $(this).addClass('open');
    
  });
  
  // the active state needs this special change for the plus/minus
  $(subnavActiveTrigger).siblings('.togglyBox').click(function(){
    $(this).siblings(subnavActiveTrigger).toggleClass('open').toggleClass('closed');

  });

  
 }); // for jQuery 
})(jQuery);
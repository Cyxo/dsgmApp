$.UI = function($) {

  //Initialise
  function _init() {
    //Tree Test
    $(".ui-tree").each(function(index, element) {
      $(element).click(function() {
        alert("a ok!");
      });
    });
  }

  //Expose
  return {
    init: _init
  };

}(jQuery);
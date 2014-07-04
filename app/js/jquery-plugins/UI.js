$.UI = function($) {

  //Initialise
  function _init(identifier) {
    $("*[" + identifier + "]:not(*[data-no-translate])").each(function(index, element) {
      element = $(element);
      var elementType = element.attr(identifier);
      //Apply 'panel' class
      element.addClass("ui-panel");
      //Apply specific class
      element.addClass("ui-" + elementType);
    });
  }

  //Expose
  return {
    init: _init
  };

}(jQuery);
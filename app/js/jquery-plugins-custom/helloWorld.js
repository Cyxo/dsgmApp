$.helloWorld = function($) {

  function _run(path) {
    alert("This is the 'Hello World' jQuery plug-in.");
  }

  return {
    run: _run,
  };

}(jQuery);
function DSGMClass() {

  //Public variables
  var Options;
  var Language;

  //Construct
  async.waterfall([
    function(next) {
      Options = new OptionsClass(next);
    },
    function(next) {
      Language = new LanguageClass(Options.getOption("language"), next);
    },
    function(next) {
      //Translation
      $("*[data-role]").each(function(index, element) {
        element = $(element);
        if(element.attr("data-no-translate") == undefined){
          element.html(Language.getTerm(element.attr("data-role")));
        }
      });
      //UI
      $.UI.init();
    }
  ]);

  //javaLink Test
  $("#SayHiButton").click(function() {
    $.javaLink.request(
      "saySomething",
      "Hello, World",
      function(data) {
        console.log(data)
      }
    );
  });

}
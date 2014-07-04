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
        element.html(Language.getTerm(element.attr("data-role")));
      });
      //UI
      $.UI.init("data-ui");
    }
  ]);

  //jadaBox Test
  $("#SayHiButton").click(function() {
    $.jadaBox.request(
      "saySomething",
      "Hello, World",
      function(data) {
        $("#SayHiResponse").html(data);
      }
    );
  });

}
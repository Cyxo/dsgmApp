function DSGMClass() {

  //Public variables
  var Options;
  var Language;
  var UI;

  //Construct
  async.waterfall([
    function(next) {
      Options = new OptionsClass(next);
    },
    function(next) {
      Language = new LanguageClass(Options.getOption("language"), next);
    },
    function(next) {
      UI = new UIClass(next);
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
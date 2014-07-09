function DSGMClass() {

  var _self = this;

  //Construct
  async.waterfall([
    function(next) {
      _self.Options = new OptionsClass(next);
    },
    function(next) {
      _self.Language = new LanguageClass(_self.Options.getOption("language"), next);
    },
    function(next) {
      _self.UI = new UIClass(next);
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

  //Load Resource
  this.loadResource = function(name, rType) {
    console.log("name: " + name + ", type: " + rType);
    DSGM.UI.updateStatusBar("load a resource");
  }

}
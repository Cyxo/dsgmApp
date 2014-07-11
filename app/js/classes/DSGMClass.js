function DSGMClass() {

  var _self = this;

  async.waterfall([
    function(next) {
      _self.Options = new OptionsClass(next);
    },
    function(next) {
      _self.Language = new LanguageClass(_self.Options.getOption("language"), next);
    },
    function(next) {
      _self.UI = new UIClass(next);
    },
    function(next) {
      _self.Links = new LinksClass(next);
    },
    function(next) {
      //Block
      _self.UI.block(true, next);
    },
    function(next) {
      //Unblock
      _self.UI.block(false, next, true);
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
    console.log("Load Resource (name: " + name + ", type: " + rType + ")");
    var element = _self.UI.switchMainMarkup("resource");
    $("button", element).click(function() {
      new DialogueClass().askYesNoCancel("Do you want to save your changes?",
        "help",
        function() {
          console.log("(save)");
        },
        function() {
          console.log("(don't save)");
        },
        function() {
          console.log("(don't exit)");
        }
      );
    });
  }

}
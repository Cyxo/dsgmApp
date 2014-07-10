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

      //Iconification test
      //$("#Resource > div").html("<span data-icon=\"folder\"></span>");
      //_self.UI.iconify($($("#Resource > div > span")[0]));

      //Dialogue Test
      // $("#Tester").click(function() {
      //   async.waterfall([
      //     function(next2) {
      //       var marryDialogue = new DialogueClass("Will you marry me?", "heart", [
      //         new ButtonClass("Yes", "yes", next2),
      //         new ButtonClass("No", "no")
      //       ]);
      //       marryDialogue.show();
      //     },
      //     function(next2) {
      //       var crazyDialogue = new DialogueClass("Are you crazy!?", "info", [
      //         new ButtonClass("Yes", "yes"),
      //         new ButtonClass("No", "no")
      //       ]);
      //       crazyDialogue.show();
      //     }
      //   ]);
      // });

      //Dialogue Test
      $("#Tester").click(function() {
        new DialogueClass().askYesNoCancel("Do you want to save your changes?",
          "help",
          function() {
            alert("save.");
          },
          function() {
            alert("don't save.");
          },
          function() {
            alert("don't exit.");
          }
        );
      });

      next();
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
    console.log("name: " + name + ", type: " + rType);
    DSGM.UI.updateStatusBar("load a resource");
  }

}
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

      var resourcesTree = new TreeClass("resources-tree");
      $("main > aside").append(resourcesTree.getElement());
      var resourceTypesList = ["Sprite", "Object"];
      $.each(resourceTypesList, function(index, resourceTypeName) {
        var resourceItem = new TreeItemClass(resourceTypeName + "s", "folder");
        resourcesTree.addItem(resourceItem);
        for (var i = 1; i < 4; i++) {
          var resourceName = resourceTypeName + " " + i.toString();
          var resourceSubItem = new TreeItemClass(resourceName, resourceTypeName.toLowerCase());
          resourceSubItem.setAttr("resource-name", resourceName);
          resourceSubItem.setAttr("resource-type", resourceTypeName);
          resourceSubItem.setHandler(function(whichItem) {
            _self.loadResource(
              whichItem.getAttr("resource-name"),
              whichItem.getAttr("resource-type")
            );
          });
          resourceItem.addItem(resourceSubItem);
        }
      });

      next();

    },
    function(next) {
      //Unblock
      _self.UI.block(false, next, true);
    }
  ]);

  //Load Resource
  this.loadResource = function(name, rType) {
    console.log("Load Resource (name: " + name + ", type: " + rType + ")");
    var markupElement = _self.UI.switchMainMarkup("resource");
    // var newButton = new ButtonClass("Ask a Question", "heart");
    // newButton.setHandler(function() {
    //   new DialogueClass().askYesNoCancel("Do you want to save your changes?",
    //     "help",
    //     function() {
    //       console.log("(save)");
    //     },
    //     function() {
    //       console.log("(don't save)");
    //     },
    //     function() {
    //       console.log("(don't exit)");
    //     }
    //   );
    // });
    // $("> div", markupElement).append(newButton.getElement());
    var buttons = [];
    var button1 = new ButtonClass("Button 1", "info");
    var button2 = new ButtonClass("Button 2", "info");
    buttons.push(button1);
    buttons.push(button2);
    $("> div", markupElement).append(buttons[0].getElement());
    $("> div", markupElement).append(buttons[1].getElement());
    button1.setHandler(function(whichButton) {
      whichButton.setIcon("heart");
    });
    button2.setHandler(function(whichButton) {
      whichButton.setIcon("folder");
    });
  }

}
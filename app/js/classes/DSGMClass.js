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
      var resourceTypes = [
        "Sprite"
      ];
      $.each(resourceTypes, function(index, resourceType) {
        var resourceItem = new TreeItemClass(resourceType + "s", "folder");
        resourcesTree.addItem(resourceItem);
        var resourceSubItems = [];
        for (var i = 1; i < 4; i++) {
          var resourceName = resourceType + " " + i.toString();
          var resourceSubItem = new TreeItemClass(resourceName, resourceType.toLowerCase());
          resourceSubItem.setHandler(function(whichItem) {
            _self.loadResource(
              whichItem.getAttr("resource-name"),
              whichItem.getAttr("resource-type")
            );
          });
          resourceSubItem.setAttr("resource-name", resourceName);
          resourceSubItem.setAttr("resource-type", resourceType);
          resourceItem.addItem(resourceSubItem);
        }
      });
      $("main > aside").append(resourcesTree.getElement());

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
    var newButton = new ButtonClass("Ask a Question", "heart");
    newButton.setHandler(function() {
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
    $("> div", markupElement).append(newButton.getElement());
  }

}
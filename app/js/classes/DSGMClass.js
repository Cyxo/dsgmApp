function DSGMClass() {

  var _self = this;

  async.waterfall([
    function(next) {
      _self.ExtLink = new ExtLinkClass();
      _self.Options = new OptionsClass(next);
    },
    function(next) {
      _self.Language = new LanguageClass(_self.Options.getOption("language"), next);
    },
    function(next) {
      _self.UI = new UIClass(next);
    },
    function(next) {
      _self.Links = new LinksClass();
      //Block
      _self.UI.block(true, next);
    },
    function(next) {
      _self.UI.makeResourcesTree();
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
    var addSpriteButton = new ButtonClass("Button 1", "info");
    $("> div", markupElement).append(addSpriteButton.getElement());
    addSpriteButton.setHandler(function(whichButton) {
      _self.UI.resourcesTree.items[0].addItem(new TreeItemClass("Sprite X", "sprite"));
    });
  }

}
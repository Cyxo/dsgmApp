function DSGMClass() {

  var _self = this;

  async.waterfall([
    function(next) {
      _self.Command = new CommandClass("simulation");
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
      _self.UI.load(true, next);
    },
    function(next) {
      _self.UI.makeResourcesTree();
      _self.UI.makeDialogue();
      _self.UI.makeStatusBar();
      _self.Links.bindLinks(document.body);
      next();
    },
    function(next) {
      //Unblock
      _self.UI.load(false, next, true);
    }
  ]);

  //Load Resource
  this.loadResourceByNameAndType = function(name, rType) {
    async.waterfall([
      function(next) {
        _self.UI.startWork("Loading Resource", next);
      },
      function(next) {
        var markupElement = _self.UI.switchMainMarkup("resource");
        var addSpriteButton = new ButtonClass("Add a Sprite", "sprite");
        $("> div", markupElement).append(addSpriteButton.getElement());
        addSpriteButton.setHandler(function(whichButton) {
          _self.UI.resourcesTree.items[0].addItem(new TreeItemClass("A New Sprite", "sprite"));
        });
        //Simulate computation
        setTimeout(next, 1000);
      },
      function(next) {
        _self.UI.endWork(next);
      },
      function(next) {
        _self.UI.statusBar.setAlert("Resource Error", function() {
          _self.UI.Dialogue.showAlert(
            "There was a problem with this resource. Sorry.",
            function() {
              _self.UI.statusBar.clear();
            }
            );
        });
      }
    ]);
  }

}
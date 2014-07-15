function DSGMClass(commandHandler) {

  var _self = this;
  var commandHandler = (commandHandler ? commandHandler : "desktop");

  async.waterfall([
    function(next) {
      _self.Command = new CommandClass(commandHandler);
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
      //Make UI Controls
      _self.UI.makeResourcesTree();
      _self.UI.makeDialogue();
      _self.UI.makeStatusBar();
      //New Project
      _self.currentProject = new ProjectClass();
      //_self.currentProject.addResource("Sprite_1", "sprite");
      //_self.currentProject.addResource("Sprite_2", "sprite");
      //_self.currentProject.addResource("Background_1", "background");
      _self.UI.syncResourcesTree();
      //Bind Links
      _self.Links.bindLinks(document.body);
      //Next
      next();
    },
    function(next) {
      //Unblock
      _self.UI.load(false, next, true);
    }
  ]);

  //Load Resource
  this.loadResourceByNameAndType = function(name, type) {
    var resource = DSGM.currentProject.getResourceByNameAndType(name, type);
    console.log(resource);
    var markup = _self.UI.switchMainMarkup("resource-" + resource.type);
    var firstTabChanger = $($(".ui-tabs .ui-tabs-changer div", markup)[0]);
    $("span[data-role=resource-name]", firstTabChanger).html(resource.name);
    var firstTab = $($(".ui-tabs .ui-panel", markup)[0]);
    firstTab.html("(" + resource.name + " Properties)");
  }

}
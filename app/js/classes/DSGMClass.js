function DSGMClass(commandHandler) {

  var _self = this;
  if(commandHandler == undefined) {
    if(window.location.hash) {
      commandHandler = window.location.hash.substring(1);
    } else {
      commandHandler = "remote";
    }
  }

  async.waterfall([
    function(next) {
      _self.Links = new LinksClass();
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
      //Start Loading
      _self.UI.startWork("", false, next, _self.UI.workBlackoutFull);
    },
    function(next) {
      //Resources
      _self.Resources = new ResourcesClass();
      //Make UI Controls
      _self.UI.makeOrb();
      _self.UI.makeMainMenu();
      _self.UI.makeResourcesTree();
      _self.UI.makeDialogue();
      _self.UI.makeStatusBar();
      //New Project
      _self.currentProject = new ProjectClass();
      //Bind Links
      _self.Links.bindLinks(document.body);
      //Next
      next();
    },
    function(next) {
      //End Loading
      _self.UI.endWork(next);
    }
  ]);

  //Load Resource
  this.loadResourceByNameAndType = function(name, type) {
    var resource = DSGM.currentProject.getResourceByNameAndType(name, type);
    var markup = _self.UI.switchMainMarkup("resource-" + resource.type);
    var firstTabChanger = $($(".ui-tabs .ui-tabs-changer div", markup)[0]);
    $("span[data-role=resource-name]", firstTabChanger).html(resource.name);
    var firstTab = $($(".ui-tabs .ui-panel", markup)[0]);
    var firstTabP = $("> p", firstTab);
    firstTabP.html("(" + resource.name + " Properties)");
    //console.log(resource);
  }

}
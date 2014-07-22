function MenuHandlerClass(callback) {

  var _self = this;

  _self.copyResource = function(UIClass) {
    var selectedResource = UIClass.isResourceSelected();
    if (!selectedResource) return;
    MyApplication.currentProject.copyResource(selectedResource);
  }

  _self.deleteResource = function(UIClass) {
    var selectedResource = UIClass.isResourceSelected();
    if (!selectedResource) return;
    var response = UIClass.Dialogue.askYesNo(
      MyApplication.Language.getTerm("delete-are-you-sure", [selectedResource.name]),
      "alert",
      function() {
        MyApplication.currentProject.deleteResource(selectedResource);
      });
  }

  _self.about = function(UIClass) {
    var markup = UIClass.getMarkup("about");
    var aboutDialogue = new DialogueClass(markup, null, MyApplication.Language.getTerm("about-software"), [], 450, 520, true);
    aboutDialogue.show();
  }

  _self.options = function(UIClass) {
    var markup = UIClass.getMarkup("options");
    var optionsDialogue = new DialogueClass(markup, null, MyApplication.Language.getTerm("options"), [], 350, 450, true);
    optionsDialogue.show();
  }

}
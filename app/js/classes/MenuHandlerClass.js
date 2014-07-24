function MenuHandlerClass(callback) {

  var _self = this;

  _self.newProject = function(UIClass) {
    async.waterfall([
      function(next) {
        if (MyApplication.currentProject.changeMade) {
          UIClass.Dialogue.askYesNo(
            MyApplication.Language.getTerm("new-are-you-sure", [MyApplication.currentProject.name]),
            "alert",
            next
          );
        } else {
          next();
        }
      }, function(next) {
        MyApplication.currentProject = new ProjectClass();
      }
    ]);
  }

  _self.openProject = function(UIClass) {
    var projectIdentifier = MyApplication.Command.request("openProject", [], function(response) {

    });
    console.log(projectIdentifier);
  }

  _self.copyResource = function(UIClass) {
    var selectedResource = UIClass.isResourceSelected();
    if (!selectedResource) return;
    MyApplication.currentProject.copyResource(selectedResource);
  }

  _self.deleteResource = function(UIClass) {
    var selectedResource = UIClass.isResourceSelected();
    if (!selectedResource) return;
    UIClass.Dialogue.askYesNo(
      MyApplication.Language.getTerm("delete-are-you-sure", [selectedResource.name]),
      "alert",
      function() {
        MyApplication.currentProject.deleteResource(selectedResource);
      }
    );
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
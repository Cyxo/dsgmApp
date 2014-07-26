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
    //to do: error handling here
    var projectIdentifier;
    var projectString;
    async.waterfall([
      function(next) {
        MyApplication.Command.request("openProjectGetIdentifier", [], function(response) {
          projectIdentifier = response;
          next();
        });
      },
      function(next) {
        //console.log("project identifier: " + projectIdentifier);
        next();
      },
      function(next) {
        MyApplication.Command.request("openProjectGetStringFromIdentifier", [projectIdentifier], function(response) {
          projectString = response;
          next();
        });
      },
      function(next) {
        MyApplication.currentProject.openFromString(projectString);
      }
    ]);
  }

  _self.saveProject = function(UIClass) {
    if (MyApplication.currentProject.path.length == 0) {
      _self.saveProjectAs(UIClass);
      return; 
    }
  }

  _self.saveProjectAs = function(UIClass) {
    MyApplication.currentProject.save(null);
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
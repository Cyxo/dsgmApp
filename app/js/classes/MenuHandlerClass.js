function MenuHandlerClass(callback) {

  var _self = this;

  _self.newProject = function(UIClass) {
    async.waterfall([
      function(next) {
        if (MyApplication.currentProject.changeMade) {
          UIClass.DialogueHelper.askYesNo(
            MyApplication.Language.getTerm("new-are-you-sure", [MyApplication.currentProject.name]),
            "alert",
            next
          );
        } else {
          next();
        }
      }, function(next) {
        MyApplication.currentProject = new ProjectClass();
        MyApplication.Resources.influentialSelect();
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
        MyApplication.Resources.influentialSelect();
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

  _self.findResource = function(UIClass) {
    var findElement = UIClass.getMarkup("find-resource");
    findElement.empty();
    var findTextBox = new TextBoxClass("", null, MyApplication.Language.getTerm("resource"), true);
    findElement.append(findTextBox.getElement());
    var findDialogue = new DialogueClass(findElement, null, MyApplication.Language.getTerm("find-resource"), [], 372, null, true);
    findDialogue.buttons = [findDialogue.okButton, findDialogue.cancelButton];
    var findText;
    var findTextWritten = function() {
      if (findText.length == 0) return;
      var resource = MyApplication.currentProject.getResourceByNameAndType(findText, null, true);
      if (resource != undefined) {
        resource.getTreeItem().select();
      } else {
        UIClass.DialogueHelper.showAlert(MyApplication.Language.getTerm("find-resource-error", [findText]));
      }
    }
    findDialogue.buttons[0].setHandler(function() {
      findText = findTextBox.getText();
      findTextWritten();
    });
    findDialogue.buttons[1].setHandler(function() {
      findText = "";
      findTextWritten();
    });
    findDialogue.show(function() {
      findTextBox.focus();
    });
  }

  _self.copyResource = function(UIClass) {
    var selectedResource = UIClass.isResourceSelected();
    if (!selectedResource) return;
    MyApplication.currentProject.copyResource(selectedResource);
  }

  _self.deleteResource = function(UIClass) {
    var selectedResource = UIClass.isResourceSelected();
    if (!selectedResource) return;
    UIClass.DialogueHelper.askYesNo(
      MyApplication.Language.getTerm("delete-are-you-sure", [selectedResource.name]),
      "alert",
      function() {
        MyApplication.currentProject.deleteResource(selectedResource);
      }
    );
  }

  _self.about = function(UIClass) {
    var markup = UIClass.getMarkup("about");
    var aboutDialogue = new DialogueClass(markup, null, MyApplication.Language.getTerm("about-software"), [], 350, 450, true);
    aboutDialogue.show();
  }

  _self.options = function(UIClass) {
    var markup = UIClass.getMarkup("options");
    var optionsDialogue = new DialogueClass(markup, null, MyApplication.Language.getTerm("options"), [], 350, 450, true);
    optionsDialogue.show();
  }

}
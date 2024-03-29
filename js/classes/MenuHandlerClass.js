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
  
  _self.compileProject = function(UIClass) {
    MyApplication.currentProject.compile();
  }

  _self.findResource = function(UIClass) {
    MyApplication.UI.DialogueHelper.getInput(
      MyApplication.Language.getTerm("resource"),
      function(input) {
        if (input.length == 0) return;
        var resource = MyApplication.currentProject.getResourceByNameAndType(input, null, true);
        if (resource != undefined) {
          resource.getTreeItem().select();
        } else {
          UIClass.DialogueHelper.showAlert(MyApplication.Language.getTerm("find-resource-error", [input]));
        }
      }
    );
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

  _self.globalVariables = function(UIClass) {
    var variables = MyApplication.currentProject.globalVariables;
    var variablesContent = "";
    
    var markup = $("<div data-role=markup-global-variables></div>");
    markup.append(UIClass.getMarkup("global-variables-template").html());
    
    variablesContent += "<ul>";
    if(variables.length > 0) {
      for(var i = 0; i < variables.length; i++) {
        var variable = variables[i];
        variablesContent += "<li>" + variable.type + " " +variable.name + " = " + variable.defaultValue + "</li>";
      }
    }
    else {
      variablesContent += "No variables";
    }
    variablesContent += "</ul>";
    
    markup.prepend(variablesContent);
    
    var globalVariablesDialogue = new DialogueClass(markup, null, MyApplication.Language.getTerm("global-variables"), [], 350, 450, true);
    globalVariablesDialogue.show();
  }

}
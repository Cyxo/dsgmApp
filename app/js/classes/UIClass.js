function UIClass(callback) {

  var _self = this;
  _self.slowSpeed = 300;
  _self.genericSpeed = 200;
  _self.fastSpeed = 100;

  _self.colors = {
    "white": "white",
    "beige": "#EABE5C",
    "lightgray": "rgb(192, 192, 192)",
    "darkgray": "#999999",
    "blue": "#00B6FF",
    "brown": "#AE5900",
    "green": "#26D000",
    "red": "rgb(218, 0, 0)",
    "orange": "#FFC300",
    "pink": "#FF00FF",
    "teal": "00C278"
  };

  _self._icons = [
    {
      "name": "blank",
      "classes": "fa fa-fw",
      "color": _self.colors.white
    },
    {
      "name": "help",
      "classes": "fa fa-fw fa-question",
      "color": _self.colors.blue
    },
    {
      "name": "loading",
      "classes": "fa fa-refresh fa-spin",
      "color": _self.colors.blue
    },
    {
      "name": "alert",
      "classes": "fa fa-exclamation-triangle",
      "color": _self.colors.orange
    },
    //Menu
    {
      "name": "page",
      "classes": "fa fa-fw fa-file-o",
      "color": _self.colors.lightgray
    },
    {
      "name": "folder",
      "classes": "fa fa-fw fa-folder-o",
      "color": _self.colors.beige
    },
    {
      "name": "disk",
      "classes": "fa fa-fw fa-floppy-o",
      "color": _self.colors.blue
    },
    {
      "name": "cut",
      "classes": "fa fa-fw fa-scissors",
      "color": _self.colors.darkgray
    },
    {
      "name": "copy",
      "classes": "fa fa-fw fa-files-o",
      "color": _self.colors.lightgray
    },
    {
      "name": "paste",
      "classes": "fa fa-fw fa-clipboard",
      "color": _self.colors.brown
    },
    {
      "name": "play",
      "classes": "fa fa-fw fa-play",
      "color": _self.colors.green
    },
    {
      "name": "search",
      "classes": "fa fa-fw fa-search",
      "color": _self.colors.lightgray
    },
    {
      "name": "globe",
      "classes": "fa fa-fw fa-globe",
      "color": _self.colors.green
    },
    {
      "name": "info",
      "classes": "fa fa-fw fa-info",
      "color": _self.colors.blue
    },
    {
      "name": "wrench",
      "classes": "fa fa-fw fa-wrench",
      "color": _self.colors.lightgray
    },
    //Resources
    {
      "name": "sprite",
      "classes": "fa fa-fw fa-dribbble",
      "color": _self.colors.orange
    },
    {
      "name": "background",
      "classes": "fa fa-fw fa-picture-o",
      "color": _self.colors.pink
    },
    {
      "name": "object",
      "classes": "fa fa-fw fa-cube",
      "color": _self.colors.blue
    },
    {
      "name": "room",
      "classes": "fa fa-fw fa-square-o",
      "color": _self.colors.lightgray
    },
    {
      "name": "sound",
      "classes": "fa fa-fw fa-volume-up",
      "color": _self.colors.teal
    },
    //Misc
    {
      "name": "heart",
      "classes": "fa fa-fw fa-heart",
      "color": _self.colors.red
    },
    //Buttons
    {
      "name": "yes",
      "classes": "fa fa-fw fa-check",
      "color": _self.colors.green
    },
    {
      "name": "no",
      "classes": "fa fa-fw fa-ban",
      "color": _self.colors.red
    }
  ];

  //Loading (major UI progress)
  this.load = function(firstTime, callback, waitExtra) {
    if (waitExtra == undefined) waitExtra = false;
    if (firstTime) {
      callback();
      return;
    }
    if (waitExtra) {
      setTimeout(
        function() {
          $("#Loading").fadeToggle(callback);
        },
        500
      );
    } else {
      $("#Loading").fadeToggle(callback);
    }
  }

  //Working (minor UI progress)
  this.startWork = function(text, callback) {
    _self.statusBar.setWorking(text);
    $("#Working").fadeIn(callback);
  }
  this.endWork = function(callback) {
    _self.statusBar.clear();
    $("#Working").fadeOut(callback);
  }

  //Colors
  $("#Colors div").each(function(index, colorDiv) {
    var jColorDiv = $(colorDiv);
    var colorName = jColorDiv.attr("class");
    var colorValue = jColorDiv.css("backgroundColor");
    _self.colors[colorName] = colorValue;
  });
  this.getColor = function(name) {
    return _self.colors[name];
  }

  //Icons
  this.getIcon = function(name) {
    var icon = $.grep(_self._icons, function(iconElement) {
      return (iconElement.name == name);
    })[0];
    return icon;
  }
  this.iconify = function(element) {
    if (element.attr("data-icon") == undefined) return;
    var icon = _self.getIcon(element.attr("data-icon"));
    if (icon == undefined) icon = _self._icons[0];
    element.prepend("<span class=\"" + icon.classes + "\" style=\"color: " + icon.color + ";\"></span>");
  }
  $("*[data-icon]").each(function(index, element) {
    element = $(element);
    _self.iconify(element);
  });

  //Markup
  this.getMarkup = function(identifier) {
    var newElement = $($("*[data-role=markup-" + identifier + "]")[0]).clone();
    DSGM.Links.bindLinks(newElement);
    return newElement;
  }
  this.switchMainMarkup = function(identifier) {
    $("main > div").empty();
    var newElement = _self.getMarkup(identifier);
    newElement.appendTo($("main > div"));
    return newElement;
  }

  //Make Orb
  this.makeOrb = function() {
    _self.orb = new OrbClass();
    $("body > header").prepend(_self.orb.getElement());
  }

  //Make Resources Tree
  this.makeResourcesTree = function() {
    _self.resourcesTree = new TreeClass();
    $("body > main > aside").append(_self.resourcesTree.getElement());
    _self.resourcesTree.emptyItems();
    $.each(DSGM.Resources.getStaticResources(), function(index, staticResource) {
      var newItem = new TreeItemClass(staticResource.typePlural, "folder");
      _self.resourcesTree.addItem(newItem);
    });
  }

  this.makeMainMenu = function() {
    _self.mainMenu = new MenuClass();
    $("body > header > div > nav").append(_self.mainMenu.getElement());

    //Project
    var projectMenuItem = new MenuMasterItemClass(DSGM.Language.getTerm("project"));
    _self.mainMenu.addMasterItem(projectMenuItem);
      //Group 1
      var projectGroup1 = new MenuGroupClass();
      projectMenuItem.addGroup(projectGroup1);
        //New
        var newMenuItem = new MenuGroupItemClass(DSGM.Language.getTerm("new"), "page");
        projectGroup1.addItem(newMenuItem);
        //Open
        var openMenuItem = new MenuGroupItemClass(DSGM.Language.getTerm("open"), "folder");
        projectGroup1.addItem(openMenuItem);
        //Open Last Project
        var openLastProjectMenuItem = new MenuGroupItemClass(DSGM.Language.getTerm("open-last-project"));
        projectGroup1.addItem(openLastProjectMenuItem);
      //Group 2
      var projectGroup2 = new MenuGroupClass();
      projectMenuItem.addGroup(projectGroup2);
        //Test
        var testMenuItem = new MenuGroupItemClass(DSGM.Language.getTerm("test"), "play");
        projectGroup2.addItem(testMenuItem);
        //Compile
        var compileMenuItem = new MenuGroupItemClass(DSGM.Language.getTerm("compile"), "play");
        projectGroup2.addItem(compileMenuItem);
      //Group 3
      var projectGroup3 = new MenuGroupClass();
      projectMenuItem.addGroup(projectGroup3);
        //Test
        var saveMenuItem = new MenuGroupItemClass(DSGM.Language.getTerm("save"), "disk");
        projectGroup3.addItem(saveMenuItem);
        //Compile
        var saveAsMenuItem = new MenuGroupItemClass(DSGM.Language.getTerm("save-as"));
        projectGroup3.addItem(saveAsMenuItem);

    //Resources
    var resourcesMenuItem = new MenuMasterItemClass("Resources");
    _self.mainMenu.addMasterItem(resourcesMenuItem);
      //Group 1
      var resourcesGroup1 = new MenuGroupClass();
      resourcesMenuItem.addGroup(resourcesGroup1);
        //Copy
        var copyMenuItem = new MenuGroupItemClass(DSGM.Language.getTerm("copy-resource"), "copy");
        resourcesGroup1.addItem(copyMenuItem);
        //Delete
        var deleteMenuItem = new MenuGroupItemClass(DSGM.Language.getTerm("delete-resource"), "no");
        resourcesGroup1.addItem(deleteMenuItem);
      //Group 2
      var resourcesGroup2 = new MenuGroupClass();
      resourcesMenuItem.addGroup(resourcesGroup2);
        //Search
        var findMenuItem = new MenuGroupItemClass(DSGM.Language.getTerm("find-resource"), "search");
        resourcesGroup2.addItem(findMenuItem);
      //Group 3
      var resourcesGroup3 = new MenuGroupClass();
      resourcesMenuItem.addGroup(resourcesGroup3);
        //Add Resources
        $.each(DSGM.Resources.getStaticResources(), function(index, staticResource) {
          var newResourcesMenuItem = new MenuGroupItemClass(DSGM.Language.getTerm("add-" + staticResource.type), staticResource.icon);
          resourcesGroup3.addItem(newResourcesMenuItem);
          newResourcesMenuItem.setAttr("resource-type", staticResource.type);
          newResourcesMenuItem.setHandler(function() {
            DSGM.currentProject.addResource(null, this.getAttr("resource-type"), true);
          });
        });

    //Tools
    var toolsMenuItem = new MenuMasterItemClass("Tools");
    _self.mainMenu.addMasterItem(toolsMenuItem);
      //Group 1
      var toolsGroup1 = new MenuGroupClass();
      toolsMenuItem.addGroup(toolsGroup1);
        //Game Options
        var gameOptionsMenuItem = new MenuGroupItemClass(DSGM.Language.getTerm("game-options"), "wrench");
        toolsGroup1.addItem(gameOptionsMenuItem);
        //Global Variables
        var globalVariablesMenuItem = new MenuGroupItemClass(DSGM.Language.getTerm("global-variables"));
        toolsGroup1.addItem(globalVariablesMenuItem);
        //Global Structures
        var globalStructuresMenuItem = new MenuGroupItemClass(DSGM.Language.getTerm("global-structures"));
        toolsGroup1.addItem(globalStructuresMenuItem);
        //Global Arrays
        var globalArraysMenuItem = new MenuGroupItemClass(DSGM.Language.getTerm("global-arrays"));
        toolsGroup1.addItem(globalArraysMenuItem);
      //Group 2
      var toolsGroup2 = new MenuGroupClass();
      toolsMenuItem.addGroup(toolsGroup2);
        //Options
        var optionsMenuItem = new MenuGroupItemClass(DSGM.Language.getTerm("options"), "wrench");
        toolsGroup2.addItem(optionsMenuItem);
      //Group 3
      var toolsGroup3 = new MenuGroupClass();
      toolsMenuItem.addGroup(toolsGroup3);
        //Open Compile Folder
        var openCompileFolderMenuItem = new MenuGroupItemClass(DSGM.Language.getTerm("open-compile-folder"), "folder");
        toolsGroup3.addItem(openCompileFolderMenuItem);
        //Open Plugins Folder
        var openPluginsFolderMenuItem = new MenuGroupItemClass(DSGM.Language.getTerm("open-plugins-folder"), "folder");
        toolsGroup3.addItem(openPluginsFolderMenuItem);
      //Group 4
      var toolsGroup4 = new MenuGroupClass();
      toolsMenuItem.addGroup(toolsGroup4);
        //Action Editor
        var actionEditorMenuItem = new MenuGroupItemClass(DSGM.Language.getTerm("action-editor"));
        toolsGroup4.addItem(actionEditorMenuItem);
        //Font Viewer
        var fontViewerMenuItem = new MenuGroupItemClass(DSGM.Language.getTerm("font-viewer"));
        toolsGroup4.addItem(fontViewerMenuItem);
        //Launch Emulator
        var launchEmulatorMenuItem = new MenuGroupItemClass(DSGM.Language.getTerm("launch-emulator"));
        toolsGroup4.addItem(launchEmulatorMenuItem);
      //Group 5
      var toolsGroup5 = new MenuGroupClass();
      toolsMenuItem.addGroup(toolsGroup5);
        //Test
        var testMenuItem = new MenuGroupItemClass(DSGM.Language.getTerm("test"), "help");
        toolsGroup5.addItem(testMenuItem);

    //Help
    var helpMenuItem = new MenuMasterItemClass("Help");
    _self.mainMenu.addMasterItem(helpMenuItem);
      //Group 1
      var helpGroup1 = new MenuGroupClass();
      helpMenuItem.addGroup(helpGroup1);
        //Website
        var websiteMenuItem = new MenuGroupItemClass(DSGM.Language.getTerm("website"), "globe");
        helpGroup1.addItem(websiteMenuItem);
        //Forum
        var forumMenuItem = new MenuGroupItemClass(DSGM.Language.getTerm("forum"), "globe");
        helpGroup1.addItem(forumMenuItem);
        //Tutorials
        var tutorialsMenuItem = new MenuGroupItemClass(DSGM.Language.getTerm("tutorials"), "globe");
        helpGroup1.addItem(tutorialsMenuItem);
      //Group 2
      var helpGroup2 = new MenuGroupClass();
      helpMenuItem.addGroup(helpGroup2);
        //About
        var aboutMenuItem = new MenuGroupItemClass(DSGM.Language.getTerm("about"), "info");
        helpGroup2.addItem(aboutMenuItem);
        aboutMenuItem.setHandler(function() {
          var markup = _self.getMarkup("about");
          var aboutDialogue = new DialogueClass(markup, null, DSGM.Language.getTerm("about-ds-game-maker"), [], 450, 450, true);
          aboutDialogue.show();
        });
  }

  //Make Dialogue Singleton
  this.makeDialogue = function() {
    _self.Dialogue = new DialogueClass();
  }

  //Make Status Bar
  this.makeStatusBar = function() {
    _self.statusBar = new StatusBarClass();
    $(document.body).append(_self.statusBar.getElement());
  }

  //Drop Down Element
  _self.dropUpDown = function(isDown, topEl, subEl, dropFade, doAsync, fadeSpeed, dropSpeed, callback) {
    dropFade = (dropFade ? dropFade : false);
    doAsync = (doAsync ? doAsync : false);
    if (fadeSpeed === undefined) fadeSpeed = _self.genericSpeed;
    if (dropSpeed === undefined) dropSpeed = _self.genericSpeed;
    var topElFade = function(isDown, speed, callback) {
      topEl.stop().animate({
        backgroundColor: DSGM.UI.getColor(isDown ? "obvious" : "background-light")
      }, speed, callback);
    };
    var subElState = function(isDown, speed, doFade, callback) {
      subEl.stop();
      if (speed == 0) {
        if (isDown) subEl.show(); else subEl.hide();
      } else {
        if (!dropFade) {
          if (isDown)
            subEl.slideDown(dropSpeed, callback)
          else
            subEl.slideUp(dropSpeed, callback);
        } else {
          if (isDown)
            subEl.fadeIn(dropSpeed, callback)
          else
            subEl.fadeOut(dropSpeed, callback);
        }
      }
    }
    if (doAsync) {
      topElFade(isDown, fadeSpeed);
      subElState(isDown, dropSpeed, dropFade, callback);
    } else {
      async.waterfall([
        function(next) {
          topElFade(isDown, fadeSpeed, next);
        },
        function(next) {
          subElState(isDown, dropSpeed, dropFade, callback);
        },
      ]);
    }
  }

  _self.selectify = function(isSelected, element, doFade, backgroundColor, foregroundColor, speed) {
    if (doFade == undefined) doFade = false;
    var exteriorSpan = $("> span", element);
    var iconSpan = $("> span", exteriorSpan);
    var iconColor = _self.getIcon(exteriorSpan.attr("data-icon")).color;
    backgroundColor = (backgroundColor ? backgroundColor : DSGM.UI.getColor(!isSelected ? "foreground" : "obvious"));
    foregroundColor = (foregroundColor ? foregroundColor : DSGM.UI.getColor(!isSelected ? "foreground-invert" : "foreground"));
    if (speed === undefined) speed = _self.genericSpeed;
    if (isSelected) {
      element.addClass("selected");
      iconColor = foregroundColor;
    } else {
      element.removeClass("selected");
    }
    if (doFade) {
      exteriorSpan.stop().animate({
        backgroundColor: backgroundColor,
        color: foregroundColor
      }, speed);
      iconSpan.stop().animate({
        color: iconColor
      }, speed);
    } else {
      exteriorSpan.stop().css({"background-color": backgroundColor, "color": foregroundColor});
      iconSpan.stop().css("color", iconColor);
    }
  }

  callback();

}
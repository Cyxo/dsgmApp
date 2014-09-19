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
    "blue": "#0BB5FF",
    "brown": "#AE5900",
    "green": "#26D000",
    "red": "rgb(218, 0, 0)",
    "orange": "#FFC300",
    "pink": "#FF00FF",
    "teal": "#00C278"
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
      "classes": "fa fa-fw fa-square",
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

  //Icons
  this.getIcon = function(name) {
    var icon = $.grep(_self._icons, function(iconElement) {
      return (iconElement.name == name);
    })[0];
    return icon;
  }
  this.iconify = function(element, doChangeColor) {
    if (element.attr("data-icon") == undefined) return;
    var doChangeColor = doChangeColor;
    if (doChangeColor == undefined) doChangeColor = true;
    var icon = _self.getIcon(element.attr("data-icon"));
    if (icon == undefined) icon = _self._icons[0];
    element.prepend("<span class=\"" + icon.classes + "\"" + (doChangeColor ? " style=\"color: " + icon.color + ";\"" : "") + "></span>");
  }
  $("*[data-icon]").each(function(index, element) {
    element = $(element);
    _self.iconify(element);
  });

  //Working (minor UI progress)
  var iconP = $("#Work > div > p.icon");
  iconP.attr("data-icon", "loading");
  _self.iconify(iconP);
  _self.workBlackoutNone = 1;
  _self.workBlackoutDim = 2;
  _self.workBlackoutFull = 3;
  _self.workBlackoutExtent = null;
  _self.workUseStatusBar = false;
  this.startWork = function(work, useStatusBar, callback, blackoutExtent) {
    if (!work) work = "";
    if (work.length > 0) work = work + "...";
    var blackoutExtent = (blackoutExtent ? blackoutExtent : _self.workBlackoutDim);
    var useStatusBar = (useStatusBar == undefined ? true : useStatusBar);
    _self.workBlackoutExtent = blackoutExtent;
    _self.workUseStatusBar = useStatusBar;
    if (useStatusBar) {
      _self.statusBar.setText(work);
      _self.statusBar.setIcon("loading");
      $("#Work").addClass("show-status");
    } else {
      $("#Work > div > p span.text").html(work);
      $("#Work > div").show();
      $("#Work").removeClass("show-status");
    }
    switch(blackoutExtent) {
      case _self.workBlackoutNone:
        break;
      case _self.workBlackoutDim:
        $("#Work").fadeTo(_self.slowSpeed, 0.5, callback)
        break;
      case _self.workBlackoutFull:
        $("#Work").fadeTo(_self.slowSpeed, 1, callback)
        break;
    }
  }

  this.endWork = function(callback) {
    setTimeout(function() {
      if (_self.workUseStatusBar) {
        _self.statusBar.clear();
      }
      $("#Work").fadeOut(_self.slowSpeed, function() {
        $("#Work > div").hide();
        callback();
      });
    }, _self.slowSpeed * 2);
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

  //Markup
  this.getMarkup = function(identifier) {
    var newElement = $($("*[data-role=markup-" + identifier + "]")[0]).clone();
    MyApplication.Links.bindLinks(newElement);
    return newElement;
  }
  this.switchMainMarkup = function(identifier) {
    $("main > div").empty();
    var newElement = _self.getMarkup(identifier);
    $("main > div").append(newElement);
    return newElement;
  }

  //Blank Markup
  this.switchMainMarkup("blank");

  //Make Orb
  this.makeOrb = function() {
    _self.orb = new OrbClass();
    $("body > header").prepend(_self.orb.getElement());
  }

  //Make Resources Tree
  this.makeResourcesTree = function() {
    _self.resourcesTree = new TreeClass();
    $("body > main > aside").append(_self.resourcesTree.getElement());
    _self.resourcesTree.emptyItems(false);
    $.each(MyApplication.Resources.getStaticResources(), function(index, staticResource) {
      var newItem = new TreeItemClass(staticResource.typePlural, "folder");
      newItem.setAttr("resource-type", staticResource.type);
      _self.resourcesTree.addItem(newItem);
    });
  }

  this.makeMainMenu = function() {

    var menuHandler = new MenuHandlerClass();

    _self.mainMenu = new MenuClass();
    $("body > header > div > nav").append(_self.mainMenu.getElement());

    //Project
    var projectMenuItem = new MenuMasterItemClass(MyApplication.Language.getTerm("project"));
    _self.mainMenu.addMasterItem(projectMenuItem);
      //Group 1
      var projectGroup1 = new MenuGroupClass();
      projectMenuItem.addGroup(projectGroup1);
        //New
        var newMenuItem = new MenuGroupItemClass(MyApplication.Language.getTerm("new"), "page");
        projectGroup1.addItem(newMenuItem);
        newMenuItem.setHandler(function() {
          menuHandler.newProject(MyApplication.UI);
        });
        //Open
        var openMenuItem = new MenuGroupItemClass(MyApplication.Language.getTerm("open"), "folder");
        projectGroup1.addItem(openMenuItem);
        openMenuItem.setHandler(function() {
          menuHandler.openProject(MyApplication.UI);
        });
        //Save
        var saveMenuItem = new MenuGroupItemClass(MyApplication.Language.getTerm("save"), "disk");
        projectGroup1.addItem(saveMenuItem);
        saveMenuItem.setHandler(function() {
          menuHandler.saveProject();
        });
      //Group 2
      var projectGroup2 = new MenuGroupClass();
      projectMenuItem.addGroup(projectGroup2);
        //Test
        var testMenuItem = new MenuGroupItemClass(MyApplication.Language.getTerm("test"), "play");
        projectGroup2.addItem(testMenuItem);
        //Compile
        var compileMenuItem = new MenuGroupItemClass(MyApplication.Language.getTerm("compile"), "play");
        projectGroup2.addItem(compileMenuItem);
		compileMenuItem.setHandler(function() {
		  menuHandler.compileProject();
        });
      //Group 3
      var projectGroup3 = new MenuGroupClass();
      projectMenuItem.addGroup(projectGroup3);
        //Project Options
        var projectOptionsMenuItem = new MenuGroupItemClass(MyApplication.Language.getTerm("project-options"), "wrench");
        projectGroup3.addItem(projectOptionsMenuItem);
        //Global Variables
        var globalVariablesMenuItem = new MenuGroupItemClass(MyApplication.Language.getTerm("global-variables"));
        projectGroup3.addItem(globalVariablesMenuItem);
        //Global Structures
        var globalStructuresMenuItem = new MenuGroupItemClass(MyApplication.Language.getTerm("global-structures"));
        projectGroup3.addItem(globalStructuresMenuItem);
        //Global Arrays
        var globalArraysMenuItem = new MenuGroupItemClass(MyApplication.Language.getTerm("global-arrays"));
        projectGroup3.addItem(globalArraysMenuItem);


    //Resources
    var resourcesMenuItem = new MenuMasterItemClass(MyApplication.Language.getTerm("resources"));
    _self.mainMenu.addMasterItem(resourcesMenuItem);
      //Group 1
      var resourcesGroup1 = new MenuGroupClass();
      resourcesMenuItem.addGroup(resourcesGroup1);
        //Add Resources
        $.each(MyApplication.Resources.getStaticResources(), function(index, staticResource) {
          var newResourcesMenuItem = new MenuGroupItemClass(MyApplication.Language.getTerm("add-" + staticResource.type), staticResource.icon);
          resourcesGroup1.addItem(newResourcesMenuItem);
          newResourcesMenuItem.setAttr("resource-type", staticResource.type);
          newResourcesMenuItem.setHandler(function() {
            MyApplication.currentProject.addResourceByNameAndType(null, this.getAttr("resource-type"), true);
          });
        });
      //Group 2
      var resourcesGroup2 = new MenuGroupClass();
      resourcesMenuItem.addGroup(resourcesGroup2);
        //Find
        var findMenuItem = new MenuGroupItemClass(MyApplication.Language.getTerm("find-resource"), "search");
        resourcesGroup2.addItem(findMenuItem);
        findMenuItem.setHandler(function() {
          menuHandler.findResource(_self);
        });
      //Group 3
      var resourcesGroup3 = new MenuGroupClass();
      resourcesMenuItem.addGroup(resourcesGroup3);
        //Copy
        var copyMenuItem = new MenuGroupItemClass(MyApplication.Language.getTerm("copy-resource"), "copy");
        resourcesGroup3.addItem(copyMenuItem);
        copyMenuItem.setHandler(function() {
          menuHandler.copyResource(_self);
        });
        //Delete
        var deleteMenuItem = new MenuGroupItemClass(MyApplication.Language.getTerm("delete-resource"), "no");
        resourcesGroup3.addItem(deleteMenuItem);
        deleteMenuItem.setHandler(function() {
          menuHandler.deleteResource(_self);
        });

    //Tools
    var toolsMenuItem = new MenuMasterItemClass(MyApplication.Language.getTerm("tools"));
    _self.mainMenu.addMasterItem(toolsMenuItem);
      //Group 1
      var toolsGroup1 = new MenuGroupClass();
      toolsMenuItem.addGroup(toolsGroup1);
        //Options
        var optionsMenuItem = new MenuGroupItemClass(MyApplication.Language.getTerm("options"), "wrench");
        toolsGroup1.addItem(optionsMenuItem);
        optionsMenuItem.setHandler(function() {
          menuHandler.options(_self);
        });
      //Group 2
      var toolsGroup2 = new MenuGroupClass();
      toolsMenuItem.addGroup(toolsGroup2);
        //Open Compile Folder
        var openCompileFolderMenuItem = new MenuGroupItemClass(MyApplication.Language.getTerm("open-compile-folder"), "folder");
        toolsGroup2.addItem(openCompileFolderMenuItem);
        //Open Plugins Folder
        var openPluginsFolderMenuItem = new MenuGroupItemClass(MyApplication.Language.getTerm("open-plugins-folder"), "folder");
        toolsGroup2.addItem(openPluginsFolderMenuItem);
      //Group 3
      var toolsGroup3 = new MenuGroupClass();
      toolsMenuItem.addGroup(toolsGroup3);
        //Edit Actions
        var editActionsMenuItem = new MenuGroupItemClass(MyApplication.Language.getTerm("edit-actions"));
        toolsGroup3.addItem(editActionsMenuItem);
        //View Fonts
        var viewFontsMenuItem = new MenuGroupItemClass(MyApplication.Language.getTerm("view-fonts"));
        toolsGroup3.addItem(viewFontsMenuItem);
        //Start Emulator
        var startEmulatorMenuItem = new MenuGroupItemClass(MyApplication.Language.getTerm("start-emulator"));
        toolsGroup3.addItem(startEmulatorMenuItem);

    //Help
    var helpMenuItem = new MenuMasterItemClass(MyApplication.Language.getTerm("help"));
    _self.mainMenu.addMasterItem(helpMenuItem);
      //Group 1
      var helpGroup1 = new MenuGroupClass();
      helpMenuItem.addGroup(helpGroup1);
        //Website
        var websiteMenuItem = new MenuGroupItemClass(MyApplication.Language.getTerm("website"), "globe");
        helpGroup1.addItem(websiteMenuItem);
        websiteMenuItem.setHandler(function() {
          MyApplication.Links.goToLink("website");
        });
        //Forum
        var forumMenuItem = new MenuGroupItemClass(MyApplication.Language.getTerm("forum"), "globe");
        helpGroup1.addItem(forumMenuItem);
        forumMenuItem.setHandler(function() {
          MyApplication.Links.goToLink("forum");
        });
        //Tutorials
        var tutorialsMenuItem = new MenuGroupItemClass(MyApplication.Language.getTerm("tutorials"), "globe");
        helpGroup1.addItem(tutorialsMenuItem);
        tutorialsMenuItem.setHandler(function() {
          MyApplication.Links.goToLink("tutorials");
        });
      //Group 2
      var helpGroup2 = new MenuGroupClass();
      helpMenuItem.addGroup(helpGroup2);
        //About
        var aboutMenuItem = new MenuGroupItemClass(MyApplication.Language.getTerm("about-software"), "info");
        helpGroup2.addItem(aboutMenuItem);
        aboutMenuItem.setHandler(function() {
          menuHandler.about(_self);
        });
  }

  _self.makeUI = function() {
    _self.makeOrb();
    _self.makeMainMenu();
    _self.makeResourcesTree();
    _self.makeDialogueHelper();
    _self.makeStatusBar();
  }

  //Make Dialogue Helper Singleton
  this.makeDialogueHelper = function() {
    _self.DialogueHelper = new DialogueHelperClass();
  }

  //Make Status Bar
  this.makeStatusBar = function() {
    _self.statusBar = new StatusBarClass();
    $(document.body).append(_self.statusBar.getElement());
  }

  //Is Resource Selected?
  _self.isResourceSelected = function() {
    var selectedItem = _self.resourcesTree.selectedItem;
    if (!(selectedItem == null || !selectedItem.getAttr("resource-name"))) {
      var resourceName = selectedItem.getAttr("resource-name");
      var resourceType = selectedItem.getAttr("resource-type");
      var resource = MyApplication.currentProject.getResourceByNameAndType(resourceName, resourceType);
      return resource;
    } else {
      return false;
    }
  }

  //Drop Down Element
  _self.dropUpDown = function(isDown, topEl, subEl, dropFade, doAsync, fadeSpeed, dropSpeed, callback) {
    dropFade = (dropFade ? dropFade : false);
    doAsync = (doAsync ? doAsync : false);
    if (fadeSpeed === undefined) fadeSpeed = _self.genericSpeed;
    if (dropSpeed === undefined) dropSpeed = _self.genericSpeed;
    var topElFade = function(isDown, speed, callback) {
      var backgroundColor = _self.getColor(isDown ? "obvious" : "background-light");
      topEl.stop().animate({
        backgroundColor: backgroundColor
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
    backgroundColor = (backgroundColor ? backgroundColor : _self.getColor(!isSelected ? "foreground" : "obvious"));
    foregroundColor = (foregroundColor ? foregroundColor : _self.getColor(!isSelected ? "foreground-invert" : "foreground"));
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

  _self.bindBorderFocus = function(element) {
    element.unbind("focusin");
    element.bind("focusin", function() {
      var obviousColor = _self.getColor("obvious");
      element.stop().animate({
        borderColor: obviousColor,
      }, _self.slowSpeed);
    });
    element.unbind("focusout");
    element.bind("focusout", function() {
      var midGrayColor = _self.getColor("mid-gray");
      element.stop().animate({
        borderColor: midGrayColor,
      }, _self.slowSpeed);
    });
  }

  _self.setTitle = function(title, appendApplicationName) {
    var appendApplicationName = (appendApplicationName != undefined  ? appendApplicationName : true);
    MyApplication.Command.request("setTitle", [title, appendApplicationName])
  }

  callback();

}


var UIPrototype = function() {

  this.setAttr = function(attr, value) {
    this._element.attr("data-" + attr, value);
  }

  this.getAttr = function(attr) {
    return this._element.attr("data-" + attr);
  }

  this.getElement = function() {
    return this._element;
  }

  this.findItemsByAttr = function(attr, value) {
    return $.grep(this.items, function(item) {
      return (item.getAttr(attr) == value);
    });
  }

  this.findItemByAttr = function(attr, value) {
    var items = this.findItemsByAttr(attr, value);
    var item = (items.length == 0 ? null : items[0]);
    return item;
  }

  this.findItemsByProperty = function(property, value) {
    return $.grep(this.items, function(item) {
      return (item[property] == value);
    });
  }

  this.findItemByProperty = function(property, value) {
    var items = this.findItemsByProperty(property, value);
    var item = (items.length == 0 ? null : items[0]);
    return item;
  }

  this.removeItem = function(item) {
    var index = MyApplication.somethingToIndex(this.items, item);
    if (index == null) return false;
    this.items.splice(index, 1);
    this.refresh();
    return true;
  }

  this.addItems = function(items) {
    $.each(items, function(index, item) {
      this.addItem(item, false);
    });
    this.refresh();
  }

  this.emptyItems = function(doCallRefresh) {
    var doCallRefresh = (doCallRefresh != undefined ? doCallRefresh : true);
    this.items.length = 0;
    this.selectedItem = null;
    if (doCallRefresh) this.refresh();
  }

  this.setLabel = function(text) {
    var labelElement = $("> label", this._element);
    labelElement.empty();
    if (text) labelElement.html(text);
    labelElement.css("display", (text ? "block" : "none"));
  }

}
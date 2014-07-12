function UIClass(callback) {

  var _self = this;
  var _animation_speed = "fast";
  var _icons = [
    //UHelp
    {
      "name": "help",
      "classes": "fa fa-fw fa-question",
      "color": "#0094FF"
    },
    //Menu
    {
      "name": "page",
      "classes": "fa fa-fw fa-file-o",
      "color": "#EFEFEF"
    },
    {
      "name": "folder",
      "classes": "fa fa-fw fa-folder-o",
      "color": "#EABE5C"
    },
    {
      "name": "disk",
      "classes": "fa fa-fw fa-floppy-o",
      "color": "#0094FF"
    },
    {
      "name": "cut",
      "classes": "fa fa-fw fa-scissors",
      "color": "#999999"
    },
    {
      "name": "copy",
      "classes": "fa fa-fw fa-files-o",
      "color": "#EFEFEF"
    },
    {
      "name": "paste",
      "classes": "fa fa-fw fa-clipboard",
      "color": "#7F3300"
    },
    //Resources
    {
      "name": "sprite",
      "classes": "fa fa-fw fa-dribbble",
      "color": "#FFC300"
    },
    {
      "name": "object",
      "classes": "fa fa-fw fa-cube",
      "color": "#0010FF"
    },
    {
      "name": "room",
      "classes": "fa fa-fw fa-square-o",
      "color": "#577DA2"
    },
    //More
    {
      "name": "globe",
      "classes": "fa fa-fw fa-globe",
      "color": "#26D000"
    },
    {
      "name": "info",
      "classes": "fa fa-fw fa-info",
      "color": "#0094FF"
    },
    {
      "name": "heart",
      "classes": "fa fa-fw fa-heart",
      "color": "rgb(218, 0, 0)"
    },
    //Dialogues
    {
      "name": "yes",
      "classes": "fa fa-fw fa-check",
      "color": "#26D000"
    },
    {
      "name": "no",
      "classes": "fa fa-fw fa-ban",
      "color": "rgb(218, 0, 0)"
    }
  ];

  //Blocker (major UI progress)
  this.block = function(firstTime, callback, waitExtra) {
    if (waitExtra == undefined) waitExtra = false;
    if (firstTime) {
      callback();
      return;
    }
    if (waitExtra) {
      setTimeout(
        function() {
          $("#Blocker").fadeToggle(callback);
        },
        500
      );
    } else {
      $("#Blocker").fadeToggle(callback);
    }
  }

  //Update Status Bar
  this.updateStatusBar = function(status) {
    $("#StatusBar").html(status);
  }

  //Slide Toggle
  this.slideToggle = function(element) {
    element.slideToggle(_self.animation_speed);
  }

  //Icons
  this.iconify = function(element) {
    if (element.attr("data-icon") == undefined) return;
    var icon = $.grep(_icons, function(iconElement) {
      return (iconElement.name == element.attr("data-icon"));
    })[0];
    if (icon == undefined) icon = _icons[0];
    element.html("<span class=\"" + icon.classes + "\" style=\"color: " + icon.color + ";\"></span>" + element.html());
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

  //Resources Tree
  this.makeResourcesTree = function() {
    _self.resourcesTree = new TreeClass("resources-tree");
    $("main > aside").append(_self.resourcesTree.getElement());
    var resourceTypesList = ["Sprite", "Object"];
    $.each(resourceTypesList, function(index, resourceTypeName) {
      var resourceItem = new TreeItemClass(resourceTypeName + "s", "folder");
      _self.resourcesTree.addItem(resourceItem);
      for (var i = 1; i < 4; i++) {
        var resourceName = resourceTypeName + " " + i.toString();
        var resourceSubItem = new TreeItemClass(resourceName, resourceTypeName.toLowerCase());
        resourceSubItem.setAttr("resource-name", resourceName);
        resourceSubItem.setAttr("resource-type", resourceTypeName);
        resourceSubItem.setHandler(function(whichItem) {
          DSGM.loadResource(
            whichItem.getAttr("resource-name"),
            whichItem.getAttr("resource-type")
          );
        });
        resourceItem.addItem(resourceSubItem);
      }
    });
  }

  //(Menu) Help > Generic Links
  $("[data-role=help-menu]").siblings("ul").children().each(function(index, li) {
    var thisLi = $(li);
    if (!thisLi.attr("data-link-name")) return;
    thisLi.click(function() {
      DSGM.Links.goToLink($(this).attr("data-link-name"));
    });
  });

  //(Menu) Help > About
  $("[data-role=about]").click(function() {
    var markup = _self.getMarkup("about");
    var aboutDialogue = new DialogueClass(markup, null, [], 450, 450, true);
    aboutDialogue.show();
  });

  callback();

}
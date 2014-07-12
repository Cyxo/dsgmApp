function UIClass(callback) {

  var _self = this;
  var _animation_speed = "fast";

  var _icon_colors = {
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

  var _icons = [
    {
      "name": "blank",
      "classes": "fa fa-fw",
      "color": _icon_colors.white
    },
    {
      "name": "help",
      "classes": "fa fa-fw fa-question",
      "color": _icon_colors.blue
    },
    //Menu
    {
      "name": "page",
      "classes": "fa fa-fw fa-file-o",
      "color": _icon_colors.lightgray
    },
    {
      "name": "folder",
      "classes": "fa fa-fw fa-folder-o",
      "color": _icon_colors.beige
    },
    {
      "name": "disk",
      "classes": "fa fa-fw fa-floppy-o",
      "color": _icon_colors.blue
    },
    {
      "name": "cut",
      "classes": "fa fa-fw fa-scissors",
      "color": _icon_colors.darkgray
    },
    {
      "name": "copy",
      "classes": "fa fa-fw fa-files-o",
      "color": _icon_colors.lightgray
    },
    {
      "name": "paste",
      "classes": "fa fa-fw fa-clipboard",
      "color": _icon_colors.brown
    },
    {
      "name": "play",
      "classes": "fa fa-fw fa-play",
      "color": _icon_colors.green
    },
    {
      "name": "play-save",
      "classes": "fa fa-fw fa-play",
      "color": _icon_colors.green,
      "stack_classes": "fa fa-stack fa-floppy-o",
      "stack_color": _icon_colors.white
    },
    {
      "name": "search",
      "classes": "fa fa-fw fa-search",
      "color": _icon_colors.lightgray
    },
    {
      "name": "globe",
      "classes": "fa fa-fw fa-globe",
      "color": _icon_colors.green
    },
    {
      "name": "info",
      "classes": "fa fa-fw fa-info",
      "color": _icon_colors.blue
    },
    {
      "name": "wrench",
      "classes": "fa fa-fw fa-wrench",
      "color": _icon_colors.lightgray
    },
    //Resources
    {
      "name": "sprite",
      "classes": "fa fa-fw fa-dribbble",
      "color": _icon_colors.orange
    },
    {
      "name": "background",
      "classes": "fa fa-fw fa-picture-o",
      "color": _icon_colors.pink
    },
    {
      "name": "object",
      "classes": "fa fa-fw fa-cube",
      "color": _icon_colors.blue
    },
    {
      "name": "room",
      "classes": "fa fa-fw fa-square-o",
      "color": _icon_colors.lightgray
    },
    {
      "name": "sound",
      "classes": "fa fa-fw fa-volume-up",
      "color": _icon_colors.teal
    },
    //Misc
    {
      "name": "heart",
      "classes": "fa fa-fw fa-heart",
      "color": _icon_colors.red
    },
    //Buttons
    {
      "name": "yes",
      "classes": "fa fa-fw fa-check",
      "color": _icon_colors.green
    },
    {
      "name": "no",
      "classes": "fa fa-fw fa-ban",
      "color": _icon_colors.red
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
    var html = "<span class=\"" + icon.classes + "\" style=\"color: " + icon.color + ";\">";
    html += "</span>";
    // if (icon.stack_classes) {
    //   html += "<span class=\"" + icon.stack_classes + "\" style=\"color: " + icon.stack_color + ";\"></span>"
    // }
    element.html(html + element.html());
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

  //Dialogue Singleton
  this.makeDialogue = function() {
    _self.Dialogue = new DialogueClass();
  }

  //(Menu) Help > Generic Links
  $("[data-role=help-menu]").siblings("ul").children().each(function(index, li) {
    var thisLi = $(li);
    if (!thisLi.attr("data-link-name")) return;
    thisLi.click(function() {
      DSGM.Links.goToLink($(this).attr("data-link-name"));
    });
  });

  //(Menu) Tools > Test
  $("[data-role=test]").click(function() {
    var testDialogue = new DialogueClass();
    testDialogue.askYesNoCancel("You suck?");
  });

  //(Menu) Help > About
  $("[data-role=about]").click(function() {
    var markup = _self.getMarkup("about");
    var aboutDialogue = new DialogueClass(markup, null, [], 450, 450, true);
    aboutDialogue.show();
  });

  callback();

}
function UIClass(callback) {

  var _self = this;
  _self._animationSpeed = 250;

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

  var _icons = [
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

  //Slide Toggle
  this.slideToggle = function(element) {
    element.slideToggle(_self._animationSpeed);
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
  this.iconify = function(element) {
    if (element.attr("data-icon") == undefined) return;
    var icon = $.grep(_icons, function(iconElement) {
      return (iconElement.name == element.attr("data-icon"));
    })[0];
    if (icon == undefined) icon = _icons[0];
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

  //Make Dialogue Singleton
  this.makeDialogue = function() {
    _self.Dialogue = new DialogueClass();
  }

  //Make Status Bar
  this.makeStatusBar = function() {
    _self.statusBar = new StatusBarClass();
    $(document.body).append(_self.statusBar.getElement());
  }

  //(Menu) Resources > Add Sprite
  $("*[data-role=add-sprite]").click(function() {
    var newResource = DSGM.currentProject.addResource(null, "sprite", true);
  });

  //(Menu) Resources > Add Background
  $("*[data-role=add-background]").click(function() {
    var newResource = DSGM.currentProject.addResource(null, "background", true);
  });

  //(Menu) Tools > Test
  $("[data-role=test]").click(function() {
    var testDialogue = new DialogueClass();
    // testDialogue.askYesNoCancel("Print the names of the developers?", "help", function() {
    //   DSGM.Command.request("print", ["James Garner", "Chris Ertl"], function(){});
    // });
    testDialogue.showAlert("It's not going well.");
  });

  //(Menu) Help > About
  $("[data-role=about]").click(function() {
    var markup = _self.getMarkup("about");
    var aboutDialogue = new DialogueClass(markup, null, DSGM.Language.getTerm("about-ds-game-maker"), [], 450, 450, true);
    aboutDialogue.show();
  });

  callback();

}
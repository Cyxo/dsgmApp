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

  //Selection Helper
  this.selectify = function(selector, callback, clickMode, index) {
    if (clickMode == undefined) clickMode = true;
    if (clickMode) {
      $(selector).click(function() {
        $(selector).removeClass("selected");
        $(this).addClass("selected");
        callback($(this));
      });
    } else {
      $(selector).removeClass("selected");
      var t = $($(selector)[index]);
      t.addClass("selected");
      callback(t);
    }
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

  //Tree
  this.selectify(".ui-tree li > span", function(thisSpan) {
    if (thisSpan.parent().parent().attr("data-role") == "resources-list") {
      thisSpan.siblings("ul").slideToggle(_animation_speed);
    }
  });

  //Resources Tree
  $("*[data-role=resources-list] li > span").click(function () {
    var thisSpan = $(this);
    var thisUl = thisSpan.parent().parent();
    if (thisUl.attr("data-resource-type") == undefined) return;
    DSGM.loadResource($(thisSpan.children()[1]).html(), thisUl.attr("data-resource-type"));
  });

  //Tabs
  this.selectifyTab = function(index) {
    _self.selectify(
      ".ui-tabs .ui-panel",
      function(tabElement) {
        tabElement.removeClass("no-corner");
        if (index == 0) tabElement.addClass("no-corner");
      },
      false,
      index
    );
  }
  _self.selectifyTab(0);
  _self.selectify(".ui-tabs .ui-tabs-changer div", function(tabChangerElement) {
    _self.selectifyTab(tabChangerElement.index());
  });

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
    new DialogueClass().showInfo("DS Game Maker rocks, period.");
  });

  callback();

}
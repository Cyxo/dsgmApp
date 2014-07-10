function UIClass(callback) {

  var _self = this;
  var _animation_speed = "medium";
  var _icons = [
    //Unknown
    {
      "name": "unknown",
      "classes": "fa fa-fw fa-question",
      "color": "black"
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
      "color": "skyblue"
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
      "color": "rgb(158, 125, 0)"
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
      "color": "rgb(32, 255, 32)"
    },
    {
      "name": "info",
      "classes": "fa fa-fw fa-info",
      "color": "skyblue"
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

  this.iconify = function(element) {
    var icon = $.grep(_icons, function(iconElement) {
      return (iconElement.name == element.attr("data-icon"));
    })[0];
    if (icon == undefined) icon = _icons[0];
    element.html("<span class=\"" + icon.classes + "\" style=\"color: " + icon.color + ";\"></span>" + element.html());
  }

  //Icons
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
  //$("[data-role=about]")

  //Callback
  callback();

}
function UIClass(callback) {

  var _self = this;
  var _animation_speed = "medium";
  var _icons = [
    {
      "name": "unknown",
      "classes": "fa fa-question",
      "color": "black"
    },
    {
      "name": "folder",
      "classes": "fa fa-folder",
      "color": "#EABE5C"
    },
    {
      "name": "sprite",
      "classes": "fa fa-dribbble",
      "color": "#FFC300"
    },
    {
      "name": "object",
      "classes": "fa fa-cube",
      "color": "#0010FF"
    },
    {
      "name": "room",
      "classes": "fa fa-square-o",
      "color": "#577DA2"
    }
  ];

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
  $("*[data-icon]").each(function(index, element) {
    element = $(element);
    var icon = $.grep(_icons, function(iconElement) {
      return (iconElement.name == element.attr("data-icon"));
    })[0];
    if (icon == undefined) icon = _icons[0];
    element.html("<span class=\"" + icon.classes + "\" style=\"color: " + icon.color + ";\"></span>" + element.html());
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

  //Callback
  callback();

}
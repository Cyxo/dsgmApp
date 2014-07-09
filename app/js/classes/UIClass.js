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
  $(".ui-tree li > span").click(function() {
    var thisSpan = $(this);
    if (thisSpan.parent().parent().attr("data-role") == "resources-list") {
      thisSpan.siblings("ul").slideToggle(_animation_speed);
    }
    $(".ui-tree li > span").removeClass("selected");
    $(this).addClass("selected");
  });

  //Resources Tree
  $("*[data-role=resources-list] li > span").click(function () {
    var thisSpan = $(this);
    var thisUl = thisSpan.parent().parent();
    if (thisUl.attr("data-resource-type") == undefined) return;
    DSGM.loadResource($(thisSpan.children()[1]).html(), thisUl.attr("data-resource-type"));
  });

  //Callback
  callback();

}
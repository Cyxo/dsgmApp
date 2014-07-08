function UIClass(callback) {

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
    $(".ui-tree li > span").removeClass("selected");
    var element = $(this);
    element.addClass("selected");
  });

  callback();

}
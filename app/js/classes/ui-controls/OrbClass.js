function OrbClass() {

  var _self = this;
  _self._element = null;
  _self.items = [];

  _self.makeElement = function() {
    var s = "";
    s += "<div class=\"ui ui-orb\">";
    s += "  <div class=\"colors\"></div>";
    s += "  <div>";
    s += "    <img src=\"img/orb.png\" alt=\"Orb\">";
    s += "    <div class=\"content\"><div>&nbsp;</div></div>"
    s += "  </div>";
    s += "</div>";
    var element = $(s);
    element.bind("mouseenter", function() {
      var hoverColor = $("> .colors", $(this)).css("color");
      $(this).css("background-color", hoverColor);
      $(".content", $(this)).css("visibility", "visible");
    });
    element.bind("mouseleave", function() {
      var originalColor = $("> .colors", $(this)).css("background-color");
      $(this).css("background-color", originalColor);
      $(".content", $(this)).css("visibility", "hidden");
    });
    return element;
  }

  _self.refresh = function() {
  }

  _self._element = _self.makeElement();
  _self.refresh();

  _self.getElement = function() {
    return _self._element;
  }

}
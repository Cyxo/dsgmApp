function OrbClass() {

  var _self = this;
  _self._element = null;
  _self.items = [];

  _self.makeElement = function() {
    var s = "";
    s += "<div class=\"ui ui-orb\">";
    s += "  <div>";
    s += "    <img src=\"img/orb.png\" alt=\"Orb\">";
    s += "    <div><div>&nbsp;</div></div>"
    s += "  </div>";
    s += "</div>";
    var element = $(s);
    element.bind("mouseenter", function() {
      MyApplication.UI.dropUpDown(true, $("> div > img", this), $("> div > div", $(this)));
    });
    element.bind("mouseleave", function() {
      MyApplication.UI.dropUpDown(false, $("> div > img", this), $("> div > div", $(this)));
    });
    return element;
  }

  _self.refresh = function() {
  }

  _self._element = _self.makeElement();
  _self.refresh();

}
OrbClass.prototype = new UIPrototype();
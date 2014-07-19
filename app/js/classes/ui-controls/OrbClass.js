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
      var el = $(this);
      async.waterfall([
        function(next) {
          el
            .stop()
            .animate({
                backgroundColor: DSGM.UI.getColor("obvious")
              }, DSGM.UI._animationSpeed, next);
        },
        function(next) {
          $("> div > div", el)
            .stop()
            .slideDown(DSGM.UI._animationSpeed);
        }
      ]);
    });
    element.bind("mouseleave", function() {
      var el = $(this);
      async.waterfall([
        function(next) {
          $("> div > div", el)
            .stop()
            .slideUp(DSGM.UI._animationSpeed, next)
        },
        function(next) {
          el
            .stop()
            .animate({
              backgroundColor: DSGM.UI.getColor("background-light")
            }, DSGM.UI._animationSpeed);
        }
      ]);
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
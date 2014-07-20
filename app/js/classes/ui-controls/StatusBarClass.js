function StatusBarClass() {

  var _self = this;
  _self._element = null;
  _self.text = "";
  _self.icon = null;

  _self.setHandler = function(handler) {
    _self.handler = handler;
    _self._element.unbind("click");
    _self._element.bind("click", function() {
      handler(_self);
    });
  }

  _self.makeElement = function() {
    var s = "<footer class=\"ui ui-status-bar\"></footer>";
    var element = $(s);
    return element;
  }

  _self.refresh = function() {
    _self._element.attr("data-icon", (_self.icon ? _self.icon : ""));
    _self._element.html(_self.text);
    DSGM.UI.iconify(_self._element);
  }

  _self._element = _self.makeElement();
  _self.refresh();

  _self.setText = function(text) {
    _self.text = text;
    _self.refresh();
  }

  _self.setIcon = function(icon) {
    _self.icon = icon;
    _self.refresh();
  }

  _self.setAlert = function(text, handler) {
    _self.icon = "alert";
    _self.text = text;
    if (handler) _self.setHandler(handler);
    _self.refresh();
  }

  _self.clear = function() {
    _self.text = "";
    _self.icon = null;
    _self.refresh();
  }

}
StatusBarClass.prototype = new UIPrototype();
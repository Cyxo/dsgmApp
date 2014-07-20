function ButtonClass(text, icon, handler) {

  var _self = this;
  _self._element = null;
  _self.text = (text || "Button");
  _self.icon = (icon || null);

  _self.setHandler = function(handler) {
    _self.handler = handler;
    _self._element.unbind("click");
    _self._element.bind("click", function() {
      handler(_self);
    });
  }

  _self.makeElement = function() {
    var s = "<button></button>";
    var element = $(s);
    return element;
  }

  _self.refresh = function() {
    if(_self.icon) _self._element.attr("data-icon", _self.icon);
    _self._element.html(_self.text);
    DSGM.UI.iconify(_self._element);
  }

  _self._element = _self.makeElement();
  _self.refresh();
  if(handler) _self.setHandler(handler);

  _self.setText = function(text) {
    _self.text = text;
    _self.refresh();
  }

  _self.setIcon = function(icon) {
    _self.icon = icon;
    _self.refresh();
  }

}
ButtonClass.prototype = new UIPrototype();
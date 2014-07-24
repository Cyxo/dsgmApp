function TextBoxClass(text, handler, label, handleImmediately) {

  var _self = this;
  _self._element = null;
  _self.handler = null;
  _self.handleImmediately = (handleImmediately ? _self.handleImmediately : false);

  _self.getInnerInput = function() {
    return $("> input", _self._element);
  }

  _self.setHandler = function(handler) {
    if (handler) {
      _self.handler = handler;
      var typeName = (_self.handleImmediately ? "keyup" : "blur");
      _self.getInnerInput().unbind(typeName);
      _self.getInnerInput().bind(typeName, function() {
        _self.text = $(this).val();
        _self.handler(_self.text);
      });
      MyApplication.UI.bindBorderFocus(_self.getInnerInput());
    }
  }

  _self.makeElement = function() {
    var s = "<div class=\"ui-form-control\"><label class=\"indent\"></label><input type=\"text\"></div>";
    var element = $(s);
    return element;
  }

  _self.refresh = function() {
    _self.getInnerInput().val(_self.text);
  }

  _self._element = _self.makeElement();
  _self.setHandler(handler);

  _self.setText = function(text) {
    _self.text = text;
    _self.refresh();
    if (_self.handler) _self.handler(text);
  }

  _self.getText = function(text) {
    return _self.text;
  }

  _self.error = false;
  _self.setError = function(error) {
    if (error != _self.error) {
      var borderColor = MyApplication.UI.getColor((error ? "red" : "mid-gray"));
      var textColor = MyApplication.UI.getColor((error ? "red" : "foreground-invert"));
      _self.getInnerInput().animate({
        borderColor: borderColor,
        color: textColor
      }, MyApplication.UI.slowSpeed);
    }
    _self.error = error;
  }

  _self.focus = function() {
    _self.getInnerInput().focus();
  }

  var text = (text || "");
  _self.setText(text);
  var label = (label || null);
  _self.setLabel(label);

}
TextBoxClass.prototype = new UIPrototype();
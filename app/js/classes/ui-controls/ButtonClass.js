function ButtonClass(text, icon, handler) {

  var _self = this;
  _self._element = null;
  _self.text = (text || "Button");
  _self.icon = (icon || null);
  _self.hasBeenClicked = false;

  _self.setHandler = function(handler) {
    _self.handler = handler;
    _self._element.unbind("mouseenter");
    _self._element.bind("mouseenter", function() {
      if (_self.hasBeenClicked) return;
      var buttonElement = $(this);
      var foregroundColor = MyApplication.UI.getColor("foreground");
      buttonElement.stop().animate({
        borderColor: foregroundColor
      }, MyApplication.UI.genericSpeed);
      // var iconElement = $("> span.fa", buttonElement);
      // iconElement.stop().animate({
      //   color: foregroundColorCache
      // }, MyApplication.UI.genericSpeed);
    });
    _self._element.unbind("mouseleave");
    _self._element.bind("mouseleave", function() {
      if (_self.hasBeenClicked) return;
      var buttonElement = $(this);
      var grayColorCache = MyApplication.UI.getColor("mid-gray");
      buttonElement.stop().animate({
        borderColor: grayColorCache
      }, MyApplication.UI.genericSpeed);
      // var iconElement = $($("> span.fa", buttonElement)[0]);
      // var iconColor = MyApplication.UI.getIcon(buttonElement.attr("data-icon")).color;
      // iconElement.stop().animate({
      //   color: iconColor
      // }, MyApplication.UI.genericSpeed);
    });
    _self._element.unbind("click");
    _self._element.bind("click", function() {
      _self.hasBeenClicked = true;
      var buttonElement = $(this);
      var icon = MyApplication.UI.getIcon(buttonElement.attr("data-icon"));
      var iconColor = (icon ? icon.color : MyApplication.UI.getColor("mid-gray"));
      buttonElement.stop().animate({
        borderColor: iconColor
      }, MyApplication.UI.slowSpeed, function() { handler(_self) });
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
    MyApplication.UI.iconify(_self._element);
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
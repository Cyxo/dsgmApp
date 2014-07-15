function StatusBarClass() {

  var _self = this;
  _self._element = null;
  _self.text = "";
  _self.icon = null;

  this.setHandler = function(handler) {
    _self.handler = handler;
    _self._element.unbind("click");
    _self._element.bind("click", function() {
      handler(_self);
    });
  }

  this.makeElement = function() {
    var s = "<footer class=\"ui ui-status-bar\"></footer>";
    var element = $(s);
    return element;
  }

  this.refresh = function() {
    _self._element.attr("data-icon", (_self.icon ? this.icon : ""));
    _self._element.html(_self.text);
    DSGM.UI.iconify(_self._element);
  }

  _self._element = this.makeElement();
  _self.refresh();

  this.setText = function(text) {
    _self.text = text;
    _self.refresh();
  }

  this.setIcon = function(icon) {
    _self.icon = icon;
    _self.refresh();
  }

  this.setWorking = function(text) {
    _self.icon = "loading";
    _self.text = text + "...";
    _self.refresh();
  }

  this.setAlert = function(text, handler) {
    _self.icon = "alert";
    _self.text = text;
    if (handler) _self.setHandler(handler);
    _self.refresh();
  }

  this.clear = function() {
    _self.text = "";
    _self.icon = null;
    _self.refresh();
  }

  this.getElement = function() {
    return _self._element;
  }

}
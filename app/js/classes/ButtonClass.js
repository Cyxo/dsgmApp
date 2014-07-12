function ButtonClass(text, icon, handler) {

  var _self = this;
  this._element = null;
  this.text = text;
  this.icon = icon;

  this.setHandler = function(handler) {
    this.handler = handler;
    this._element.unbind("click");
    this._element.bind("click", handler);
  }

  this.makeElement = function() {
    var s = "<button></button>";
    var element = $(s);
    return element;
  }

  this.refresh = function() {
    if(this.icon) this._element.attr("data-icon", this.icon);
    this._element.html(this.text);
    DSGM.UI.iconify(this._element);
  }

  this._element = this.makeElement();
  this.refresh();
  if(handler) this.setHandler(handler);

  this.setText = function(text) {
    this.text = text;
    this.refresh();
  }

  this.setIcon = function(icon) {
    this.icon = icon;
    this.refresh();
  }

  this.getElement = function() {
    return this._element;
  }

}
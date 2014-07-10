function ButtonClass(text, icon, callback) {
  this.text = text;
  this.icon = icon;
  this.callback = callback;
  this.makeElement = function() {
    var s = "<button" + (this.icon != undefined ? " data-icon=\"" + this.icon + "\"" : "") + ">" + this.text + "</button>";
    var element = $(s);
    DSGM.UI.iconify(element);
    element.click(this.callback);
    return element;
  }
}
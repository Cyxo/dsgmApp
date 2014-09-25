function BackgroundClass(name) {

  var _self = this;
  _self.type = "background";
  _self.typeHuman = "Background";
  _self.typePlural = "Backgrounds";
  _self.icon = "background";

  _self.size = "BgSize_T_256x256";
  _self.bgtype = "BgType_Text8bpp";
  _self.storage = "nitro";

  if (name) _self.name = name;

  _self.showSpecific = function(sideElement, mainElement) {
    var html = "(Background-specific UI)<br><br>";
    html += "Size: " + _self.size + "<br>";
    html += "Type: " + _self.bgtype + "<br>";
    html += "Storage: " + _self.storage + "<br>";
    mainElement.html(html);
  }

}
BackgroundClass.prototype = new GenericClass();
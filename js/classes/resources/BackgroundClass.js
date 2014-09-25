function BackgroundClass(name) {

  var _self = this;
  _self.type = "background";
  _self.typeHuman = "Background";
  _self.typePlural = "Backgrounds";
  _self.icon = "background";

  _self.storage = "nitro";

  if (name) _self.name = name;

  _self.showSpecific = function(sideElement, mainElement) {
    mainElement.html("(Background-specific UI)");
  }

}
BackgroundClass.prototype = new GenericClass();
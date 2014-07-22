function SpriteClass(name) {

  var _self = this;
  _self.type = "sprite";
  _self.typeHuman = "Sprite";
  _self.typePlural = "Sprites";
  _self.icon = "sprite";

  if (name) _self.name = name;

  _self.showSpecific = function(sideElement, mainElement) {
    mainElement.html("(Sprite-specific UI)");
  }

}
SpriteClass.prototype = new GenericClass();
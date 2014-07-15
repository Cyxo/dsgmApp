function SpriteClass(name) {

  var _self = this;
  if (name) _self.name = name;
  _self.type = "sprite";

}
SpriteClass.prototype = new ResourceClass();
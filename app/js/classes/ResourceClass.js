function ResourceClass() {
  var _self = this;
  _self.name = "New Resource"
}

function SpriteClass(name) {
  var _self = this;
  _self.name = name;
  _self.type = "sprite";
}
SpriteClass.prototype = ResourceClass;

function BackgroundClass(name) {
  var _self = this;
  _self.name = name;
  _self.type = "sprite";
}
SpriteClass.prototype = ResourceClass;
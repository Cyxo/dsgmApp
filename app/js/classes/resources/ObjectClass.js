function ObjectClass(name) {

  var _self = this;
  _self.type = "object";
  _self.typeHuman = "Object";
  _self.typePlural = "Objects";
  _self.icon = "object";

  if (name) _self.name = name;

}
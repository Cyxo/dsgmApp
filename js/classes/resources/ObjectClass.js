function ObjectClass(name) {

  var _self = this;
  _self.type = "object";
  _self.typeHuman = "Object";
  _self.typePlural = "Objects";
  _self.icon = "object";

  _self.variables = [];

  if (name) _self.name = name;

  _self.showSpecific = function(sideElement, mainElement) {
    mainElement.html("(Object-specific UI)");
  }

}
ObjectClass.prototype = new GenericClass();
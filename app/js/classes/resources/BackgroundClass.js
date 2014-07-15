function BackgroundClass(name) {

  var _self = this;
  if (name) _self.name = name;
  _self.type = "background";

}
BackgroundClass.prototype = new ResourceClass();
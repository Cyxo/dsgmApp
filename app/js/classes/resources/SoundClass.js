function SoundClass(name) {

  var _self = this;
  _self.type = "sound";
  _self.typeHuman = "Sound";
  _self.typePlural = "Sounds";
  _self.icon = "sound";

  if (name) _self.name = name;

}
SoundClass.prototype = new GenericClass();
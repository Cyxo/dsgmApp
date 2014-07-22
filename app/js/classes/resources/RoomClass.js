function RoomClass(name) {

  var _self = this;
  _self.type = "room";
  _self.typeHuman = "Room";
  _self.typePlural = "Rooms";
  _self.icon = "room";

  if (name) _self.name = name;

}
RoomClass.prototype = new GenericClass();
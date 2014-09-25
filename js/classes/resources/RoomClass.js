function RoomClass(name) {

  var _self = this;
  _self.type = "room";
  _self.typeHuman = "Room";
  _self.typePlural = "Rooms";
  _self.icon = "room";

  if (name) _self.name = name;

  _self.showSpecific = function(sideElement, mainElement) {
    mainElement.html("(Room-specific UI)");
  }

}
RoomClass.prototype = new GenericClass();
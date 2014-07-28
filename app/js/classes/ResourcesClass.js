function ResourcesClass() {

  var _self = this;
  _self._resourceTypes = [SpriteClass, BackgroundClass, ObjectClass, RoomClass, SoundClass];

  _self.influentialResourceType = "room";

  _self._resourceTypeClasses = [];
  $.each(_self._resourceTypes, function(index, resourceType) {
    var newResource = new resourceType();
    _self._resourceTypeClasses.push(newResource);
  });

  _self.getStaticResources = function(property) {
    return $.map(_self._resourceTypeClasses, function(resourceTypeClass) {
      return (property ? resourceTypeClass[property] : resourceTypeClass);
    });
  }

  _self.createResourceClassFromTypeName = function(type) {
    var whichClassIndex = 0;
    $.each(_self._resourceTypeClasses, function(index, resourceTypeClass) {
      if(type == resourceTypeClass.type) return false;
      whichClassIndex++;
    });
    return new _self._resourceTypes[whichClassIndex];
  }

  _self.influentialSelect = function() {
    var influentialResources = MyApplication.currentProject.getResourcesByType(_self.influentialResourceType);
    if (influentialResources.length > 0) influentialResources[0].getTreeItem().select();
  }

}
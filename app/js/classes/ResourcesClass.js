function ResourcesClass() {

  var _self = this;
  _self._resourceTypes = [SpriteClass, BackgroundClass];

  _self._resourceTypeClasses = [];
  $.each(_self._resourceTypes, function(index, resourceType) {
    _self._resourceTypeClasses.push(new resourceType());
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

}
function ProjectClass() {

	var _self = this;

	_self.name = "";
	_self._resources = [];

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
		var whichClass = $.grep(_self._resourceTypes, function(resourceType) {
			var newClass = new resourceType();
			return (type == newClass.type);
		})[0];
		if(whichClass == undefined) whichClass = _self._resourceTypes[0];
		return new whichClass;
	}

	_self.getResourceByNameAndType = function(name, type) {
		return $.grep(_self._resources, function(resource) {
			return (resource.name == name && resource.type == type);
		})[0];
	}

	_self.getResourcesByType = function(type) {
		return $.grep(_self._resources, function(resource) {
			return (resource.type == type);
		});
	}

	_self.addResource = function(name, type) {
		var newResource = _self.createResourceClassFromTypeName(type);
		if (name == null) {
			var i = 1;
			while (true) {
				name = newResource.typeHuman + "_" + (i).toString();
				if(_self.getResourceByNameAndType(name, type) == undefined) break;
				i++;
			}
		}
		newResource.name = name;
		_self._resources.push(newResource);
	}

	_self.load = function(projectJson) {
		var tempProject = $.parseJSON(projectJson);
		for(var property in tempProject) _self[property] = tempProject[property];
	}

	_self.save = function() {
		return JSON.stringify(_self);
	}

}
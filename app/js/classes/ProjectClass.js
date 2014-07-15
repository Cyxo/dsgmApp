function ProjectClass() {

	var _self = this;

	_self.name = "";
	_self.resources = [];

	_self.createResourceClassFromTypeName = function(type) {
		var resourceTypes = [SpriteClass, BackgroundClass];
		var whichClass = $.grep(resourceTypes, function(resourceType) {
			var newClass = new resourceType();
			return (type == newClass.type);
		})[0];
		if(whichClass == undefined) whichClass = ResourceClass;
		return new whichClass;
	}

	_self.getResourceByNameAndType = function(name, type) {
	}

	_self.getResourcesByType = function(type) {	
	}

	_self.addResource = function(name, type) {
		var newResource = _self.createResourceClassFromTypeName(type);
		newResource.setName(name);
		console.log(newResource);
	}

	_self.removeResource = function(resource) {
	}

	_self.load = function(projectJson) {
		var tempProject = $.parseJSON(projectJson);
		for(var property in tempProject) _self[property] = tempProject[property];
	}

	_self.save = function() {
		return JSON.stringify(_self);
	}

}
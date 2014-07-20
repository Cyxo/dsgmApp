function ProjectClass() {

	var _self = this;

	_self.name = "";
	_self._resources = [];

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

	_self.addResource = function(name, type, doSelect) {
		doSelect = (doSelect ? doSelect : false);
		var newResource = DSGM.Resources.createResourceClassFromTypeName(type);
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
		var masterTreeItem = DSGM.UI.resourcesTree.findItemByProperty("text", newResource.typePlural);
		var newTreeItem = new TreeItemClass(newResource.name, newResource.icon);
		newTreeItem.setAttr("resource-name", newResource.name);
		newTreeItem.setAttr("resource-type", newResource.type);
		newTreeItem.setHandler(function() {
			DSGM.loadResourceByNameAndType(this.getAttr("resource-name"), this.getAttr("resource-type"));
		});
		masterTreeItem.addItem(newTreeItem);
		if (doSelect) newTreeItem.select(true);
		masterTreeItem.expand(true);
		return newResource;
	}

	_self.load = function(projectJson) {
		var tempProject = $.parseJSON(projectJson);
		for(var property in tempProject) _self[property] = tempProject[property];
	}

	_self.save = function() {
		return JSON.stringify(_self);
	}

} 
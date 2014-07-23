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

  _self.resourceOperationError = function(resource, operation) {
    var text;
    if (resource == null) {
      text = MyApplication.Language.getTerm(operation + "-resource-error-resource");
    } else {
      text = MyApplication.Language.getTerm(operation + "-resource-error-name", [resource.name]);
    }
    MyApplication.UI.statusBar.setAlert(text);
  }

	_self.addResource = function(resource, doSelect) {
		doSelect = (doSelect ? doSelect : false);
		_self._resources.push(resource);
		var masterTreeItem = MyApplication.UI.resourcesTree.findItemByAttr("resource-type", resource.type);
		var newTreeItem = new TreeItemClass(resource.name, resource.icon);
		newTreeItem.setAttr("resource-name", resource.name);
		newTreeItem.setAttr("resource-type", resource.type);
		newTreeItem.setHandler(function(whichItem) {
			_self.loadResourceByNameAndType(whichItem.getAttr("resource-name"), whichItem.getAttr("resource-type"));
		});
		masterTreeItem.addItem(newTreeItem);
		if (doSelect) newTreeItem.select(true);
		masterTreeItem.expand(true);
		return resource;
	}

  _self.addResourceByNameAndType = function(name, type, doSelect) {
    doSelect = (doSelect ? doSelect : false);
    var newResource = MyApplication.Resources.createResourceClassFromTypeName(type);
    if (name == null) {
      var i = 1;
      while (true) {
        name = newResource.typeHuman + "_" + (i).toString();
        if(_self.getResourceByNameAndType(name, type) == undefined) break;
        i++;
      }
    }
    newResource.name = name;
    return _self.addResource(newResource, doSelect);
  }

  _self.copyResource = function(resource) {
    var deepCopy = true;
    var newResource = jQuery.extend(deepCopy, {}, resource);
    newResource.name = newResource.name + "_Copy";
    _self.addResource(newResource, true);
  }

  _self.renameResource = function(resource, newName) {
    if (resource == null) {
      _self.resourceOperationError(resource, "rename");
      return;
    }
    var masterTreeItem = MyApplication.UI.resourcesTree.findItemByAttr("resource-type", resource.type);
    var resourceTreeItem = masterTreeItem.findItemByAttr("resource-name", resource.name);
    resourceTreeItem.setText(newName);
    resourceTreeItem.setAttr("resource-name", newName);
    resource.name = newName;
  }

  _self.deleteResource = function(resource) {
    MyApplication.UI.statusBar.clear();
    if (resource == null) {
      _self.resourceOperationError(resource, "delete");
      return;
    }
    var resourceIndex = MyApplication.somethingToIndex(_self._resources, resource);
    if (resourceIndex == null) {
      _self.resourceOperationError(resource, "delete");
      return;
    }
    _self._resources.splice(resourceIndex, 1);
    var masterTreeItem = MyApplication.UI.resourcesTree.findItemByAttr("resource-type", resource.type);
    var resourceTreeItem = masterTreeItem.findItemByAttr("resource-name", resource.name);
    if (!masterTreeItem.removeItem(resourceTreeItem)) {
      error();
      return;
    }
    MyApplication.UI.resourcesTree.selectedItem = null;
    MyApplication.UI.switchMainMarkup("blank");
  }

  _self.loadResourceByNameAndType = function(name, type) {
    var resource = _self.getResourceByNameAndType(name, type);
    MyApplication.UI.statusBar.clear();
    if (resource == undefined) {
      _self.resourceOperationError(null, "load");
      return;
    }
    resource.show();
  }

  _self.addResourceByNameAndType(null, "object", true);
  MyApplication.UI.setTitle("New Project");

}
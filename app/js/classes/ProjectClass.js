function ProjectClass(name) {

	var _self = this;

	_self.name = (name ? name : "New Project");
  _self.path = "";
	_self._resources = [];

  _self.cleanFresh = function() {
    //Clear Resources Tree
    $.each(MyApplication.UI.resourcesTree.items, function(index, item) {
      item.emptyItems();
    });
  }

  _self.loadFromString = function(string) {
    _self.cleanFresh();
    var jsonObject = $.parseJSON(string);
    _self.name = jsonObject.name;
    MyApplication.UI.setTitle(_self.name);
    $.each(jsonObject.resources, function(index, resource) {
      console.log(resource);
    });
  }

  _self.saveToString = function(string) {
    var jsonObject = {
      "name": _self.name,
      "resources": _self._resources
    };
    return JSON.stringify(jsonObject);
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

  _self.resourceOperationError = function(resource, operation) {
    var text;
    if (resource == null) {
      text = MyApplication.Language.getTerm(operation + "-resource-error-resource");
    } else {
      text = MyApplication.Language.getTerm(operation + "-resource-error-name", [resource.name]);
    }
    MyApplication.UI.statusBar.setAlert(text);
  }

	_self.addResource = function(resource, doSelect, doMakeAChange) {
    var doSelect = (doSelect != undefined ? doSelect : true);
    var doMakeAChange = (doMakeAChange != undefined ? doMakeAChange : true);
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
    if (doMakeAChange) _self.makeAChange();
		return resource;
	}

  _self.addResourceByNameAndType = function(name, type, doSelect, doMakeAChange) {
    var doSelect = (doSelect != undefined ? doSelect : true);
    var doMakeAChange = (doMakeAChange != undefined ? doMakeAChange : true);
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
    return _self.addResource(newResource, doSelect, doMakeAChange);
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
    _self.makeAChange();
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
    _self.makeAChange();
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

  _self.changeMade = false;
  _self.makeAChange = function() {
    MyApplication.UI.setTitle(_self.name + "*");
    _self.changeMade = true;
  }

  //Clean Fresh
  _self.cleanFresh();

  //Set Title
  MyApplication.UI.setTitle(_self.name);

  //Add Sample Resources
  _self.addResourceByNameAndType(null, "room", false, false);
  _self.addResourceByNameAndType(null, "object", true, false);

}
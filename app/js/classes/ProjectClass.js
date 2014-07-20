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

  _self.deleteResource = function(resource) {
    var error = function() {
      var text = MyApplication.Language.getTerm("delete-resource-error");
      text = text.replace("[name]", resource ? ("&lsquo;" + resource.name + "&rsquo;") : "The resource");
      MyApplication.UI.statusBar.setAlert(text);
    }
    if (resource == null) {
      error();
      return;
    }
    MyApplication.UI.statusBar.clear();
    var resourceIndex = MyApplication.somethingToIndex(_self._resources, resource);
    if (resourceIndex != null) {
      _self._resources.splice(resourceIndex, 1);
      var masterTreeItem = MyApplication.UI.resourcesTree.findItemByAttr("resource-type", resource.type);
      var resourceTreeItem = masterTreeItem.findItemByAttr("resource-name", resource.name);
      if (!masterTreeItem.removeItem(resourceTreeItem)) {
        error();
        return;
      }
      MyApplication.UI.resourcesTree.selectedItem = null;
      MyApplication.UI.switchMainMarkup("blank");
    } else {
      error();
      return;
    }
  }

  _self.loadResourceByNameAndType = function(name, type) {
    var resource = _self.getResourceByNameAndType(name, type);
    MyApplication.UI.statusBar.clear();
    if (resource == undefined) {
      var text = MyApplication.Language.getTerm("load-resource-error");
      text = text.replace("[name]", "&lsquo;" + name + "&rsquo;");
      MyApplication.UI.statusBar.setAlert(text);
      return;
    }
    var markup = MyApplication.UI.switchMainMarkup("resource");
    var firstTabChanger = $($(".ui-tabs .ui-tabs-changer div", markup)[0]);
    firstTabChanger.attr("data-icon", resource.icon);
    MyApplication.UI.iconify(firstTabChanger);
    $("span[data-role=resource-name]", firstTabChanger).html(resource.name);
    var firstTab = $($(".ui-tabs .ui-panel", markup)[0]);
    var firstTabP = $("> p", firstTab);
    firstTabP.html("(" + resource.name + " " + MyApplication.Language.getTerm("properties") + ")");
  }

  _self.addResourceByNameAndType(null, "sprite");
  _self.addResourceByNameAndType(null, "sprite");
  _self.addResourceByNameAndType(null, "sprite", true);

}
function ProjectClass(name) {

  var _self = this;

  _self.name = (name ? name : "New Project");
  _self.path = "";
  _self._resources = [];

  _self.cleanFresh = function() {
    MyApplication.UI.switchMainMarkup("blank");
    //Clear Resources
    _self._resources.length = 0;
    //Clear Resources Tree
    $.each(MyApplication.UI.resourcesTree.items, function(index, item) {
      item.emptyItems();
    });
  }

  _self.openFromString = function(string) {
    _self.cleanFresh();
    var jsonObject = $.parseJSON(string);
    _self.name = jsonObject.name;
    MyApplication.UI.setTitle(_self.name);
    $.each(jsonObject.resources, function(index, resource) {
      _self.addResourceByNameAndType(resource.name, resource.type, false, false);
    });
  }

  _self.saveToString = function(string) {
    var jsonObject = {
      "name": _self.name,
      "resources": _self._resources
    };
    return JSON.stringify(jsonObject);
  }

  _self.save = function(path) {
    if (path != null) _self.path = path;
    MyApplication.Command.request("saveProject", [_self.path, _self.saveToString()], function(response) {
      console.log(response);
    });
  }
  
  _self.compile = function() {
    MyApplication.Command.request("compileProject", null, function(response) {
      console.log(response);
    });
  }

  _self.generateHeader = function() {
    var header = "#pragma once\n";
    
    header += "\n";
    
    header += "#define DSGM_SOUND_STREAM_COUNT " + 0 + "\n";
    header += "#define DSGM_SOUND_EFFECT_COUNT " + 0 + "\n";
    header += "#define DSGM_SOUND_COUNT (DSGM_SOUND_STREAM_COUNT + DSGM_SOUND_EFFECT_COUNT)" + "\n";
    header += "#define DSGM_BACKGROUND_COUNT " + 0 + "\n";
    header += "#define DSGM_PALETTE_COUNT " + 0 + "\n";
    header += "#define DSGM_SPRITE_COUNT " + 0 + "\n";
    header += "#define DSGM_OBJECT_COUNT " + 0 + "\n";
    header += "#define DSGM_ROOM_COUNT " + 0 + "\n";
    
    header += "\n";
    
    /*
    for every background to be loaded from RAM {
      header += '#include "' + background.name + '_Tiles_bin"\n';
      header += '#include "' + background.name + '_Map_bin"\n';
      header += '#include "' + background.name + '_Pal_bin"\n';
    }
    */
    
    header += "\n";
    
    /*
    for every sprite to be loaded from RAM {
      header += '#include "' + sprite.name + '_Sprite_bin"\n';
    }
    */
    
    header += "\n";
    
    /*
    for every sprite palette to be loaded from RAM {
      header += '#include "' + palette.name + '_Pal_bin"\n';
    }
    */
    
    header += "\n";
    
    // if more than one sound {
      header += "typedef enum {";
        /*
        for every sound {
          header += sound.name + ",\n";
        }
        */
      header += "} DSGM_SoundNames;\n";
    // }
    
    header += "\n";
    
    // if more than one background {
      header += "typedef enum {";
        /*
        for every background {
          header += background.name + ",\n";
        }
        */
      header += "} DSGM_BackgroundNames;\n";
    // }
    
    header += "\n";
    
    // if more than one palette
      header += "typedef enum {";
        /*
        for every palette {
          header += palette.name + ",\n";
        }
        */
      header += "} DSGM_PaletteNames;\n";
    // }
    
    header += "\n";
    
    // if more than one sprite
      header += "typedef enum {";
        /*
        for every sprite {
          header += sprite.name + ",\n";
        }
        */
      header += "} DSGM_SpriteNames;\n";
    // }
    
    header += "\n";
    
    // if more than one object
      header += "typedef enum {";
        /*
        for every object {
          header += object.name + ",\n";
        }
        */
      header += "} DSGM_ObjectNames;\n";
    // }
    
    header += "\n";
    
    /*
	for every object {
      header += "typedef struct {\n";
      header += "  DSGM_ObjectInstanceBase;\n";
      header += "  struct {\n";
      for every custom variable in object {
        header += variable.type + " " + variable.name + " = " + variable.defaultValue + ";\n";
      }
      header += "  } *variables;\n";
      header += "} " + object.name + "ObjectInstance;\n";
    }
	*/
    
    header += "\n";
    
    // if more than one room
      header += "typedef enum {";
        /*
        for every room {
          header += room.name + ",\n";
        }
        */
      header += "} DSGM_RoomNames;\n";
    // }
    
    header += "\n";
    
    header += "extern DSGM_Sound DSGM_Sounds[DSGM_SOUND_COUNT];\n";
    header += "extern DSGM_Background DSGM_Backgrounds[DSGM_BACKGROUND_COUNT];\n";
    header += "extern DSGM_Palette DSGM_Palettes[DSGM_PALETTE_COUNT];\n";
    header += "extern DSGM_Sprite DSGM_Sprites[DSGM_SPRITE_COUNT];\n";
    header += "extern DSGM_Object DSGM_Objects[DSGM_OBJECT_COUNT];\n";
    header += "extern DSGM_Room DSGM_Rooms[DSGM_ROOM_COUNT];\n";
    header += "\n";
    header += "extern int DSGM_currentRoom;\n";
    header += "\n";
    header += "void DSGM_SetupRooms(int room);\n";
    
    // for every object {
      // for every normal event {
        // header += "void " + object.name + "_" + event.name + "(" + object.name + "ObjectInstance *me");\n";
      // }
      // for every collision event {
        // header += "void " + object.name + "_collide_" + collisionObject.name + "(" + object.name + "ObjectInstance *me, " + collisionObject.name + "ObjectInstance *collider");\n";
      // }
    // }
    
    return header;
  }
  
  _self.generateSource = function() {
    var source = "";
	return source;
  }
  
  _self.getResourceByNameAndType = function(name, type, doLooseMatch) {
    var doLooseMatch = (doLooseMatch != undefined ? doLooseMatch : false);
    var getName = (doLooseMatch ? name.toLowerCase() : name);
    return $.grep(_self._resources, function(resource) {
      var resourceName = (doLooseMatch ? resource.name.toLowerCase() : resource.name);
      if (type != null) {
        return ((resourceName == getName) && resource.type == type);
      } else {
        return (resourceName == getName);
      }
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
    var masterTreeItem = resource.getMasterTreeItem();
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
    return newTreeItem;
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
    var resourceTreeItem = resource.getTreeItem();
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
    var masterTreeItem = resource.getMasterTreeItem();
    var resourceTreeItem = resource.getTreeItem();
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

  //Add Default Resources
  _self.addResourceByNameAndType(null, "object", false, false);
  _self.addResourceByNameAndType(null, "room", false, false);

}
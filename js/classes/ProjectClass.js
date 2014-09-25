function ProjectClass(name) {

  var _self = this;

  _self.name = (name ? name : "New Project");
  _self.path = "";
  _self._resources = [];
  _self.globalVariables = [];

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
    var sounds = _self.getResourcesByType("sound");
    var streams = [];
    var effects = [];
    var backgrounds = _self.getResourcesByType("background");
    var palettes = [];
    var sprites = _self.getResourcesByType("sprite");
    var objects = _self.getResourcesByType("object");
    var rooms = _self.getResourcesByType("room");
    
    var newline = false;
    
    var header = "#pragma once\n";
    
    header += "\n";
    
    header += "#define DSGM_SOUND_STREAM_COUNT " + streams.length + "\n";
    header += "#define DSGM_SOUND_EFFECT_COUNT " + effects.length + "\n";
    header += "#define DSGM_SOUND_COUNT (DSGM_SOUND_STREAM_COUNT + DSGM_SOUND_EFFECT_COUNT)" + "\n";
    header += "#define DSGM_BACKGROUND_COUNT " + backgrounds.length + "\n";
    header += "#define DSGM_PALETTE_COUNT " + palettes.length + "\n";
    header += "#define DSGM_SPRITE_COUNT " + sprites.length + "\n";
    header += "#define DSGM_OBJECT_COUNT " + objects.length + "\n";
    header += "#define DSGM_ROOM_COUNT " + rooms.length + "\n";
    
    header += "\n";
    
    for(var i = 0; i < backgrounds.length; i++) {
      var background = backgrounds[i];
      if(background.storage == "ram") {
        header += '#include "' + background.name + '_Tiles_bin"\n';
        header += '#include "' + background.name + '_Map_bin"\n';
        header += '#include "' + background.name + '_Pal_bin"\n';
        newline = true;
      }
    }
    
    if(newline) {
      header += "\n";
      newline = false;
    }
    
    for(var i = 0; i < sprites.length; i++) {
      var sprite = sprites[i];
      if(sprite.storage == "ram") {
        header += '#include "' + sprite.name + '_Sprite_bin"\n';
        newline = true;
      }
    }
    
    if(newline) {
      header += "\n";
      newline = false;
    }
    
    for(var i = 0; i < palettes.length; i++) {
      var palette = palettes[i];
      if(palette.storage == "ram") {
        header += '#include "' + palette.name + '_Pal_bin"\n';
        newline = true;
      }
    }
    
    if(newline) {
      header += "\n";
      newline = false;
    }
    
    if(sounds.length > 0) {
      header += "typedef enum {\n";
      for(var i = 0; i < streams.length; i++) {
        var stream = streams[i];
        header += "\t" + stream.name + ",\n";
      }
      for(var i = 0; i < effects.length; i++) {
        var effect = effects[i];
        header += "\t" + effect.name + ",\n";
      }
      header += "} DSGM_SoundNames;\n";
      header += "\n";
    }
    
    if(backgrounds.length > 0) {
      header += "typedef enum {\n";
      for(var i = 0; i < backgrounds.length; i++) {
        var background = backgrounds[i];
        header += "\t" + background.name + ",\n";
      }
      header += "} DSGM_BackgroundNames;\n";
      header += "\n";
    }
    
    if(palettes.length > 0) {
      header += "typedef enum {\n";
      for(var i = 0; i < palettes.length; i++) {
        var palette = palettes[i];
        header += "\t" + palette.name + ",\n";
      }
      header += "} DSGM_PaletteNames;\n";
      header += "\n";
    }
    
    if(sprites.length > 0) {
      header += "typedef enum {\n";
      for(var i = 0; i < sprites.length; i++) {
        var sprite = sprites[i];
        header += "\t" + sprite.name + ",\n";
      }
      header += "} DSGM_SpriteNames;\n";
      header += "\n";
    }
    
    if(objects.length > 0) {
      header += "typedef enum {\n";
        for(var i = 0; i < objects.length; i++) {
          var object = objects[i];
          header += "\t" + object.name + ",\n";
        }
      header += "} DSGM_ObjectNames;\n";
      header += "\n";
    }
    
    for(var i = 0; i < objects.length; i++) {
      var object = objects[i];
      header += "typedef struct {\n";
      header += "\tDSGM_ObjectInstanceBase;\n";
      header += "\tstruct {\n";
      for(var i = 0; i < object.variables.length; i++) {
        var variable = object.variables[i];
        
        var type = variable.type;
        if(!type) type = "int";
        
        var defaultValue = variable.defaultValue;
        if(!defaultValue) defaultValue = 0;
        
        header += "\t\t" + type + " " + variable.name + " = " + defaultValue + ";\n";
      }
      header += "\t} *variables;\n";
      header += "} " + object.name + "ObjectInstance;\n";
      header += "\n";
    }
    
    if(rooms.length > 0) {
      header += "typedef enum {\n";
      for(var i = 0; i < rooms.length; i++) {
        var room = rooms[i];
        header += "\t" + room.name + ",\n";
      }
      header += "} DSGM_RoomNames;\n";
      header += "\n";
    }
    
    header += "extern DSGM_Sound DSGM_Sounds[DSGM_SOUND_COUNT];\n";
    header += "extern DSGM_Background DSGM_Backgrounds[DSGM_BACKGROUND_COUNT];\n";
    header += "extern DSGM_Palette DSGM_Palettes[DSGM_PALETTE_COUNT];\n";
    header += "extern DSGM_Sprite DSGM_Sprites[DSGM_SPRITE_COUNT];\n";
    header += "extern DSGM_Object DSGM_Objects[DSGM_OBJECT_COUNT];\n";
    header += "extern DSGM_Room DSGM_Rooms[DSGM_ROOM_COUNT];\n";
  
    header += "\n";
  
    for(var i = 0; i < _self.globalVariables.length; i++) {
      var variable = _self.globalVariables[i];
      
      var type = variable.type;
      if(!type) type = "int";
      
      var defaultValue = variable.defaultValue;
      if(!defaultValue) defaultValue = 0;
      
      header += "extern " + type + " " + variable.name + " = " + defaultValue + ";\n";
      newline = true;
    }
  
    if(newline) {
      header += "\n";
      newline = false;
    }
  
    header += "extern int DSGM_currentRoom;\n";
    header += "\n";
    header += "void DSGM_SetupRooms(int room);\n";
    
    for(var i = 0; i < objects.length; i++) {
      var object = objects[i];
      // for every normal event {
        // header += "void " + object.name + "_" + event.name + "(" + object.name + "ObjectInstance *me");\n";
        // newline = true;
      // }
      // for every collision event {
        // header += "void " + object.name + "_collide_" + collisionObject.name + "(" + object.name + "ObjectInstance *me, " + collisionObject.name + "ObjectInstance *collider");\n";
        // newline = true;
      // }
    }
    
    if(newline) {
      header += "\n";
      newline = false;
    }
    
    return header;
  }
  
  _self.generateSource = function() {
    var sounds = _self.getResourcesByType("sound");
    var streams = [];
    var effects = [];
    var backgrounds = _self.getResourcesByType("background");
    var palettes = [];
    var sprites = _self.getResourcesByType("sprite");
    var objects = _self.getResourcesByType("object");
    var rooms = _self.getResourcesByType("room");
    
    var newline = false;
    
    var source = '#include "DSGM.h"\n';
    source += '#include "DSGM_projectHelper.h"\n';
    
    source += "\n";
    
    source += "DSGM_Sound DSGM_Sounds[DSGM_SOUND_COUNT] = {\n";
    for(var i = 0; i < streams.length; i++) {
      var stream = streams[i];
      source += "\tDSGM_FORM_SOUND_STREAM(" + stream.name + "),\n";
    }
    for(var i = 0; i < effects.length; i++) {
      var effect = effects[i];
      source += "\tDSGM_FORM_SOUND_EFFECT(" + effect.name + "),\n";
    }
    source += "};\n"
    
    source += "\n";
    
    source += "DSGM_Background DSGM_Backgrounds[DSGM_BACKGROUND_COUNT] = {\n";
    for(var i = 0; i < backgrounds.length; i++) {
      var background = backgrounds[i];
      if(background.storage == "nitro") source += "\tDSGM_FORM_NITRO_BACKGROUND(" + background.name + ", " + background.size + ", " + background.bgtype + "),\n";
      else if(background.storage == "fat") source += "\tDSGM_FORM_FAT_BACKGROUND(" + background.name + ", " + background.size + ", " + background.bgtype + "),\n";
      else if(background.storage == "ram") source += "\tDSGM_FORM_RAM_BACKGROUND(" + background.name + ", " + background.size + ", " + background.bgtype + "),\n";
    }
    source += "};\n"
    
    source += "\n";
    
    source += "DSGM_Palette DSGM_Palettes[DSGM_PALETTE_COUNT] = {\n";
    /*
    for every palette {
      if(palette.storage == "nitro") source += "\tDSGM_FORM_NITRO_PALETTE(" + palette.name + "),\n";
      else if(palette.storage == "fat") source += "\tDSGM_FORM_FAT_PALETTE(" + palette.name + "),\n";
      else if(palette.storage == "ram") source += "\tDSGM_FORM_RAM_PALETTE(" + palette.name + "),\n";
    }
    */
    source += "};\n"
    
    source += "\n";
    
    source += "DSGM_Sprite DSGM_Sprites[DSGM_SPRITE_COUNT] = {\n";
    /*
    for every sprite {
      if(sprite.storage == "nitro") source += "\tDSGM_FORM_NITRO_SPRITE(" + sprite.name + ", " + sprite.palette.name + ", " + sprite.size + ", " + sprite.frames + "),\n";
      else if(sprite.storage == "fat") source += "\tDSGM_FORM_FAT_SPRITE(" + sprite.name + ", " + sprite.palette.name + ", " + sprite.size + ", " + sprite.frames + "),\n";
      else if(sprite.storage == "ram") source += "\tDSGM_FORM_RAM_SPRITE(" + sprite.name + ", " + sprite.palette.name + ", " + sprite.size + ", " + sprite.frames + "),\n";
    }
    */
    source += "};\n"
    
    source += "\n";
    
    source += "DSGM_Object DSGM_Objects[DSGM_OBJECT_COUNT] = {\n";
    /*
    for every object {
      source += "\t{\n";
        if(object.sprite) source += "\t\t&DSGM_Sprites[" + object.sprite.name + "],\n";
        else source += "\t\tDSGM_NO_SPRITE,\n";
        
        if(object.events.create) source += "\t\t(DSGM_EVENT)" + object.name + "_create,\n";
        else source += "\t\tDSGM_NO_EVENT,\n";
        
        if(object.events.loop) source += "\t\t(DSGM_EVENT)" + object.name + "_loop,\n";
        else source += "\t\tDSGM_NO_EVENT,\n";
        
        if(object.events.destroy) source += "\t\t(DSGM_EVENT)" + object.name + "_destroy,\n";
        else source += "\t\tDSGM_NO_EVENT,\n";
        
        if(object.events.touch) source += "\t\t(DSGM_EVENT)" + object.name + "_touch,\n";
        else source += "\t\tDSGM_NO_EVENT,\n";
        
        source += "\t\tNULL, 0,\n";
        source += "\t\t\n";
        
        source += "\t\tsizeof(*((" + object.name + "ObjectInstance *)0)->variables)\n";
      source += "\t},\n";
    }
    */
    source += "};\n"
    
    source += "\n";
    
    source += "DSGM_Room DSGM_Rooms[DSGM_ROOM_COUNT] = {\n";
    /*
    for every room {
      
    }
    */
    source += "};\n"
    
    source += "\n";
    
    /*
    for every global variable {
      source += variable.type + " " + variable.name + " = " variable.defaultValue + ";\n";
    }
    */
    
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
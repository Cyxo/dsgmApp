function DSGM_Project() {
	var _self = this;
	
	this.name = "";
	
	this.sprites = [];
	this.backgrounds = [];
	this.objects = [];
	this.rooms = [];
	
	this.addSprite = function(name) {
		_self.sprites.push(new DSGM_Sprite(name));
		_self.refreshResourcesList("sprites");
		return _self.sprites.length - 1;
	}
	
	this.addBackground = function(name) {
		_self.backgrounds.push(new DSGM_Background(name));
		_self.refreshResourcesList("backgrounds");
		return _self.backgrounds.length - 1;
	}
	
	this.addObject = function(name) {
		_self.objects.push(new DSGM_Object(name));
		_self.refreshResourcesList("objects");
		return _self.objects.length - 1;
	}
	
	this.addRoom = function(name) {
		_self.rooms.push(new DSGM_Room(name));
		_self.refreshResourcesList("rooms");
		return _self.rooms.length - 1;
	}
	
	this.removeResource = function(resource) {
		if(resource instanceof DSGM_Sprite) {
			_self.sprites.splice(_self.sprites.indexOf(resource), 1);
			_self.refreshResourcesList("sprites");
		}
		else if(resource instanceof DSGM_Background) {
			_self.backgrounds.splice(_self.backgrounds.indexOf(resource), 1);
			_self.refreshResourcesList("backgrounds");
		}
		else if(resource instanceof DSGM_Object) {
			_self.objects.splice(_self.objects.indexOf(resource), 1);
			_self.refreshResourcesList("objects");
		}
		else if(resource instanceof DSGM_Room) {
			_self.rooms.splice(_self.rooms.indexOf(resource), 1);
			_self.refreshResourcesList("rooms");
		}
		else {
			console.log("Trying to remove unrecognised resource.");
		}
	}
	
	this.refreshResourcesList = function(resourceType) {
		if(!resourceType || resourceType == "sprites") {
			$($('[data-role="sprites-list"]')).empty();
			$.each(project.sprites, function(index, sprite) {
				$('[data-role="sprites-list"]').append('<li><span data-icon="sprite"><span>' + sprite.name + "</span></span></li>");
			});
		}
		
		if(!resourceType || resourceType == "backgrounds") {
			$($('[data-role="backgrounds-list"]')).empty();
			$.each(project.backgrounds, function(index, background) {
				$('[data-role="backgrounds-list"]').append('<li><span data-icon="background"><span>' + background.name + "</span></span></li>");
			});
		}
		
		if(!resourceType || resourceType == "objects") {
			$('[data-role="objects-list"]').empty();
			$.each(project.objects, function(index, object) {
				$('[data-role="objects-list"]').append('<li><span data-icon="object"><span>' + object.name + "</span></span></li>");
			});
		}
		
		if(!resourceType || resourceType == "rooms") {
			$('[data-role="rooms-list"]').empty();
			$.each(project.rooms, function(index, room) {
				$('[data-role="rooms-list"]').append('<li><span data-icon="room"><span>' + room.name + "</span></span></li>");
			});
		}
	}
	
	this.load = function(project) {
		var tempProject = JSON.parse(project);
		for(var property in tempProject) _self[property] = tempProject[property];
		_self.refreshResourcesList();
	}
	
	this.save = function() {
		return JSON.stringify(_self);
	}
}

var DSGM_Resource = {
	name: "New Resource",
};

function DSGM_Sprite(name) {
	if(name) this.name = name;
}
DSGM_Sprite.prototype = Object.create(DSGM_Resource);

function DSGM_Background(name) {
	if(name) this.name = name;
}
DSGM_Background.prototype = Object.create(DSGM_Resource);

function DSGM_Object(name) {
	if(name) this.name = name;
}
DSGM_Object.prototype = Object.create(DSGM_Resource);

function DSGM_Room(name) {
	if(name) this.name = name;
}
DSGM_Room.prototype = Object.create(DSGM_Resource);

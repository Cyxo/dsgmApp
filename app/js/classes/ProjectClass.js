function ProjectClass() {
	var _self = this;

	this.name = "";

	this.sprites = [];
	this.backgrounds = [];
	this.objects = [];
	this.rooms = [];
	this.sounds = [];

	this.addSprite = function(name) {
		_self.sprites.push(new SpriteClass(name));
		_self.refreshResourcesList("sprites");
		return _self.sprites.length - 1;
	}

	this.addBackground = function(name) {
		_self.backgrounds.push(new BackgroundClass(name));
		_self.refreshResourcesList("backgrounds");
		return _self.backgrounds.length - 1;
	}

	this.addObject = function(name) {
		_self.objects.push(new ObjectClass(name));
		_self.refreshResourcesList("objects");
		return _self.objects.length - 1;
	}

	this.addRoom = function(name) {
		_self.rooms.push(new RoomClass(name));
		_self.refreshResourcesList("rooms");
		return _self.rooms.length - 1;
	}

	this.addSound = function(name) {
		_self.sounds.push(new SoundClass(name));
		_self.refreshResourcesList("sounds");
		return _self.sounds.length - 1;
	}

	this.removeResource = function(resource) {
		if(resource instanceof SpriteClass) {
			_self.sprites.splice(_self.sprites.indexOf(resource), 1);
			_self.refreshResourcesList("sprites");
		}
		else if(resource instanceof BackgroundClass) {
			_self.backgrounds.splice(_self.backgrounds.indexOf(resource), 1);
			_self.refreshResourcesList("backgrounds");
		}
		else if(resource instanceof ObjectClass) {
			_self.objects.splice(_self.objects.indexOf(resource), 1);
			_self.refreshResourcesList("objects");
		}
		else if(resource instanceof RoomClass) {
			_self.rooms.splice(_self.rooms.indexOf(resource), 1);
			_self.refreshResourcesList("rooms");
		}
		else if(resource instanceof SoundClass) {
			_self.sounds.splice(_self.sounds.indexOf(resource), 1);
			_self.refreshResourcesList("sounds");
		}
		else {
			console.log("Trying to remove unrecognised resource.");
		}
	}

	this.refreshResourcesList = function(resourceType) {
		if(!resourceType || resourceType == "sprites") {
			$('[data-role="sprites-list"]').empty();
			$.each(project.sprites, function(index, sprite) {
				$('[data-role="sprites-list"]').append('<li><span data-icon="sprite"><span>' + sprite.name + "</span></span></li>");
			});
		}

		if(!resourceType || resourceType == "backgrounds") {
			$('[data-role="backgrounds-list"]').empty();
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

		if(!resourceType || resourceType == "sounds") {
			$('[data-role="sounds-list"]').empty();
			$.each(project.sounds, function(index, sound) {
				$('[data-role="sounds-list"]').append('<li><span data-icon="sound"><span>' + sound.name + "</span></span></li>");
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

var resourcePrototype = {
	name: "New Resource",
};

function SpriteClass(name) {
	if(name) this.name = name;
}
SpriteClass.prototype = Object.create(resourcePrototype);

function BackgroundClass(name) {
	if(name) this.name = name;
}
BackgroundClass.prototype = Object.create(resourcePrototype);

function ObjectClass(name) {
	if(name) this.name = name;
}
ObjectClass.prototype = Object.create(resourcePrototype);

function RoomClass(name) {
	if(name) this.name = name;
}
RoomClass.prototype = Object.create(resourcePrototype);

function SoundClass(name) {
	if(name) this.name = name;
}
SoundClass.prototype = Object.create(SoundClass);
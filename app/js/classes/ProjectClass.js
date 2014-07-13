function ProjectClass() {
	var _self = this;

	_self.name = "";

	_self.sprites = [];
	_self.backgrounds = [];
	_self.objects = [];
	_self.rooms = [];
	_self.sounds = [];

	this.addSprite = function(name) {
		_self.sprites.push(new SpriteClass(name));
		return _self.sprites.length - 1;
	}

	this.addBackground = function(name) {
		_self.backgrounds.push(new BackgroundClass(name));
		return _self.backgrounds.length - 1;
	}

	this.addObject = function(name) {
		_self.objects.push(new ObjectClass(name));
		return _self.objects.length - 1;
	}

	this.addRoom = function(name) {
		_self.rooms.push(new RoomClass(name));
		return _self.rooms.length - 1;
	}

	this.addSound = function(name) {
		_self.sounds.push(new SoundClass(name));
		return _self.sounds.length - 1;
	}

	this.removeResource = function(resource) {
		if(resource instanceof SpriteClass) {
			_self.sprites.splice(_self.sprites.indexOf(resource), 1);
			return true;
		}
		else if(resource instanceof BackgroundClass) {
			_self.backgrounds.splice(_self.backgrounds.indexOf(resource), 1);
			return true;
		}
		else if(resource instanceof ObjectClass) {
			_self.objects.splice(_self.objects.indexOf(resource), 1);
			return true;
		}
		else if(resource instanceof RoomClass) {
			_self.rooms.splice(_self.rooms.indexOf(resource), 1);
			return true;
		}
		else if(resource instanceof SoundClass) {
			_self.sounds.splice(_self.sounds.indexOf(resource), 1);
			return true;
		}
		return false;
	}

	this.load = function(project) {
		var tempProject = $.parseJSON(project);
		for(var property in tempProject) _self[property] = tempProject[property];
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
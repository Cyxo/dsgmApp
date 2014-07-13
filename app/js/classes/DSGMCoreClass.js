function DSGM_Project() {
	var that = this;
	
	this.name = new String();
	
	this.sprites = new Array();
	this.backgrounds = new Array();
	this.objects = new Array();
	this.rooms = new Array();
	
	this.addSprite = function(name) {
		//that.sprites[that.sprites.length] = new DSGM_Sprite(name);
		that.sprites.push(new DSGM_Sprite(name));
		that.refreshResourcesList("sprites");
		return that.sprites.length - 1;
	}
	
	this.addBackground = function(name) {
		that.backgrounds.push(new DSGM_Background(name));
		that.refreshResourcesList("backgrounds");
		return that.backgrounds.length - 1;
	}
	
	this.addObject = function(name) {
		that.objects.push(new DSGM_Object(name));
		that.refreshResourcesList("objects");
		return that.objects.length - 1;
	}
	
	this.addRoom = function(name) {
		that.rooms.push(new DSGM_Room(name));
		that.refreshResourcesList("rooms");
		return that.rooms.length - 1;
	}
	
	this.removeResource = function(resource) {
		if(resource instanceof DSGM_Sprite) {
			that.sprites.splice(that.sprites.indexOf(resource), 1);
			that.refreshResourcesList("sprites");
		}
		else if(resource instanceof DSGM_Background) {
			that.backgrounds.splice(that.backgrounds.indexOf(resource), 1);
			that.refreshResourcesList("backgrounds");
		}
		else if(resource instanceof DSGM_Object) {
			that.objects.splice(that.objects.indexOf(resource), 1);
			that.refreshResourcesList("objects");
		}
		else if(resource instanceof DSGM_Room) {
			that.rooms.splice(that.rooms.indexOf(resource), 1);
			that.refreshResourcesList("rooms");
		}
		else {
			console.log("Trying to remove unrecognised resource.");
		}
	}
	
	this.refreshResourcesList = function(resourceType) {
		var i;
		
		if(!resourceType || resourceType == "sprites") {
			var spritesList = document.querySelector('[data-role="sprites-list"]');
			spritesList.innerHTML = "";
			for(i = 0; i < project.sprites.length; i++) {
				spritesList.innerHTML += '<li><span data-icon="sprite"><span>' + project.sprites[i].name + "</span></span></li>"
			}
		}
		
		if(!resourceType || resourceType == "backgrounds") {
			var backgroundsList = document.querySelector('[data-role="backgrounds-list"]');
			backgroundsList.innerHTML = "";
			for(i = 0; i < project.backgrounds.length; i++) {
				backgroundsList.innerHTML += '<li><span data-icon="background"><span>' + project.backgrounds[i].name + "</span></span></li>"
			}
		}
		
		if(!resourceType || resourceType == "objects") {
			var objectsList = document.querySelector('[data-role="objects-list"]');
			objectsList.innerHTML = "";
			for(i = 0; i < project.objects.length; i++) {
				objectsList.innerHTML += '<li><span data-icon="object"><span>' + project.objects[i].name + "</span></span></li>"
			}
		}
		
		if(!resourceType || resourceType == "rooms") {
			var roomsList = document.querySelector('[data-role="rooms-list"]');
			roomsList.innerHTML = "";
			for(i = 0; i < project.rooms.length; i++) {
				roomsList.innerHTML += '<li><span data-icon="room"><span>' + project.rooms[i].name + "</span></span></li>"
			}
		}
	}
	
	this.load = function(project) {
		var tempProject = JSON.parse(project);
		for(var property in tempProject) that[property] = tempProject[property];
		that.refreshResourcesList();
	}
	
	this.save = function() {
		return JSON.stringify(that);
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

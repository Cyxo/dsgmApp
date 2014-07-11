function DSGM_Project() {
	this.name = new String();
	
	this.sprites = new Array();
	this.backgrounds = new Array();
	this.objects = new Array();
	this.rooms = new Array();
	
	this.load = function(project) {
		var tempProject = JSON.parse(project);
		for(var property in tempProject) this[property] = tempProject[property];
	}
	
	this.save = function() {
		return JSON.stringify(this);
	}
	
	this.copy = function(destination) {
		this.name = new String();
		
		this.sprites = new Array();
		this.backgrounds = new Array();
		this.objects = new Array();
		this.rooms = new Array();
		
		if(this.name) destination.name = this.name;
		
		if(this.sprites) destination.sprites = this.sprites;
		if(this.backgrounds) destination.backgrounds = this.backgrounds;
		if(this.objects) destination.objects = this.objects;
		if(this.rooms) destination.rooms = this.rooms;
	}
	
	this.debug = function() {
		var debug = new String();
		
		debug += "Name: " + this.name + "\n";
		
		debug += "\n";
		
		debug += "Sprites: " + this.sprites.length + "\n";
		var i;
		for(i = 0; i < this.sprites.length; i++) {
			debug += this.sprites[i].name + "\n";
		}
		
		debug += "\n";
		
		debug += "Backgrounds: " + this.backgrounds.length + "\n";
		var i;
		for(i = 0; i < this.backgrounds.length; i++) {
			debug += this.backgrounds[i].name + "\n";
		}
		
		debug += "\n";
		
		debug += "Objects: " + this.objects.length + "\n";
		var i;
		for(i = 0; i < this.objects.length; i++) {
			debug += this.objects[i].name + "\n";
		}
		
		debug += "\n";
		
		debug += "Rooms: " + this.rooms.length + "\n";
		var i;
		for(i = 0; i < this.rooms.length; i++) {
			debug += this.rooms[i].name + "\n";
		}
		
		alert(debug);
	}
	
	this.addSprite = function(name) {
		this.sprites[this.sprites.length] = new DSGM_Sprite(name);
		return this.sprites.length - 1;
	}
	
	this.addBackground = function(name) {
		this.backgrounds[this.backgrounds.length] = new DSGM_Background(name);
		return this.backgrounds.length - 1;
	}
	
	this.addObject = function(name) {
		this.objects[this.objects.length] = new DSGM_Object(name);
		return this.objects.length - 1;
	}
	
	this.addRoom = function(name) {
		this.rooms[this.rooms.length] = new DSGM_Room(name);
		return this.rooms.length - 1;
	}
	
	this.removeSprite = function(index) {
		this.sprites.splice(index, 1);
	}
	
	this.removeBackground = function(index) {
		this.backgrounds.splice(index, 1);
	}
	
	this.removeObject = function(index) {
		this.objects.splice(index, 1);
	}
	
	this.removeRoom = function(index) {
		this.rooms.splice(index, 1);
	}
}

function DSGM_Sprite(name) {
	this.name = name;
}

function DSGM_Background(name) {
	this.name = name;
}

function DSGM_Object(name) {
	this.name = name;
}

function DSGM_Room(name) {
	this.name = name;
}

function UpdateUI(project) {
	var i;
	
	//var projectName = document.querySelector('[data-role="project-name"]');
	//projectName.innerHTML = project.name;
	
	var spritesList = document.querySelector('[data-role="sprites-list"]');
	spritesList.innerHTML = "";
	for(i = 0; i < project.sprites.length; i++) {
		spritesList.innerHTML += "<ul>" + project.sprites[i].name + "</ul>"
	}
	
	var backgroundsList = document.querySelector('[data-role="backgrounds-list"]');
	backgroundsList.innerHTML = "";
	for(i = 0; i < project.backgrounds.length; i++) {
		backgroundsList.innerHTML += "<ul>" + project.backgrounds[i].name + "</ul>"
	}
	
	var objectsList = document.querySelector('[data-role="objects-list"]');
	objectsList.innerHTML = "";
	for(i = 0; i < project.objects.length; i++) {
		objectsList.innerHTML += "<ul>" + project.objects[i].name + "</ul>"
	}
	
	var roomsList = document.querySelector('[data-role="rooms-list"]');
	roomsList.innerHTML = "";
	for(i = 0; i < project.rooms.length; i++) {
		roomsList.innerHTML += "<ul>" + project.rooms[i].name + "</ul>"
	}
}

function ProjectClass() {

	var _self = this;

	_self.name = "";
	_self.resources = [];

	this.addResource = function(name) {
	}

	this.removeResource = function(resource) {
	}

	this.load = function(project) {
		var tempProject = $.parseJSON(project);
		for(var property in tempProject) _self[property] = tempProject[property];
	}

	this.save = function() {
		return JSON.stringify(_self);
	}

}
function CommandClass() {

  var _self = this;

  this.handleSimulation = function(command, arguments, callback) {
    switch(command) {
      case "link":
        window.open(arguments[0]);
      case "readFile":
        switch(arguments[0]) {
          case "options/options.json":
            callback('{"language": "fr"}');
            break;
          case "options/languages/base.json":
            callback('{"name": "Base", "data": {"project-menu": "Project", "resources-menu": "Resources", "tools-menu": "Tools", "help-menu": "Help"}}');
            break;
          case "options/languages/en.json":
            callback('{"name": "English", "data": {}}');
            break;
          case "options/languages/fr.json":
            callback('{"name": "French", "data": {"yes": "Oui", "no": "Non", "ok": "OK"}}');
            break;
        }
        break;
    }
  }

  this.handleBrowser = function(command, arguments, callback) {

  }

  this.handleDesktop = function(command, arguments, callback) {

  }

  //Handler (function reference)
  _self.request = _self.handleSimulation;

}
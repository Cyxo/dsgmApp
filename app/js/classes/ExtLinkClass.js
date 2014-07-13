function ExtLinkClass() {

  var _self = this;

  this.request = function(command, arguments, callback) {
    //Temporary Simulation
    if (command == "readFile") {

      switch(arguments) {
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

    }

  }

}
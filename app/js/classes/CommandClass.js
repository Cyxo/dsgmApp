function SimulationHandler() {

  var _self = this;
  _self.name = "simulation";

  _self.handle = function(command, arguments, callback) {
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

}

function DesktopHandler() {

  var _self = this;
  _self.name = "desktop";

  _self.handle = function(command, arguments, callback) {
    //Write Request
    $("#CommandRequestCommand").html(command);
    $("#CommandRequestArguments").empty();
    $.each(arguments, function(index, argument) {
      $("#CommandRequestArguments").append($("<li>" + argument + "</li>"));
    });
    //Bind
    $("#CommandResponse").unbind("click");
    $("#CommandResponse").bind("click", function() {
      callback($("#CommandResponse").html());
    });
    //Simulate
    $("#CommandResponse").html("response");
    $("#CommandResponse").click();
  }

}

function CommandClass(handlerName) {

  var _self = this;
  _self.handler = null;
  _self._handlers = [new SimulationHandler(), new DesktopHandler()];

  _self.changeHandler = function(name) {
    _self.handler = $.grep(_self._handlers, function(handler) {
      return (handler.name == name);
    })[0];

  }

  _self.request = function(command, arguments, callback) {
    _self.handler.handle(command, arguments, callback);
  }

  //Handler (function reference)
  _self.changeHandler(handlerName);

}
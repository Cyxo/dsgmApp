function SimulationHandler() {

  var _self = this;
  _self.name = "simulation";

  _self.handle = function(command, arguments) {
    switch(command) {
      case "link":
        window.open(arguments[0]);
        DSGM.Command.respond();
      case "print":
        $.each(arguments, function(index, argument) {
          console.log(argument);
        });
        DSGM.Command.respond();
      case "readFile":
        switch(arguments[0]) {
          case "store/options.json":
            DSGM.Command.respond('{"language": "fr"}');
            break;
          case "store/languages/base.json":
            DSGM.Command.respond('{"name": "Base", "data": {"project-menu": "Project", "resources-menu": "Resources", "tools-menu": "Tools", "help-menu": "Help"}}');
            break;
          case "store/languages/en.json":
            DSGM.Command.respond('{"name": "English", "data": {}}');
            break;
          case "store/languages/fr.json":
            DSGM.Command.respond('{"name": "French", "data": {"yes": "Oui", "no": "Non", "ok": "OK"}}');
            break;
        }
        break;
    }
  }

}

function DesktopHandler() {

  var _self = this;
  _self.name = "desktop";

  _self.handle = function(command, arguments) {
    //Write Request
    $("#CommandRequest")
      .attr("data-command", command)
      .empty();
    $.each(arguments, function(index, argument) {
      $("#CommandRequest").append($("<li data-argument=\"" + argument + "\"></li>"));
    });
    $("#CommandRequest").click();
  }

}

function CommandClass(handlerName) {

  var _self = this;
  _self.handler = null;
  _self._handlers = [new SimulationHandler(), new DesktopHandler()];
  _self._callback = null;

  _self.getHandlerByName = function(name) {
    return $.grep(_self._handlers, function(handler) {
      return (handler.name == name);
    })[0];
  }

  _self.changeHandler = function(name) {
    _self.handler = _self.getHandlerByName(name);
  }

  _self.request = function(command, arguments, callback, customHandlerName) {
    _self._callback = callback;
    var whichHandler = (customHandlerName ? _self.getHandlerByName(customHandlerName) : _self.handler);
    whichHandler.handle(command, arguments);
  }

  _self.respond = function(response) {
    if (_self._callback) _self._callback(response);
  }

  _self.debug = function(text) {
    _self.request("print", [text]);
  }

  //Handler (function reference)
  _self.changeHandler(handlerName);

}
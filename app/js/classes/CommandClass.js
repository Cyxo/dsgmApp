function DesktopHandler() {

  var _self = this;
  _self.name = "desktop";

  _self.handle = function(command, arguments) {
    $("#CommandRequest")
      .attr("data-command", command)
      .empty();
    $.each(arguments, function(index, argument) {
      $("#CommandRequest").append($("<li data-argument=\"" + argument.toString() + "\"></li>"));
    });
    $("#CommandRequest").click();
  }

}


function RemoteHandler() {

  var _self = this;
  _self.name = "remote";

  _self.handle = function(command, arguments) {
    //Command
    commandString = $.base64.encode(command);
    //Special Handling
    switch(command) {
      case "link":
        window.open(arguments[0]);
        MyApplication.Command.respond(false);
        return;
        break;
      case "print":
        $.each(arguments, function(index, argument) {
          console.log(argument);
        });
        MyApplication.Command.respond(false);
        return;
        break;
      case "setTitle":
        var title = arguments[0];
        var appendApplicationName = arguments[1];
        if (appendApplicationName) title += " - " + MyApplication.name;
        document.title = title;
        MyApplication.Command.respond(false);
        return;
        break;
      case "openProject":
        var projectIdentifier = "silly billy";
        MyApplication.Command.respond(projectIdentifier);
        return;
        break;
    }
    //Arguments
    arguments = $.map(arguments, function(argument, index) {
      return $.base64.encode(argument);
    });
    var argumentsString = "";
    $.each(arguments, function(index, argument) {
      argumentsString += argument + ",";
    });
    argumentsString = argumentsString.substr(0, argumentsString.length - 1);
    //URL
    var url;
    if (document.location.hostname.length == 0) {
      url = "http://localhost/";
    } else {
      url = "http://" + document.location.hostname + "/cloud/";
    }
    url += "?command=" + commandString + "&arguments=" + argumentsString;
    //Debug
    console.log(url);
    //Request
    var ajaxRequest = $.ajax(url);
    //Success
    ajaxRequest.done(function(response) {
      MyApplication.Command.respond(response);
    });
    //Failure
    ajaxRequest.fail(function() {
      MyApplication.Command.respond(false);
    });
  }

}


function CommandClass(handlerName) {

  var _self = this;

  _self.handler = null;
  _self._handlers = [new DesktopHandler(), new RemoteHandler()];
  _self._callback = null;

  _self.getHandlerByName = function(name) {
    return $.grep(_self._handlers, function(handler) {
      return (handler.name == name);
    })[0];
  }

  _self.changeHandler = function(name) {
    _self.handler = _self.getHandlerByName(name);
  }

  _self.request = function(command, arguments, callback, customHandlerName, blockUI) {
    blockUI = (blockUI ? blockUI : false);
    _self._callback = callback;
    _self._blockUI = blockUI;
    if (blockUI) {
      MyApplication.UI.startWork("Requesting", true, null, MyApplication.UI.workBlackoutDim);
    }
    var whichHandler = (customHandlerName ? _self.getHandlerByName(customHandlerName) : _self.handler);
    whichHandler.handle(command, arguments);
  }

  _self.respond = function(response) {
    var doCallback = function() {
      if (_self._callback) _self._callback(response);
    }
    if (_self._blockUI) {
      MyApplication.UI.endWork(function() {
        MyApplication.UI.statusBar.clear();
        if (!response) {
          MyApplication.UI.statusBar.setAlert("The request failed.");
        }
        doCallback();
      });
    } else {
      doCallback();
    }
  }

  _self.debug = function(text) {
    _self.request("print", [text]);
  }

  _self.requestRemote = function(command, arguments, callback, blockUI) {
    if (blockUI == undefined) blockUI = true;
    _self.request(command, arguments, callback, "remote", blockUI);
  }

  _self.changeHandler(handlerName);

}
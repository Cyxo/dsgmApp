function DialogueHelperClass() {

  var _self = this;

  _self.showGeneric = function(content, icon, callback) {
    _self.innerDialogue = new DialogueClass();
    _self.innerDialogue.content = content;
    _self.innerDialogue.icon = icon;
    _self.innerDialogue.buttons = [_self.innerDialogue.okButton];
    _self.innerDialogue.buttons[0].setHandler(callback);
    _self.innerDialogue.show();
  }

  _self.showInfo = function(content, callback) {
    _self.showGeneric(content, "info", callback);
  }

  _self.showAlert = function(content, callback) {
    _self.showGeneric(content, "alert", callback);
  }

  _self.askYesNo = function(content, icon, yesCallback, noCallback) {
    _self.innerDialogue = new DialogueClass();
    _self.innerDialogue.content = content;
    _self.innerDialogue.icon = (icon || "help");
    var yesButton = _self.innerDialogue.yesButton; yesButton.setHandler(yesCallback);
    var noButton = _self.innerDialogue.noButton; noButton.setHandler(noCallback);
    _self.innerDialogue.buttons = [yesButton, noButton];
    _self.innerDialogue.show();
  }

  _self.askYesNoCancel = function(content, icon, yesCallback, noCallback, cancelCallback) {
    _self.innerDialogue = new DialogueClass();
    _self.innerDialogue.content = content;
    _self.innerDialogue.icon = (icon || "help");
    var yesButton = _self.innerDialogue.yesButton; yesButton.setHandler(yesCallback);
    var noButton = _self.innerDialogue.noButton; noButton.setHandler(noCallback);
    var cancelButton = _self.innerDialogue.cancelButton; cancelButton.setHandler(cancelCallback);
    _self.innerDialogue.buttons = [yesButton, noButton, cancelButton];
    _self.innerDialogue.show();
  }

  _self.getInput = function(inputTitle, callback, title) {
    var getInputElement = MyApplication.UI.getMarkup("get-input");
    getInputElement.empty();
    var getInputTextBox = new TextBoxClass("", null, inputTitle, true);
    getInputElement.append(getInputTextBox.getElement());
    _self.innerDialogue = new DialogueClass(getInputElement, null, title, [], 372, null, true);
    _self.innerDialogue.buttons = [_self.innerDialogue.okButton, _self.innerDialogue.cancelButton];
    _self.innerDialogue.buttons[0].setHandler(function() {
      callback(getInputTextBox.getText());
    });
    _self.innerDialogue.buttons[1].setHandler(function() {
      callback("");
    });
    _self.innerDialogue.show(function() {
      getInputTextBox.focus();
    });
  }

}
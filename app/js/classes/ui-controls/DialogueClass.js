function DialogueClass(content, icon, title, buttons, width, height, customElement) {

  var _self = this;

  _self.yesButton = new ButtonClass(MyApplication.Language.getTerm("yes"), "yes");
  _self.noButton = new ButtonClass(MyApplication.Language.getTerm("no"), "no");
  _self.okButton = new ButtonClass(MyApplication.Language.getTerm("ok"), "yes");
  _self.cancelButton = new ButtonClass(MyApplication.Language.getTerm("cancel"));

  _self.content = (content || "");
  _self.icon = icon;
  _self.title = (title || MyApplication.name);
  if (!buttons || buttons.length == 0) buttons = [_self.okButton];
  _self.buttons = buttons;
  _self.width = (width || 620);
  _self.height = (height || 180);
  _self.customElement = ((customElement != undefined) ? customElement : false);

}

DialogueClass.prototype.showGeneric = function(content, icon, callback) {
  var _self = this;
  _self.content = content;
  _self.icon = icon;
  _self.buttons = [_self.okButton];
  _self.buttons[0].setHandler(callback);
  _self.show();
}

DialogueClass.prototype.showInfo = function(content, callback) {
  this.showGeneric(content, "info", callback);
}

DialogueClass.prototype.showAlert = function(content, callback) {
  this.showGeneric(content, "alert", callback);
}

DialogueClass.prototype.askYesNo = function(content, icon, yesCallback, noCallback) {
  var _self = this;
  _self.content = content;
  _self.icon = (icon || "help");
  var yesButton = _self.yesButton; yesButton.setHandler(yesCallback);
  var noButton = _self.noButton; noButton.setHandler(noCallback);
  _self.buttons = [_self.yesButton, _self.noButton];
  _self.show();
}

DialogueClass.prototype.askYesNoCancel = function(content, icon, yesCallback, noCallback, cancelCallback) {
  var _self = this;
  _self.content = content;
  _self.icon = (icon || "help");
  var yesButton = _self.yesButton; yesButton.setHandler(yesCallback);
  var noButton = _self.noButton; noButton.setHandler(noCallback);
  var cancelButton = _self.cancelButton; cancelButton.setHandler(cancelCallback);
  _self.buttons = [yesButton, noButton, cancelButton];
  _self.show();
}

DialogueClass.prototype.show = function() {
  var _self = this;
  var dialogueDiv = $("#Dialogue > div");
  var headerDiv = $("#Dialogue > div header");
  var contentsDiv = $("#Dialogue > div div.contents");
  var buttonsDiv = $("#Dialogue > div div.buttons");
  var divs = [contentsDiv, buttonsDiv];
  async.waterfall([
    function(next) {
      //Hide?
      if (dialogueDiv.css("display") == "block") {
        _self.hide(next, false);
      } else {
        next();
      }
    },
    function(next) {
      //Header
      headerDiv.html(_self.title ? ("<h1>" + _self.title + "</h1>") : "");
      //Erase
      $.each(divs, function(index, div) {
        div.empty();
      });
      //Size
      dialogueDiv
        .css("width", _self.width.toString() + "px")
        .css("height", _self.height.toString() + "px")
        .css("margin-left", (-1 * _self.width / 2).toString() + "px")
        .css("margin-top", (-1 * _self.height / 2).toString() + "px");
      contentsDiv
        .css("height", (_self.height - 54).toString() + "px");
      if (!_self.customElement) {
        var textSpan = $("<span" + (_self.icon ? " data-icon=\"" + _self.icon + "\"" : "") + ">" + _self.content + "</span>");
        MyApplication.UI.iconify(textSpan);
        contentsDiv.append(textSpan);
        contentsDiv
          .css("line-height", (_self.height - 54).toString() + "px")
          .addClass("contents-line");
      } else {
        contentsDiv
          .css("line-height", "normal")
          .removeClass("contents-line")
          .append(_self.content);
      }
      $.each(_self.buttons, function(index, button) {
        button.oldHandler = button.handler;
        button.setHandler(function() {
          _self.hide(button.oldHandler);
        });
        buttonsDiv.append(button.getElement());
      });
      async.waterfall([
        function(next2) {
          $("#Dialogue").fadeIn(MyApplication.UI.genericSpeed, next2);
        },
        function(next2) {
          $("#Dialogue > div").fadeIn(MyApplication.UI.genericSpeed, next2);
        }
      ]);
    }
  ]);
}

DialogueClass.prototype.hide = function(callback, fullMonty) {
  fullMonty = (fullMonty != undefined ? fullMonty : true);
  async.waterfall([
    function(next) {
      $("#Dialogue > div").fadeOut(MyApplication.UI.genericSpeed, next);
    },
    function(next) {
      if (fullMonty) {
        $("#Dialogue").fadeOut(MyApplication.UI.genericSpeed, next);
      } else {
        next();
      }
    },
    function(next) {
      if (callback) callback();
    }
  ]);
}
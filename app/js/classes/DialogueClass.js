function DialogueClass(content, icon, buttons, width, height, customElement) {

  this.content = (content || "");
  this.icon = icon;
  if (buttons == undefined) buttons = [];
  if (buttons.length == 0) buttons = [new ButtonClass("OK", "yes")];
  this.buttons = buttons;
  this.width = (width || 620);
  this.height = (height || 180);
  this.customElement = ((customElement != undefined) ? customElement : false);

}

DialogueClass.prototype.showInfo = function(content, callback) {
  var _self = this;
  _self.content = content;
  _self.icon = "info";
  _self.buttons[0].callback = callback;
  _self.show();
}

DialogueClass.prototype.askYesNo = function(content, icon, yesCallback, noCallback) {
  var _self = this;
  _self.content = content;
  _self.icon = (icon || "help");
  _self.buttons = [
    new ButtonClass("Yes", "yes", yesCallback),
    new ButtonClass("No", "no", noCallback)
  ];
  _self.show();
}

DialogueClass.prototype.askYesNoCancel = function(content, icon, yesCallback, noCallback, cancelCallback) {
  var _self = this;
  _self.content = content;
  _self.icon = (icon || "help");
  _self.buttons = [
    new ButtonClass("Yes", "yes", yesCallback),
    new ButtonClass("No", "no", noCallback),
    new ButtonClass("Cancel", null, cancelCallback)
  ];
  _self.show();
}

DialogueClass.prototype.show = function() {
  var _self = this;
  var dialogueDiv = $("#Dialogue > div");
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
        DSGM.UI.iconify(textSpan);
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
        button.addToElement(buttonsDiv);
      });
      async.waterfall([
        function(next2) {
          $("#Dialogue").fadeIn(DSGM.UI._animation_speed, next2);
        },
        function(next2) {
          $("#Dialogue > div").fadeIn(DSGM.UI._animation_speed, next2);
        }
      ]);
    }
  ]);
}

DialogueClass.prototype.hide = function(callback, fullMonty) {
  fullMonty = (fullMonty != undefined ? fullMonty : true);
  async.waterfall([
    function(next) {
      $("#Dialogue > div").fadeOut(DSGM.UI._animation_speed, next);
    },
    function(next) {
      if (fullMonty) {
        $("#Dialogue").fadeOut(DSGM.UI._animation_speed, next);
      } else {
        next();
      }
    },
    function(next) {
      if (callback) callback();
    }
  ]);
}
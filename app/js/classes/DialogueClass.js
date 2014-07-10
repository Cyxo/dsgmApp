function DialogueClass(text, icon, buttons, width, height, customText) {

  this.text = (text || "");
  this.icon = icon;
  if (buttons == undefined) buttons = [];
  if (buttons.length == 0) buttons = [new ButtonClass("OK", "yes", null)];
  this.buttons = buttons;
  this.width = (width || 620);
  this.height = (height || 180);
  this.customText = ((customText != undefined) ? customText : false);

}

DialogueClass.prototype.showInfo = function(text, callback) {
  var _self = this;
  _self.text = text;
  _self.icon = "info";
  _self.buttons[0].callback = callback;
  _self.show();
}

DialogueClass.prototype.askYesNo = function(text, icon, yesCallback, noCallback) {
  var _self = this;
  _self.text = text;
  _self.icon = (icon || "help");
  _self.buttons = [
    new ButtonClass("Yes", "yes", yesCallback),
    new ButtonClass("No", "no", noCallback)
  ];
  _self.show();
}

DialogueClass.prototype.askYesNoCancel = function(text, icon, yesCallback, noCallback, cancelCallback) {
  var _self = this;
  _self.text = text;
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
  //Erase
  $.each(divs, function(index, div) {
    div.html("");
  });
  //Size
  dialogueDiv
    .css("width", _self.width.toString() + "px")
    .css("height", _self.height.toString() + "px")
    .css("margin-left", (-1 * _self.width / 2).toString() + "px")
    .css("margin-top", (-1 * _self.height / 2).toString() + "px");
  contentsDiv
    .css("height", (_self.height - 54).toString() + "px");
  if (!_self.customText) {
    var textSpan = $("<span" + (_self.icon ? " data-icon=\"" + _self.icon + "\"" : "") + ">" + _self.text + "</span>");
    DSGM.UI.iconify(textSpan);
    textSpan.appendTo(contentsDiv);
    contentsDiv
      .css("line-height", (_self.height - 54).toString() + "px")
      .addClass("contents-line");
  } else {
    contentsDiv
      .css("line-height", "normal")
      .removeClass("contents-line");
    contentsDiv.html(_self.text);
  }  

  $.each(_self.buttons, function(index, button) {
    button.old_callback = button.callback;
    button.callback = function() {
      _self.hide(button.old_callback);
    }
    var buttonElement = button.makeElement();
    buttonElement.appendTo(buttonsDiv);
  });
  async.waterfall([
    function(next) {
      $("#Dialogue").fadeIn(DSGM.UI._animation_speed, next);
    },
    function(next) {
      $("#Dialogue > div").fadeIn(DSGM.UI._animation_speed, next);
    }
  ]);
}

DialogueClass.prototype.hide = function(callback) {
  async.waterfall([
    function(next) {
      $("#Dialogue > div").fadeOut(DSGM.UI._animation_speed, next);
    },
    function(next) {
      $("#Dialogue").fadeOut(DSGM.UI._animation_speed, next);
    },
    function(next) {
      if (callback) callback();
    }
  ]);
}
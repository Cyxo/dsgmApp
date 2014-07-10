function DialogueClass(text, icon, buttons) {

  this.text = (text || "");
  this.icon = icon;
  if (buttons == undefined) buttons = [];
  if (buttons.length == 0) buttons = [new ButtonClass("OK", "yes", null)];
  this.buttons = buttons;

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
  var jDivs = $("#Dialogue > div div");
  var divs = [];
  $.each(jDivs, function(index, jDiv) {
    var tempDiv = $(jDiv);
    tempDiv.html("");
    divs.push(tempDiv);
  });
  var textSpan = $("<span" + (_self.icon ? " data-icon=\"" + _self.icon + "\"" : "") + ">" + _self.text + "</span>");
  DSGM.UI.iconify(textSpan);
  textSpan.appendTo(divs[0]);
  $.each(_self.buttons, function(index, button) {
    button.old_callback = button.callback;
    button.callback = function() {
      _self.hide(button.old_callback);
    }
    var buttonElement = button.makeElement();
    buttonElement.appendTo(divs[1]);
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
function DialogueClass(text, icon, buttons) {

  var _self = this;
  this.text = text;
  this.icon = icon;
  if (buttons == undefined) buttons = [];
  if (buttons.length == 0) buttons = [new ButtonClass("OK", "yes", null)];
  this.buttons = buttons;

  this.show = function() {
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
    $.each(buttons, function(index, button) {
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

  this.hide = function(callback) {
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

}
function MenuClass() {

  var _self = this;
  _self._element = null;
  _self.masterItems = [];

  _self.makeElement = function() {
    var s = "<ul class=\"ui ui-menu\"></ul>";
    var element = $(s);
    return element;
  }

  _self.refresh = function() {
    _self._element.empty();
    $.each(_self.masterItems, function(index, masterItem) {
      _self._element.append(masterItem.getElement());
      masterItem.updateHandler();
    });
  }

  _self._element = _self.makeElement();
  _self.refresh();

  _self.getElement = function() {
    return _self._element;
  }

  _self.addMasterItem = function(masterItem) {
    _self.masterItems.push(masterItem);
    _self.refresh();
  }

}

function MenuMasterItemClass(text) {

  var _self = this;
  _self._element = null;
  _self.groups = [];
  _self.text = (text || "Menu Item");

  _self.makeElement = function() {
    var s = "<li><span></span><div><ul></ul></div></li>";
    var element = $(s);
    return element;
  }

  _self.updateHandler = function() {
    _self._element.unbind("mouseenter");
    _self._element.bind("mouseenter", function() {
      DSGM.UI.dropUpDown(true, $(this), $("> div", $(this)), true, true, DSGM.UI.animationSpeed, DSGM.UI.quickAnimationSpeed);
    });
    _self._element.unbind("mouseleave");
    _self._element.bind("mouseleave", function() {
      DSGM.UI.dropUpDown(false, $(this), $("> div", $(this)), true, true, DSGM.UI.animationSpeed, DSGM.UI.quickAnimationSpeed);
    });
  }

  _self.refresh = function() {
    $("> span", _self._element).html(_self.text);
    $("> div > ul", _self._element).empty();
    _self.updateHandler();
    $.each(_self.groups, function(index, group) {
      $("> div > ul", _self._element).append(group.getElement());
      group.updateHandlers();
    });
  }

  _self._element = _self.makeElement();
  _self.refresh();

  _self.getElement = function() {
    return _self._element;
  }

  _self.addGroup = function(item) {
    _self.groups.push(item);
    _self.refresh();
  }

}

function MenuGroupClass() {

  var _self = this;
  _self._element = null;
  _self.items = [];

  _self.makeElement = function() {
    var s = "<div></div>";
    var element = $(s);
    return element;
  }

  _self.refresh = function() {
    _self._element.empty();
    $.each(_self.items, function(index, item) {
      _self._element.append(item.getElement());
    });
    _self.updateHandlers();
  }

  _self.updateHandlers = function() {
    $.each(_self.items, function(index, item) {
      item.updateHandler();
    });
  }

  _self._element = _self.makeElement();
  _self.refresh();

  _self.getElement = function() {
    return _self._element;
  }

  _self.addItem = function(item, doFinishing) {
    if (doFinishing == undefined) doFinishing = true;
    _self.items.push(item);
    if (doFinishing) _self.refresh();
  }

  _self.addItems = function(items) {
    $.each(items, function(index, item) {
      _self.addItem(item, false);
    });
    _self.refresh();
  }

}

function MenuGroupItemClass(text, icon, handler) {

  var _self = this;
  _self._element = null;
  _self.text = (text || "Menu Item");
  _self.icon = (icon || "blank");

  _self.setHandler = function(handler) {
    _self.handler = handler;
    _self.updateHandler();
  }

  _self.updateHandler = function() {
    _self._element.unbind("click");
    _self._element.bind("click", function() {
      if (_self.handler != undefined) _self.handler(_self);
    });
  }

  _self.makeElement = function() {
    var s = "<li></li>";
    var element = $(s);
    return element;
  }

  _self.refresh = function() {
    if(_self.icon) _self._element.attr("data-icon", _self.icon);
    _self._element.html(_self.text);
    DSGM.UI.iconify(_self._element);
  }

  _self._element = _self.makeElement();
  _self.refresh();
  if(handler) _self.setHandler(handler);

  _self.setText = function(text) {
    _self.text = text;
    _self.refresh();
  }

  _self.setIcon = function(icon) {
    _self.icon = icon;
    _self.refresh();
  }

  _self.getElement = function() {
    return _self._element;
  }

}
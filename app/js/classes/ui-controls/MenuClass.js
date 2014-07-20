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
MenuClass.prototype = new UIPrototype();


function MenuMasterItemClass(text) {

  var _self = this;
  _self._element = null;
  _self.groups = [];
  _self.text = (text || "Menu Item");

  _self.makeElement = function() {
    var s = "<li class=\"ui-menu-master-item\"><span></span><div><ul></ul></div></li>";
    var element = $(s);
    return element;
  }

  //To Fix (Dependency)
  _self.fireDropEvents = true;
  _self.dropUpDown = function(isDown, callback) {
    if(!_self.fireDropEvents) return;
    DSGM.UI.dropUpDown(isDown, _self._element, $("> div", _self._element), true, true, DSGM.UI.genericSpeed, DSGM.UI.fastSpeed, callback);
  }

  _self.updateHandler = function() {
    _self._element.unbind("mouseenter");
    _self._element.bind("mouseenter", function() {
      _self.dropUpDown(true);
    });
    _self._element.unbind("mouseleave");
    _self._element.bind("mouseleave", function() {
      _self.dropUpDown(false);
    });
    $.each(_self.groups, function(index, group) {
      group.updateHandlers();
    });
  }

  _self.refresh = function() {
    $("> span", _self._element).html(_self.text);
    $("> div > ul", _self._element).empty();
    $.each(_self.groups, function(index, group) {
      $("> div > ul", _self._element).append(group.getElement());
    });
    _self.updateHandler();
  }

  _self._element = _self.makeElement();
  _self.refresh();

  _self.addGroup = function(item) {
    item._masterItem = _self;
    _self.groups.push(item);
    _self.refresh();
  }

}
MenuMasterItemClass.prototype = new UIPrototype();


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

  _self.addItem = function(item, doFinishing) {
    if (doFinishing == undefined) doFinishing = true;
    item._group = _self;
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
MenuGroupClass.prototype = new UIPrototype();


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
    _self._element.unbind("mouseenter");
    _self._element.bind("mouseenter", function() {
      DSGM.UI.selectify(true, $(this), false,
        DSGM.UI.getColor("obvious"),
        DSGM.UI.getColor("foreground"),
        DSGM.UI.slowSpeed
      );
    });
    _self._element.unbind("mouseleave");
    _self._element.bind("mouseleave", function() {
      DSGM.UI.selectify(false, $(this), true,
        DSGM.UI.getColor("background-light"),
        DSGM.UI.getColor("foreground"),
        DSGM.UI.fastSpeed
      );
    });
    _self._element.unbind("click");
    _self._element.bind("click", function() {
      _self._group._masterItem.dropUpDown(false, function() {
        _self._group._masterItem.fireDropEvents = true;
        if (_self.handler != undefined) _self.handler(_self);
      });
      _self._group._masterItem.fireDropEvents = false;
    });
  }

  _self.makeElement = function() {
    var s = "<li><span></span></li>";
    var element = $(s);
    return element;
  }

  _self.refresh = function() {
    var thisSpan = $($("> span", _self._element)[0]);
    if(_self.icon) thisSpan.attr("data-icon", _self.icon);
    thisSpan.html(_self.text);
    DSGM.UI.iconify(thisSpan);
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

}
MenuGroupItemClass.prototype = new UIPrototype();
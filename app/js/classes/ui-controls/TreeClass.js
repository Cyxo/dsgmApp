function TreeClass() {

  var _self = this;
  _self._element = null;
  _self.items = [];

  _self.makeElement = function() {
    var s = "<ul class=\"ui ui-tree\"></ul>";
    var element = $(s);
    return element;
  }

  _self.refresh = function() {
    _self._element.empty();
    $.each(_self.items, function(index, item) {
      _self._element.append(item.getElement());
      item.updateHandler();
    });
  }

  _self._element = _self.makeElement();
  _self.refresh();

  _self.addItem = function(item, doFinishing) {
    if (doFinishing == undefined) doFinishing = true;
    item._tree = _self;
    _self.items.push(item);
    if (doFinishing) _self.refresh();
  }

  _self.addItems = function(items) {
    $.each(items, function(index, item) {
      _self.addItem(item, false);
    });
    _self.refresh();
  }

  _self.getElement = function() {
    return _self._element;
  }

  _self.emptyItems = function() {
    _self.items.length = 0;
  }

  _self.findItemsByProperty = function(property, value) {
    return $.grep(_self.items, function(item) {
      return (item[property] == value);
    });
  }

  _self.findItemByProperty = function(property, value) {
    var items = _self.findItemsByProperty(property, value);
    var item = (items.length == 0 ? null : items[0]);
    return item;
  }

}
TreeClass.prototype = new UIPrototype();


function TreeItemClass(text, icon) {

  var _self = this;
  _self._element = null;

  _self.makeElement = function() {
    var s = "<li><span></span><ul></ul></li>";
    var element = $(s);
    return element;
  }

  _self.refresh = function() {
    var thisSpan = $($("> span", _self._element)[0]);
    thisSpan.attr("data-icon", _self.icon);
    thisSpan.html(_self.text);
    DSGM.UI.iconify(thisSpan);
    $("> ul", _self._element).empty();
    $.each(_self.items, function(index, item) {
      $("> ul", _self._element).append(item.getElement());
      item.updateHandler();
    });

  }

  _self.items = [];
  _self.text = (text || "Tree Item");
  _self.icon = icon;
  _self._element = _self.makeElement();
  _self.refresh();

  _self.addItem = function(item, doFinishing) {
    if (doFinishing == undefined) doFinishing = true;
    item._tree = _self._tree;
    _self.items.push(item);
    if (doFinishing) _self.refresh();
  }

  _self.addItems = function(items) {
    $.each(items, function(index, item) {
      _self.addItem(item, false);
    });
    _self.refresh();
  }

  _self.setText = function(text) {
    _self.text = text;
    _self.refresh();
  }

  _self.getText = function() {
    return _self.text;
  }

  _self.unselectifyHelper = function(item) {
    DSGM.UI.selectify(false, item.getElement());
    if (item.items) {
      $.each(item.items, function(index, subItem) {
        _self.unselectifyHelper(subItem);
      });
    }
  }

  _self.setHandler = function(handler) {
    _self.handler = handler;
    _self.updateHandler();
  }

  _self.updateHandler = function() {
    var thisSpan = $("> span", _self._element);
    thisSpan.unbind("click");
    thisSpan.bind("click", function() {
      var doFade = !$(this).parent().hasClass("selected");
      $.each(_self._tree.items, function(index, item) {
        _self.unselectifyHelper(item);
      });
      DSGM.UI.selectify(true, _self.getElement(), doFade);
      _self.expand();
      if (_self.handler != undefined) _self.handler(_self);
    });
    $.each(_self.items, function(index, item) {
      item.updateHandler();
    });
  }

  _self.expand = function(forceDown) {
    var ul = $("> ul", _self._element);
    if (ul.children().length > 0) {
      if (!forceDown)
        ul.slideToggle(DSGM.UI.genericSpeed)
      else
        ul.slideDown(DSGM.UI.genericSpeed);
    }
  }

  _self.select = function() {
    var thisSpan = $("> span", _self._element);
    thisSpan.trigger("click");
  }

}
TreeItemClass.prototype = new UIPrototype();
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

  _self.unselectAll = function() {
    $("li span", _self._element).removeClass("selected");
  }

  _self.emptyItems = function() {
    _self.items.length = 0;
  }

}

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

  _self.getElement = function() {
    return _self._element;
  }

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

  _self.setAttr = function(attr, value) {
    _self._element.attr("data-" + attr, value);
  }

  _self.getAttr = function(attr) {
    return _self._element.attr("data-" + attr);
  }

  _self.setHandler = function(handler) {
    _self.handler = handler;
    _self.updateHandler();
  }

  _self.updateHandler = function() {
    var thisSpan = $("> span", _self._element);
    thisSpan.unbind("click");
    thisSpan.bind("click", function() {
      _self._tree.unselectAll();
      thisSpan.addClass("selected");
      if ($("> ul", _self._element).children().length > 0) DSGM.UI.slideToggle($("> ul", _self._element));
      if (_self.handler != undefined) _self.handler(_self);
    });
    $.each(_self.items, function(index, item) {
      item.updateHandler();
    });
  }

}
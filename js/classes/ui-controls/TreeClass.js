function TreeClass() {

  var _self = this;
  _self._element = null;
  _self.items = [];
  _self.selectedItem = null;

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

}
TreeClass.prototype = new UIPrototype();


function TreeItemClass(text, icon) {

  var _self = this;
  _self._element = null;
  _self.isSelected = false;

  _self.makeElement = function() {
    var s = "<li><span></span><ul></ul></li>";
    var element = $(s);
    return element;
  }

  _self.refresh = function() {
    var thisSpan = $($("> span", _self._element)[0]);
    thisSpan.html(_self.text);
    thisSpan.attr("data-icon", _self.icon);
    MyApplication.UI.iconify(thisSpan, !_self.isSelected);
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

  _self.setText = function(text) {
    _self.text = text;
    _self.refresh();
  }

  _self.getText = function() {
    return _self.text;
  }

  _self.unselectifyHelper = function(item) {
    MyApplication.UI.selectify(false, item.getElement());
    item.isSelected = false;
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
      MyApplication.UI.selectify(true, _self.getElement(), doFade);
      _self.expand();
      _self._tree.selectedItem = _self;
      _self.isSelected = true;
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
        ul.slideToggle(MyApplication.UI.genericSpeed)
      else
        ul.slideDown(MyApplication.UI.genericSpeed);
    }
  }

  _self.select = function() {
    var thisSpan = $("> span", _self._element);
    thisSpan.trigger("click");
  }

}
TreeItemClass.prototype = new UIPrototype();
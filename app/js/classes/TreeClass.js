function TreeClass(role) {

  var _self = this;
  this._element = null;
  this.items = [];

  this.makeElement = function() {
    var s = "<ul class=\"ui ui-tree\"></ul>";
    var element = $(s);
    return element;
  }

  this.refresh = function() {
    _self._element.attr("data-role", this.role);
    _self._element.empty();
    $.each(this.items, function(index, item) {
      _self._element.append(item.getElement());
    });
  }

  this._element = this.makeElement();
  this.refresh();

  this.setRole = function(role) {
    this.role = role;
    this.refresh();
  }

  this.addItem = function(item, doRefresh) {
    if (doRefresh == undefined) doRefresh = true;
    item._tree = _self;
    this.items.push(item);
    this.refresh();
  }

  this.addItems = function(items) {
    $.each(items, function(index, item) {
      _self.addItem(item, false);
    });
    _self.refresh();
  }

  this.getElement = function() {
    return _self._element;
  }

  this.unselectAll = function() {
    $("li span", this._element).removeClass("selected");
  }

}

function TreeItemClass(text, icon, handler) {

  var _self = this;
  this._element = null;

  this.makeElement = function() {
    var s = "<li><span></span><ul></ul></li>";
    var element = $(s);
    return element;
  }

  this.refresh = function() {
    var thisSpan = $($("> span", _self._element)[0]);
    thisSpan.attr("data-icon", _self.icon);
    thisSpan.html(this.text);
    DSGM.UI.iconify($("> span", _self._element));
    $("> ul", _self._element).empty();
    $.each(_self.items, function(index, item) {
      $("> ul", _self._element).append(item.getElement());
    });
  }

  this.setHandler = function(handler) {
    console.log("inside setHandler");
    //console.log($("> span", _self._element));
    //console.log($("> span", _self._element).unbind("click"));
    $("> span", _self._element).bind("click", function() {
      _self._tree.unselectAll();
      $(this).addClass("selected");
      if ($("> ul", _self._element).children().length > 0) DSGM.UI.slideToggle($("> ul", _self._element));
      handler(_self);
    });
  }

  this.items = [];
  this.text = (text || "Tree Item");
  this.icon = icon;

  this._element = this.makeElement();
  this.refresh();
  this.setHandler(handler ? handler : function(whichItem) {});

  this.getElement = function() {
    return this._element;
  }

  this.addItem = function(item, doRefresh) {
    if (doRefresh == undefined) doRefresh = true;
    item._tree = _self._tree;
    this.items.push(item);
    if (doRefresh) this.refresh();
  }

  this.addItems = function(items) {
    $.each(items, function(index, item) {
      _self.addItem(item, false);
    });
    _self.refresh();
  }

  this.setAttr = function(attr, value) {
    _self._element.attr("data-" + attr, value);
  }

  this.getAttr = function(attr) {
    return _self._element.attr("data-" + attr);
  }

}
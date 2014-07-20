function LinksClass() {

  var _self = this;
  //_self._link_base = "http://dsgamemaker.com";
  _self._link_base = "http://dsgamemaker.com/zero";
  _self._links = [
    {
      "identifier": "website",
      "url": _self._link_base + "/"
    },
    {
      "identifier": "tutorials",
      "url": _self._link_base + "/tutorials/"
    },
    {
      "identifier": "forum",
      "url": _self._link_base + "/forum/"
    }
  ];

  this.getLink = function(identifier) {
    var link = $.grep(_self._links, function(link) {
      return (link.identifier == identifier);
    })[0];
    return (link != undefined ? link : null);
  }

  this.goToLink = function(identifier) {
    var link = _self.getLink(identifier);
    if (link == null) return;
    DSGM.Command.request("link", [link.url]);
  }

  this.bindLinks = function(element) {
    $("*[data-link]", element).each(function(index, item) {
      var linkEl = $(item);
      var link = _self.getLink(linkEl.attr("data-link"));
      if (link == null) return;
      linkEl
        //.attr("href", link.url)
        .unbind("click")
        .bind("click", function() {
         _self.goToLink(link.identifier);
         return false;
        });
    });
  }

}
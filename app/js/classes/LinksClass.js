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
    },
    {
      "identifier": "james-garner",
      "url": "http://jadaradix.com/"
    },
    {
      "identifier": "chris-ertl",
      "url": "http://google.com/"
    },
    {
      "identifier": "andreas-propst",
      "url": "http://andisgamesrealm.wordpress.com/"
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
    MyApplication.Command.request("link", [link.url]);
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
function LinksClass() {

  var _self = this;
  _self._links = [
    {
      "identifier": "website",
      "url": "http://dsgamemaker.com/"
    },
    {
      "identifier": "tutorials",
      "url": "http://dsgamemaker.com/tutorials/"
    },
    {
      "identifier": "forum",
      "url": "http://dsgamemaker.com/dsgmforum/"
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
    console.log("go to: " + link.url);
  }

  this.bindLinks = function(element) {
    $("*[data-link]", element).each(function(index, item) {
      var linkEl = $(item);
      var link = _self.getLink(linkEl.attr("data-link"));
      if (link == null) return;
      linkEl
        .attr("href", link.url)
        .unbind("click")
        .bind("click", function() {
         _self.goToLink(link.identifier);
         return false;
        });
    });
  }

}
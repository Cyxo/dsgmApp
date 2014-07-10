function LinksClass(callback) {

  var _self = this;
  var _links = [
    {
      "identifier": "website",
      "url": "http://dsgamemaker.com/"
    },
    {
      "identifier": "forum",
      "url": "http://dsgamemaker.com/dsgmforum"
    }
  ];

  this.goToLink = function(identifier) {
    var link = $.grep(_links, function(link) {
      return (link.identifier == identifier);
    })[0];
    if (link == undefined) return;
    //window.location = link.url;
    console.log("java go to: " + link.url);
  }

  callback();

}
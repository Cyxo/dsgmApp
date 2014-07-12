function LanguageClass(language, callback) {

  var _languages_path = "options/languages/";
  var _language_pairs;
  var _base_object;
  var _language_object;
  var _self = this;

  //Translate
  this.getTerm = function(term) {
    var t = _language_pairs[term];
    if (t != undefined) {
      return t;
    } else {
      var t = term.substring(0, 1).toUpperCase() + term.substring(1);
      var i = 0;
      //Quick Hack
      while (i < 5) {
        t = t.replace("-", " ");
        i++;
      }
      return t;
    }
  }

  //Construct
  async.waterfall([
    function(next) {
      DSGM.ExtLink.request(
        "readFile",
        _languages_path + "base.json",
        function(response) {
          base_object = JSON.parse(response);
          next();
        }
      );
    },
    function(next) {
      DSGM.ExtLink.request(
        "readFile",
        _languages_path + language + ".json",
        function(response) {
          language_object = JSON.parse(response);
          next();
        }
      );
    },
    function(next) {
      //Populate language pairs with base object terms
      _language_pairs = base_object.data;
      //Overwrite language pairs with language object terms
      $.each(language_object.data, function(term, value) {
        _language_pairs[term] = value;
      });
      //Perform Translation
      $("*[data-translate]").each(function(index, element) {
        element = $(element);
        if(element.attr("data-no-translate") == undefined){
          element.html(_self.getTerm(element.attr("data-translate")));
        }
      });
      next();
    },
    function(next) {
      callback();
    }
  ]);

}
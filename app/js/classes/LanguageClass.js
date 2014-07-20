function LanguageClass(language, callback) {

  var _languages_path = "store/languages/";
  var _language_pairs;
  var _base_object;
  var _language_object;
  var _self = this;

  //Translate
  this.getTerm = function(term) {
    var t = _language_pairs[term];
    if (t == undefined) {
      var words = $.map(term.split("-"), function(word, index) {
        switch(word.toLowerCase()) {
          case "ds":
            word = "DS";
            break;
          case "ok":
            word = "OK";
            break;
          default:
            word = word.substring(0, 1).toUpperCase() + word.substring(1);
            break;
        }
        return word;
      });
      var t = "";
      t += "(";
      $.each(words, function(index, word) {
        t += word + " ";
      });
      t = t.substring(0, t.length - 1);
      t += ")";
    }
    return t;
  }

  //Construct
  async.waterfall([
    function(next) {
      MyApplication.Command.request(
        "readFile", [_languages_path + "base.json"],
        function(response) {
          base_object = JSON.parse(response);
          next();
        }
      );
    },
    function(next) {
      MyApplication.Command.request(
        "readFile", [_languages_path + language + ".json"],
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
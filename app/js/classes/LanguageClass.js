function LanguageClass(language, callback) {

  //Private variables
  var _languages_path = "options/languages/";
  var _language_pairs;
  var _base_object;
  var _language_object;

  //Construct
  async.waterfall([
    function(next) {
      $.javaLink.request(
        "readFile",
        _languages_path + "base.json",
        function(response) {
          base_object = JSON.parse(response);
          next();
        }
      );
    },
    function(next) {
      $.javaLink.request(
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
      next();
    },
    function(next) {
      callback();
    }
  ]);

  //Translate
  this.getTerm = function(term) {
    var t = _language_pairs[term];
    return ((t !== undefined) ? t : term.substring(0, 1).toUpperCase() + term.substring(1));
  }

}
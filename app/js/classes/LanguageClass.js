function LanguageClass(language, callback) {

  var _self = this;

  _self._language_pairs = {};
  _self._base_data = {};
  _self._language_data = {};

  //Translate
  this.getTerm = function(term, replacements) {
    var t = _self._language_pairs[term];
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
    if (replacements) {
      $.each(replacements, function(index, replacement) {
        t = t.replace("[" + index.toString() + "]", replacement);
      });
    }
    return t;
  }

  //Construct
  async.waterfall([
    function(next) {
      MyApplication.Command.request(
        "getLanguage", ["base"],
        function(response) {
          _self._base_data = JSON.parse(response);
          next();
        }
      );
    },
    function(next) {
      MyApplication.Command.request(
        "getLanguage", [language],
        function(response) {
          _self._language_data = JSON.parse(response);
          next();
        }
      );
    },
    function(next) {
      //Populate language pairs with base object terms
      _self._language_pairs = _self._base_data;
      //Overwrite language pairs with language object terms
      $.each(_self._language_data, function(term, value) {
        _self._language_pairs[term] = value;
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
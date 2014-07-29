function ApplicationClass(name, commandHandler) {

  var _self = this;
  _self.name = (name || "My Application");
  if(commandHandler == undefined) {
    if(window.location.hash) {
      commandHandler = window.location.hash.substring(1);
    } else {
      commandHandler = "remote";
    }
  }

  async.waterfall([
    function(next) {
      _self.Links = new LinksClass();
      _self.Command = new CommandClass(commandHandler);
      _self.Command.request("setTitle", [_self.name, false]);
      _self.Options = new OptionsClass(next);
    },
    function(next) {
      _self.Language = new LanguageClass(_self.Options.getOption("language"), next);
    },
    function(next) {
      _self.UI = new UIClass(next);
    },
    function(next) {
      //Start Loading
      _self.UI.startWork(null, false, next, _self.UI.workBlackoutFull);
    },
    function(next) {
      //Get Version
      _self.Command.request("getVersion", [], function(version) {
        if (version.length == 0) version = "?.?.?";
        $("*[data-role=markup-about] span.version").html(version);
        _self.version = version;
        next();
      });
    },
    function(next) {
      //Term Validation
      _self.initTermValidation();
      //Resources
      _self.Resources = new ResourcesClass();
      //Make UI Controls
      _self.UI.makeOrb();
      _self.UI.makeMainMenu();
      _self.UI.makeResourcesTree();
      _self.UI.makeDialogueHelper();
      _self.UI.makeStatusBar();
      //New Project
      _self.currentProject = new ProjectClass();
      _self.Resources.influentialSelect();
      //Bind Links
      _self.Links.bindLinks(document.body);
      //Next
      next();
    },
    function(next) {
      //End Loading
      _self.UI.endWork(next);
    }
  ]);

  _self.somethingToIndex = function(somethings, something) {
    var index = null;
    $.each(somethings, function(lIndex, lSomething) {
      if (lSomething == something) {
        index = lIndex;
        return;
      }
    });
    return index;
  }

  _self._allowedCharacters = [];
  _self._forbiddenStartCharacters = [];
  _self._forbiddenTerms = ["char", "int", "if", "for"];
  _self.initTermValidation = function() {
    var allowedCharactersString = "abcdefghijklmnopqrstuvwxyz1234567890_";
    var forbiddenStartCharactersString = "1234567890";
    for (var cIndex = 0; cIndex < allowedCharactersString.length; cIndex++) {
      _self._allowedCharacters.push(allowedCharactersString[cIndex]);
    }
    for (var cIndex = 0; cIndex < forbiddenStartCharactersString.length; cIndex++) {
      _self._forbiddenStartCharacters.push(forbiddenStartCharactersString[cIndex]);
    }
  }

  _self.isValidTerm = function(term) {
    //Forbidden: Too Short
    if (term.length == 0) {
      return false;
    }
    //Forbidden: Too Long
    if (term.length > 20) {
      return false;
    }
    //Forbidden: Start Character
    if ($.inArray(term[0], _self._forbiddenStartCharacters) > -1) return false;
    //Forbidden: Any Character
    for (var termIndex = 0; termIndex < term.length; termIndex++) {
      if ($.inArray(term[termIndex].toLowerCase(), _self._allowedCharacters) == -1) return false;
    }
    //Forbidden: Fixed Terms
    if ($.inArray(term, _self._forbiddenTerms) > -1) return false;
    //Allowed
    return true;
  }

}
function OptionsClass(callback) {

  //Private Variables
  var _options;
  var _options_path = "options/options.json";

  //Load
  this.load = function(callback) {
    $.javaLink.request(
      "readFile",
      _options_path,
      function(response) {
        _options = JSON.parse(response);
        callback();
      }
    );
  }

  //Construct
  this.load(callback);

  //Save
  this.save = function(callback) {
    $.javaLink.request(
      "writeFile",
      JSON.stringify(_options),
      callback
    );
  }

  //Get
  this.getOption = function(option) {
    return _options[option];
  }

  //Set
  this.setOption = function(option, value) {
    _options[option] = value;
    this.save();
  }

}
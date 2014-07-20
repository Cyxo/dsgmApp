function OptionsClass(callback) {

  var _options;
  var _options_path = "store/options.json";

  //Load
  this.load = function(callback) {
    MyApplication.Command.request(
      "readFile", [_options_path],
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
    MyApplication.Comms.request("writeFile", JSON.stringify(_options), callback);
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
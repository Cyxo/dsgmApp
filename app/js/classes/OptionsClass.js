function OptionsClass(callback) {

  var _options;

  //Load
  this.load = function(callback) {
    MyApplication.Command.request(
      "getOptions", [],
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
    MyApplication.Comms.request("setOptions", JSON.stringify(_options), callback);
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
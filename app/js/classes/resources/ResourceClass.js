function ResourceClass() {

  var _self = this;
  _self.name = "New Resource";

  _self.setName = function(name) {
    console.log(name);
    _self.name = name;
  }

}
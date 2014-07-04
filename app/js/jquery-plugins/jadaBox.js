$.jadaBox = function($) {

  //Request
  function _request(command, arguments, callback) {

    var use_java = false;

    if (use_java) {

      javaJadaBox.handle(command, arguments);
      //Instantaneous response simulation
      callback();

    } else {

      if (command == "readFile") {
        switch(arguments) {
          case "options/options.json":
            callback('{"languages": [], "language": "fr"}');
            break;
          case "options/languages/base.json":
            callback('{"name": "Base", "data": {"file": "File", "edit": "Edit"}}');
            break;
          case "options/languages/en.json":
            callback('{"name": "English", "data": {}}');
            break;
          case "options/languages/fr.json":
            callback('{"name": "French", "data": {"file": "Fichier"}}');
            break;
        }
      } else if (command == "writeFile") {
        console.log("Write to file " + arguments + "!");
      }

   }
  }

  //Expose
  return {
    request: _request
  };

}(jQuery);
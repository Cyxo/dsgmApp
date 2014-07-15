public class Handler {

  public String request(String command, String[] arguments) {
    String response = "";

    switch(command) {
      case "link":
        System.out.println("open " + arguments[0]);
        break;
      case "print":
        for (String argument : arguments) {
          System.out.println(argument);
        }
        break;
      case "readFile":
        switch(arguments[0]) {
          case "store/options.json":
            response = "{\"language\": \"fr\"}";
            break;
          case "store/languages/base.json":
            response = "{\"name\": \"Base\", \"data\": {\"project-menu\": \"Project\", \"resources-menu\": \"Resources\", \"tools-menu\": \"Tools\", \"help-menu\": \"Help\"}}";
            break;
          case "store/languages/en.json":
            response = "{\"name\": \"English\", \"data\": {}}";
            break;
          case "store/languages/fr.json":
            response = "{\"name\": \"French\", \"data\": {\"yes\": \"Oui\", \"no\": \"Non\", \"ok\": \"OK\"}}";
            break;
        }
        break;
    }

    return response;

  }

}
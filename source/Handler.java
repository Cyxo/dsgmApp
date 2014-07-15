import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.charset.StandardCharsets;
import java.io.IOException;

public class Handler {

  public String readFile(String path) {
    try {
      return new String(Files.readAllBytes(Paths.get(path)), StandardCharsets.UTF_8);
    } catch (IOException error) {
      return "";
    }
  }

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
        response = readFile("app/" + arguments[0]);
        break;
        // switch(arguments[0]) {
        //   case "store/options.json":
        //     response = "{\"language\": \"fr\"}";
        //     break;
        //   case "store/languages/base.json":
        //     response = "{\"name\": \"Base\", \"data\": {\"project-menu\": \"Project\", \"resources-menu\": \"Resources\", \"tools-menu\": \"Tools\", \"help-menu\": \"Help\"}}";
        //     break;
        //   case "store/languages/en.json":
        //     response = "{\"name\": \"English\", \"data\": {}}";
        //     break;
        //   case "store/languages/fr.json":
        //     response = "{\"name\": \"French\", \"data\": {\"yes\": \"Oui\", \"no\": \"Non\", \"ok\": \"OK\"}}";
        //     break;
        // }
        // break;
    }

    return response;

  }

}
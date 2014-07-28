import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.charset.StandardCharsets;
import java.io.IOException;

import javafx.application.Application;
import javafx.application.HostServices;


public class Handler {


  private HostServices hostServices;
  public void setHostServices(HostServices hostServices) {
    this.hostServices = hostServices;
  }


  public Boolean stringToBoolean(String value) {
    return (!(value.equals("false") || value.equals("0")));
  }


  private String readFile(String path) {
    path = "app/store/" + path;
    try {
      return new String(Files.readAllBytes(Paths.get(path)), StandardCharsets.UTF_8);
    } catch (IOException error) {
      return "";
    }
  }


  private void openUrl(String url) {
    hostServices.showDocument(url);
  }


  public String request(String command, String[] arguments) {

    String response = "";

    switch(command) {

      case "print":
        for (String argument : arguments) {
          System.out.println(argument);
        }
        break;

      case "link":
        openUrl(arguments[0]);
        break;

      case "setTitle":
        String title = arguments[0];
        Boolean appendApplicationName = stringToBoolean(arguments[1]);
        if (appendApplicationName) title += " - " + DSGameMaker.appName;
        DSGameMaker.setTitle(title);
        break;

      case "getOptions":
        response = readFile("options.json");
        break;

      case "getLanguage":
        response = readFile("languages/" + arguments[0] + ".json");
        break;

      case "getVersion":
        //To Do
        response = "x.y.z";
        break;

      case "openProjectGetIdentifier":
        response = "Mario Quest";
        break;

      case "getProjects":
        //Remote Only
        break;

      case "openProjectGetStringFromIdentifier":
        response = readFile(arguments[0] + ".dsgm");
        break;

      case "saveProject":
        String path = arguments[0];
        String data = arguments[1];
        break;

    }

    return response;

  }


}
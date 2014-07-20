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


  public String readFile(String path) {
    try {
      return new String(Files.readAllBytes(Paths.get(path)), StandardCharsets.UTF_8);
    } catch (IOException error) {
      return "";
    }
  }


  public void openUrl(String url) {
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
      case "readFile":
        response = readFile("app/" + arguments[0]);
        break;
    }

    return response;

  }


}
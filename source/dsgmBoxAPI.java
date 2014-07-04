package dsgmBoxPackage;

public class dsgmBoxAPI {

  public void handle(String command, String arguments) {
    switch(command) {
      case "saySomething":
        System.out.println(arguments);
        break;
    }
  }

}
//Generic
import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.layout.Pane;
import javafx.stage.Stage;
import javafx.scene.web.WebEngine;
import javafx.scene.web.WebView;

//Paths
import java.io.File;
import java.net.URL;
import java.net.MalformedURLException;

//Document State
import javafx.concurrent.Worker.State;
import javafx.beans.value.ObservableValue;
import javafx.beans.value.ChangeListener;

//Document Object Model
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.events.Event;
import org.w3c.dom.events.EventListener;
import org.w3c.dom.events.EventTarget;

public class DSGameMaker extends Application {

  private static int appWidth = 1024;
  private static int appHeight = 768;
  private static String appTitle = "DS Game Maker";

  //Stage Object Reference
  private static Stage mainStage;

  //Bootstrapper
  public static void main(String[] args) {
    launch(args);
  }

  public void request(String command, String[] arguments) {
    switch(command) {
      case "print":
        for (String argument : arguments) {
          System.out.println(argument);
        }
        break;
    }
  }

  //Override Application Start
  @Override public void start(final Stage passedStage) throws MalformedURLException {

    //Stage Object Reference
    this.mainStage = passedStage;

    //Create Pane and add Controls
    Pane thePane = new Pane();

    //Create Web View
    WebView theView = new WebView();
    theView.setMinSize(this.appWidth, this.appHeight);
    theView.setPrefSize(this.appWidth, this.appHeight);
    thePane.getChildren().add(theView);

    //Create Web Engine
    WebEngine theEngine = theView.getEngine();

    //Add the Command Browser handler
    theEngine.getLoadWorker().stateProperty().addListener(
      new ChangeListener<State>() {
        @Override
        public void changed(ObservableValue<? extends State> ov, State oldState, State newState) {   
          if (newState != State.SUCCEEDED) return;
          Document doc = theEngine.getDocument();
          Element el = doc.getElementById("CommandRequestCommand");
          EventListener listener = new EventListener() {
            public void handleEvent(Event ev) {
              NamedNodeMap elAttributes = el.getAttributes();
              String command = elAttributes.getNamedItem("data-request-command").getNodeValue();
              NodeList argumentEls = el.getChildNodes();
              Integer argumentCount = argumentEls.getLength();
              String[] arguments = new String[argumentCount];
              for (Integer i = 0; i < argumentEls.getLength(); i++) {
                arguments[i] = argumentEls.item(i).getAttributes().getNamedItem("data-argument").getNodeValue();
              }
              request(command, arguments);
              theEngine.executeScript("globalCallback();");
            }
          };
          ((EventTarget) el).addEventListener("click", listener, false);
        }
      }
    );

    //Load HTML
    File htmlFile = new File("app/test.html");
    theEngine.load(htmlFile.toURI().toURL().toString());

    //Create Scene
    Scene theScene = new Scene(thePane);

    //Configure Stage to use Scene
    this.mainStage.setTitle(this.appTitle);
    this.mainStage.setScene(theScene);
    this.mainStage.show();

  }

}

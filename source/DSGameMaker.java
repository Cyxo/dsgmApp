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

//Icon
import javafx.scene.image.Image;

public class DSGameMaker extends Application {

  public static String appName = "DS Game Maker";
  private static int appWidth = 1024;
  private static int appHeight = 768;

  //Stage Object Reference
  private static Stage mainStage;

  //Bootstrapper
  public static void main(String[] args) {
    launch(args);
  }

  private Handler handler;

  public static void setTitle(String title) {
    mainStage.setTitle(title);
  }

  //Override Application Start
  @Override public void start(final Stage passedStage) throws MalformedURLException {

    //Handler
    handler = new Handler();
    handler.setHostServices(this.getHostServices());

    //Stage Object Reference
    mainStage = passedStage;

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
          Element el = doc.getElementById("CommandRequest");
          EventListener listener = new EventListener() {
            public void handleEvent(Event ev) {
              NamedNodeMap elAttributes = el.getAttributes();
              String command = elAttributes.getNamedItem("data-command").getNodeValue();
              NodeList argumentEls = el.getChildNodes();
              Integer argumentCount = argumentEls.getLength();
              String[] arguments = new String[argumentCount];
              for (Integer i = 0; i < argumentEls.getLength(); i++) {
                arguments[i] = argumentEls.item(i).getAttributes().getNamedItem("data-argument").getNodeValue();
              }
              String response = handler.request(command, arguments);
              response = response.replace("'", "\\'");
              response = response.replace("\"", "\\\"");
              response = response.replace(System.getProperty("line.separator"), "\\n");
              response = response.replace("\n", "\\n");
              response = response.replace("\r", "\\n");
              theEngine.executeScript("MyApplication.Command.respond('" + response + "');");
            }
          };
          ((EventTarget) el).addEventListener("click", listener, false);
        }
      }
    );

    //Load HTML
    File htmlFile = new File("app/index.html");
    theEngine.load(htmlFile.toURI().toURL().toString() + "#desktop");

    //Create Scene
    Scene theScene = new Scene(thePane);

    //Set Icon
    Image applicationIcon = new Image("file:app/img/icon.png");
    mainStage.getIcons().add(applicationIcon);

    //Set Title
    setTitle(appName);

    //Configure Stage to use Scene
    mainStage.setScene(theScene);
    mainStage.show();

  }

}

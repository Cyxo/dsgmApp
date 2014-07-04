import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.layout.Pane;
import javafx.stage.Stage;

import javafx.scene.web.WebEngine;
import javafx.scene.web.WebView;
import javafx.event.EventHandler;
import javafx.event.ActionEvent;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import netscape.javascript.JSObject;

import java.io.File;
import java.net.URL;
import java.net.MalformedURLException; 

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

		//Load HTML
		File htmlFile = new File("app/index.html");
		theEngine.load(htmlFile.toURI().toURL().toString());

		//Create Scene
		Scene theScene = new Scene(thePane);

		//Configure Stage to use Scene
		this.mainStage.setTitle(this.appTitle);
		this.mainStage.setScene(theScene);
		this.mainStage.show();

	}

}

<?php

  header("Access-Control-Allow-Origin: null");

  define("NOT_SUPPORTED", "[NOT_SUPPORTED]");
  define("NOT_UNDERSTOOD", "[NOT_UNDERSTOOD]");

  //Command
  $commandString = base64_decode($_GET['command']);
  if (strlen($commandString) == 0) {
    echo NOT_UNDERSTOOD;
    exit;
  }
  //Arguments
  $argumentsString = $_GET['arguments'];
  $arguments = array();
  if (strlen($argumentsString) > 0) {
    foreach(explode(",", $argumentsString) as $argument) {
      $arguments[] = base64_decode($argument);
    }
  }

  //Handle
  switch($commandString) {
    case "print":
      echo implode(", ", $arguments);
      break;
    case "link":
      echo NOT_SUPPORTED;
      break;
    case "readFile":
      switch($arguments[0]) {
        case "store/options.json":
          echo '{"language": "fr"}';
          break;
        case "store/languages/base.json":
          echo '{"name": "Base", "data": {"project": "Project", "resources": "Resources", "tools": "Tools", "help": "Help"}}';
          break;
        case "store/languages/en.json":
          echo '{"name": "English", "data": {}}';
          break;
        case "store/languages/fr.json":
          echo '{"name": "French", "data": {"yes": "Oui", "no": "Non"}}';
          break;
        }
      break;
    default:
      echo NOT_UNDERSTOOD;
      break;
  }

?>
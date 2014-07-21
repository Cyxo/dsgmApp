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
      $path = "../" . $arguments[0];
      if (file_exists($path)) {
        echo file_get_contents($path);
      } else {
        echo "";
      }
      break;

    case "getVersion":
      $directoryIterator = new DirectoryIterator("../store/version");
      $version = "?.?.?";
      foreach ($directoryIterator as $fileInfo) {
        if ($fileInfo->isDot()) continue;
        $version = $fileInfo->getFilename();
        break;
      }
      echo $version;
      break;

    default:
      echo NOT_UNDERSTOOD;
      break;

  }

?>
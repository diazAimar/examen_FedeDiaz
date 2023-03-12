<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once('../../Database.php');
include_once('../../Models/Modality.php');

$database = new Database();
$db = $database->connect();

$modality = new Modality($db);
$result = $modality->read();
$num = $result->rowCount();

$modalities = array(
  "modalities" => array(),
  "error" => true,
  "message" => "Couldn't list modalities."
);

if ($num > 0) {
  $modalities_arr = array();
  $modalities_arr['modalities'] = array();
  while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
    extract($row);
    $modality_item = array(
      'id' => $id,
      'description' => $description,
    );
    array_push($modalities_arr["modalities"], $modality_item);
  }
  $modalities_arr["error"] = false;
  $modalities_arr["message"] = "Modalities listed successfully.";
  echo json_encode($modalities_arr);
} else {
  echo json_encode($modalities_arr);
}

<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once('../../Database.php');
include_once('../../Models/Inscription.php');
include_once('../validations/inscription_validations.php');

$database = new Database();
$db = $database->connect();

$inscription = new Inscription($db);

$result = array(
  "inscription" => array(),
  "error" => true,
  "message" => "Failed to fetch inscription."
);


$inscription->id = isset($_GET['iid']) ? $_GET['iid'] : die();
$resvalid = validateinscriptionInfo($inscription->id, "id");
if (!$resvalid['valid']) {
  $result['message'] = $resvalid['message'];
  die(json_encode($result));
}

if ($inscription->readSingleById()) {
  $inscriptionArr = array(
    'id' => $inscription->id,
  );
  $result["inscription"] = $inscriptionArr;
  $result["error"] = false;
  $result["message"] = "Fetched inscription correctly.";
} else {
  $result["message"] = "Inscription does not exists.";
}
echo json_encode($result);

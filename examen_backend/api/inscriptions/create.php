<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/x-www-form-urlencoded');
header('Access-Control-Allow-Methods: POST');

include_once '../../Database.php';
include_once '../../Models/Inscription.php';
include_once '../../Models/Modality.php';
include_once '../validations/inscription_validations.php';

$database = new Database();
$db = $database->connect();

$inscription = new Inscription($db);
$modality = new Modality($db);
$data = json_decode(file_get_contents("php://input"));

$result = array(
  "inscription" => array(),
  "error" => true,
  "message" => "Failed to create inscription."
);

$fields = array(
  'course_id' => $data->course_id,
  'user_id' => $data->user_id,
);

foreach ($fields as $key => $value) {
  $resvalid = validateInscriptionInfo($value, $key);
  if (!$resvalid['valid']) {
    $result['message'] = $resvalid['message'];
    die(json_encode($result));
  }
}

$inscription->course_id = trim($data->course_id);
$inscription->user_id = trim($data->user_id);

if ($inscription->checkUserInscriptions()) {
  $result["message"] = "User is already enrolled to a course with that modality.";
} else {
  if ($inscription->create()) {
    $result = [
      "inscription" => $inscription,
      "error" => false,
      "message" => "Created inscription."
    ];
  }
}

die(json_encode($result));

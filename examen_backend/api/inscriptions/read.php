<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once('../../Database.php');
include_once('../../Models/Inscription.php');

$database = new Database();
$db = $database->connect();

$inscription = new Inscription($db);
$result = $inscription->read();
$num = $result->rowCount();

$inscriptions = array(
  "inscriptions" => array(),
  "error" => true,
  "message" => "Couldn't list inscriptions."
);

if ($num > 0) {
  $inscriptions_arr = array();
  $inscriptions_arr['inscriptions'] = array();
  while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
    extract($row);
    $inscription_item = array(
      'id' => $id,
      'user_id' => $user_id,
      'user_name' => $user_name,
      'user_surname' => $user_surname,
      'course_id' => $course_id,
      'course_name' => $course_name,
      'course_legajo' => $course_legajo,
      'course_modality_id' => $course_modality_id,
    );
    array_push($inscriptions_arr["inscriptions"], $inscription_item);
  }
  $inscriptions_arr["error"] = false;
  $inscriptions_arr["message"] = "inscriptions listed successfully.";
  echo json_encode($inscriptions_arr);
} else {
  echo json_encode($inscriptions_arr);
}

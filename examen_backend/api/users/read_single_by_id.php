<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once('../../Database.php');
include_once('../../Models/User.php');
include_once('../validations/user_validations.php');

$database = new Database();
$db = $database->connect();

$user = new User($db);

$result = array(
  "user" => array(),
  "error" => true,
  "message" => "Failed to fetch user."
);


$user->id = isset($_GET['uid']) ? $_GET['uid'] : die();

$resvalid = validateUserInfo($user->id, "id");
if (!$resvalid['valid']) {
  $result['message'] = $resvalid['message'];
  die(json_encode($result));
}

if ($user->readSingleById()) {
  $userArr = array(
    'id' => $user->id,
    'name' => $user->name,
    'surname' => $user->surname,
    'dni' => $user->dni,
    'gender' => $user->gender,
    'age' => $user->age,
  );
  $result["user"] = $userArr;
  $result["error"] = false;
  $result["message"] = "Fetched user correctly.";
} else {
  $result["message"] = "User does not exists.";
}
echo json_encode($result);

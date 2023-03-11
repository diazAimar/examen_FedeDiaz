<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/x-www-form-urlencoded');
header('Access-Control-Allow-Methods: POST');

include_once '../../Database.php';
include_once '../../Models/User.php';
include_once '../validations/user_validations.php';

$database = new Database();
$db = $database->connect();

$user = new User($db);
$data = json_decode(file_get_contents("php://input"));

$result = array(
  "user" => array(),
  "error" => true,
  "message" => "Failed to create user."
);

$fields = array(
  'name' => trim($data->name),
  'surname' => trim($data->surname),
  'dni' => $data->dni,
  'age' => $data->age,
  'gender' => trim($data->gender)
);

foreach ($fields as $key => $value) {
  $resvalid = validateUserInfo($value, $key);
  if (!$resvalid['valid']) {
    $result['message'] = $resvalid['message'];
    die(json_encode($result));
  }
}

$user->name = trim($data->name);
$user->surname = trim($data->surname);
$user->dni = $data->dni;
$user->age = $data->age;
$user->gender = trim($data->gender);

if ($user->dniExists()) {
  $result = [
    "user" => null,
    "error" => true,
    "message" => "DNI already exists."
  ];
} else {
  if ($user->create()) {
    $result = [
      "user" => $user,
      "error" => false,
      "message" => "Created User."
    ];
  }
}
die(json_encode($result));

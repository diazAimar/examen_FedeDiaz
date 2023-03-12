<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/x-www-form-urlencoded');
header('Access-Control-Allow-Methods: PUT');

include_once '../../Database.php';
include_once '../../Models/User.php';
include_once '../validations/user_validations.php';

$database = new Database();
$db = $database->connect();

$user = new User($db);
$data = json_decode(file_get_contents("php://input"));

$user->id = $data->id;

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

$user->name = $data->name;
$user->surname = $data->surname;
$user->dni = $data->dni;
$user->age = $data->age;
$user->gender = $data->gender;

if ($user->dniExists($user->id)) {
  $result["message"] = "DNI already exists.";
} else {
  if ($user->update()) {
    $result = [
      "user" => $user,
      "error" => false,
      "message" => "User updated."
    ];
  }
}
echo json_encode($result);

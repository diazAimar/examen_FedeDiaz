<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/x-www-form-urlencoded');
header('Access-Control-Allow-Methods: POST');

include_once '../../Database.php';
include_once '../../Models/User.php';

$database = new Database();
$db = $database->connect();

$user = new User($db);
$data = json_decode(file_get_contents("php://input"));

$result = array(
  "user" => array(),
  "error" => true,
  "message" => "Failed to create user."
);

$user->name = $data->name;
$user->surname = $data->surname;
$user->dni = $data->dni;
$user->age = $data->age;
$user->gender = $data->gender;

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
echo json_encode($result);

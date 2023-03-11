<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: DELETE');

include_once '../../Database.php';
include_once '../../Models/User.php';

$database = new Database();
$db = $database->connect();

$user = new User($db);

$data = json_decode(file_get_contents("php://input"));
$user->id = $data->id;

$result = [
  "error" => true,
  "message" => "Failed to delete user."
];
if ($user->id && $user->readSingleById()) {
  if ($user->id && $user->delete()) {
    $result = [
      "error" => false,
      "message" => "User deleted."
    ];
  }
} else {
  $result["message"] = "User does not exists.";
}
echo json_encode($result);

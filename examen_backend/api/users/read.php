<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once('../../Database.php');
include_once('../../Models/User.php');

$database = new Database();
$db = $database->connect();
$params = "";
if (isset($_POST["params"])) {
  $params = $_POST["params"];
}
$user = new User($db);
$res = $user->read($params);
$num = $res->rowCount();

$users_arr = array(
  "users" => array(),
  "error" => true,
  "message" => "Couldn't list users."
);

if ($num > 0) {
  while ($row = $res->fetch(PDO::FETCH_ASSOC)) {
    extract($row);
    $user_item = array(
      'id' => $id,
      'name' => $name,
      'surname' => $surname,
      'dni' => $dni,
      'gender' => $gender,
      'age' => $age,
    );
    array_push($users_arr["users"], $user_item);
  }
  $users_arr["error"] = false;
  $users_arr["message"] = "User listed successfully.";
  echo json_encode($users_arr);
} else {
  echo json_encode(
    $users_arr
  );
}

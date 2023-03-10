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
$res = $user->list($params);
$num = $res->rowCount();

if ($num > 0) {
  $users_arr = array();
  $users_arr["data"] = array();
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
    array_push($users_arr["data"], $user_item);
  }
  echo json_encode($users_arr);
} else {
  echo json_encode(
    array("message" => 'No Users Found')
  );
}

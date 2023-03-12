<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once('../../Database.php');
include_once('../../Models/Course.php');

$database = new Database();
$db = $database->connect();

$course = new Course($db);
$result = $course->read();
$num = $result->rowCount();

$courses = array(
  "courses" => array(),
  "error" => true,
  "message" => "Couldn't list courses."
);

if ($num > 0) {
  $courses_arr = array();
  $courses_arr['courses'] = array();
  while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
    extract($row);
    $course_item = array(
      'id' => $id,
      'legajo' => $legajo,
      'name' => $name,
      'description' => $description,
      'modality_id' => $modality_id,
      'modality_description' => $modality_description,
    );
    array_push($courses_arr["courses"], $course_item);
  }
  $courses_arr["error"] = false;
  $courses_arr["message"] = "Courses listed successfully.";
  echo json_encode($courses_arr);
} else {
  echo json_encode($courses_arr);
}

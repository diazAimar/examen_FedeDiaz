<?php

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once('../../Database.php');
include_once('../../Models/Course.php');
include_once('../validations/course_validations.php');

$database = new Database();
$db = $database->connect();

$course = new Course($db);

$result = array(
  "course" => array(),
  "error" => true,
  "message" => "Failed to fetch course."
);


$course->id = isset($_GET['cid']) ? $_GET['cid'] : die();
$resvalid = validatecourseInfo($course->id, "id");
if (!$resvalid['valid']) {
  $result['message'] = $resvalid['message'];
  die(json_encode($result));
}

if ($course->readSingleById()) {
  $courseArr = array(
    'id' => $course->id,
    'legajo' => $course->legajo,
    'name' => $course->name,
    'description' => $course->description,
    'modality_id' => $course->modality_id,
  );
  $result["course"] = $courseArr;
  $result["error"] = false;
  $result["message"] = "Fetched course correctly.";
} else {
  $result["message"] = "Course does not exists.";
}
echo json_encode($result);

<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: DELETE');

include_once '../../Database.php';
include_once '../../Models/Course.php';
include_once '../validations/course_validations.php';

$database = new Database();
$db = $database->connect();

$course = new Course($db);

$data = json_decode(file_get_contents("php://input"));
$course->id = $data->id;

$result = [
  "error" => true,
  "message" => "Failed to delete course."
];

$resvalid = validatecourseInfo($course->id, "id");
if (!$resvalid['valid']) {
  $result['message'] = $resvalid['message'];
  die(json_encode($result));
}

if ($course->id && $course->readSingleById()) {
  if ($course->id && $course->delete()) {
    $result = [
      "error" => false,
      "message" => "Course deleted."
    ];
  }
} else {
  $result["message"] = "Course does not exists.";
}
echo json_encode($result);

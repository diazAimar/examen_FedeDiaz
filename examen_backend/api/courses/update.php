<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/x-www-form-urlencoded');
header('Access-Control-Allow-Methods: PUT');

include_once '../../Database.php';
include_once '../../Models/Course.php';
include_once '../../Models/Modality.php';
include_once '../validations/course_validations.php';

$database = new Database();
$db = $database->connect();

$course = new Course($db);
$modality = new Modality($db);
$data = json_decode(file_get_contents("php://input"));

$course->id = $data->id;

$result = array(
  "course" => array(),
  "error" => true,
  "message" => "Failed to update course."
);

$fields = array(
  'legajo' => trim($data->legajo),
  'name' => trim($data->name),
  'description' => trim($data->description),
  'modality_id' => $data->modality_id,
);

foreach ($fields as $key => $value) {
  $resvalid = validatecourseInfo($value, $key);
  if (!$resvalid['valid']) {
    $result['message'] = $resvalid['message'];
    die(json_encode($result));
  }
}

$course->legajo = trim($data->legajo);
$course->name = trim($data->name);
$course->description = trim($data->description);
$course->modality_id = $data->modality_id;

$modality->id = $data->modality_id;
if ($course->legajoExists($course->id)) {
  $result["message"] = "Legajo already exists.";
} else if ($course->nameExists($course->id)) {
  $result["message"] = "Name already exists.";
} else if (!$modality->readSingleById()) {
  $result["message"] = "Modality does not exists.";
} else {
  if ($course->update()) {
    $result = [
      "course" => $course,
      "error" => false,
      "message" => "Updated course."
    ];
  }
}
echo json_encode($result);

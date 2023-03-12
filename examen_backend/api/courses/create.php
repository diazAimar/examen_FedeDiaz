<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Content-Type: application/x-www-form-urlencoded');
header('Access-Control-Allow-Methods: POST');

include_once '../../Database.php';
include_once '../../Models/Course.php';
include_once '../validations/course_validations.php';

$database = new Database();
$db = $database->connect();

$course = new Course($db);
$data = json_decode(file_get_contents("php://input"));

$result = array(
  "course" => array(),
  "error" => true,
  "message" => "Failed to create course."
);

$course->legajo = trim($data->legajo);
$course->name = trim($data->name);
$course->description = trim($data->description);
$course->modality_id = $data->modality_id;

if ($course->create()) {
  $result = [
    "course" => $course,
    "error" => false,
    "message" => "Created course."
  ];
}
die(json_encode($result));

<?php

function validateCourseInfo($value, $fieldName)
{
  $res = array(
    "valid" => false,
  );
  if (!isset($value) || empty($value)) {
    $res["message"] = ucfirst($fieldName) . " is required.";
    return $res;
  } else {
    switch ($fieldName) {
      case "legajo":
      case "name":
        if (strlen($value) > 100) {
          $res["message"] = ucfirst($fieldName) . " must be under 100 characters long.";
          return $res;
        }
        break;
      case "description":
        if (strlen($value) > 200) {
          $res["message"] = ucfirst($fieldName) . " must be under 200 characters long.";
          return $res;
        }
        break;
      case "modality_id":
        if ($value < 1) {
          $res["message"] = "Please choose a modality.";
          return $res;
        }
        break;
      case "default":
        break;
    }
  }
  $res["valid"] = true;
  $res["message"] = 'Valid ' . $fieldName . '.';
  return $res;
}

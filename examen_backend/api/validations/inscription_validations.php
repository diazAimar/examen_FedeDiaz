<?php

function validateInscriptionInfo($value, $fieldName)
{
  $res = array(
    "valid" => false,
  );
  if (!isset($value) || empty($value)) {
    $res["message"] = ucfirst($fieldName) . " is required.";
    return $res;
  } else {
    switch ($fieldName) {
      case "course_id":
      case "user_id":
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

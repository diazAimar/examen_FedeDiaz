<?php

function validateUserInfo($value, $fieldName)
{
  $res = array(
    "valid" => false,
  );
  if (!isset($value) || empty($value)) {
    $res["message"] = ucfirst($fieldName) . " is required.";
    return $res;
  } else {
    switch ($fieldName) {
      case "name":
      case "surname":
        if (strlen($value) > 255) {
          $res["message"] = ucfirst($fieldName) . " is too long.";
          return $res;
        }
        break;
      case "dni":
        if ($value <= 0 || $value > 99999999) {
          $res["message"] = strtoupper($fieldName) . " must be between 1 and 99999999.";
          return $res;
        }
        break;
      case "age":
        if ($value <= 0 || $value > 199) {
          $res["message"] = ucfirst($fieldName) . " must be between 1 and 199.";
          return $res;
        }
        break;
      case "gender":
        if ($value != 'M' && $value != 'F') {
          $res["message"] = ucfirst($fieldName) . " must F (Female) or M (Male).";
          return $res;
        }
        break;
    }
  }
  $res["valid"] = true;
  $res["message"] = 'Valid ' . $fieldName . '.';
  return $res;
}

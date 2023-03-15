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
        if (strlen($value) != 8) {
          $res["message"] = strtoupper($fieldName) . " must be between 8 characters long.";
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
      case "id":
        if (!is_numeric($value) || $value < 1) {
          $res["message"] = ucfirst($fieldName) . " must be a number greater than 1";
          return $res;
        }
    }
  }
  $res["valid"] = true;
  $res["message"] = 'Valid ' . $fieldName . '.';
  return $res;
}

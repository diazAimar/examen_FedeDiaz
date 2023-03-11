<?php

function validateNameOrSurname($value, $fieldName)
{
  $res = array(
    "valid" => false,
  );
  if (!isset($value) || empty($value)) {
    $res["message"] = ucfirst($fieldName) . " is required.";
    return $res;
  } else if (strlen($value) > 255) {
    $res["message"] = ucfirst($fieldName) . " is too long.";
    return $res;
  }
  $res["valid"] = true;
  $res["message"] = 'Valid ' . $fieldName . '.';
  return $res;
}

function validateUserDni($value, $fieldName)
{
  $res = array(
    "valid" => false,
  );
  if (!isset($value) || empty($value)) {
    $res["message"] = strtoupper($fieldName) . " is required.";
    return $res;
  } else if ($value <= 0 || $value > 99999999) {
    $res["message"] = strtoupper($fieldName) . " must be between 1 and 99999999.";
    return $res;
  }
  $res["valid"] = true;
  $res["message"] = 'Valid ' . $fieldName . '.';
  return $res;
}

function validateAge($value, $fieldName)
{
  $res = array(
    "valid" => false,
  );
  if (!isset($value) || empty($value)) {
    $res["message"] = ucfirst($fieldName) . " is required.";
    return $res;
  } else if ($value <= 0 || $value > 199) {
    $res["message"] = ucfirst($fieldName) . " must be between 1 and 199.";
    return $res;
  }
  $res["valid"] = true;
  $res["message"] = 'Valid ' . $fieldName . '.';
  return $res;
}

function validateGender($value, $fieldName)
{
  $res = array(
    "valid" => false,
  );
  if (!isset($value) || empty($value)) {
    $res["message"] = ucfirst($fieldName) . " is required.";
    return $res;
  } else if ($value != 'M' && $value != 'F') {
    $res["message"] = ucfirst($fieldName) . " must F (Female) or M (Male).";
    return $res;
  }
  $res["valid"] = true;
  $res["message"] = 'Valid ' . $fieldName . '.';
  return $res;
}

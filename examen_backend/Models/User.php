<?php

class User
{
  private $conn;
  private $table = 'users';

  public $id;
  public $name;
  public $surname;
  public $dni;
  public $gender;
  public $age;
  public $created_at;
  public $updated_at;

  public function __construct($db)
  {
    $this->conn = $db;
  }

  public function list($params = "")
  {
    $array = array();

    $query = "SELECT * FROM users ";
    if ($params != "") {
      $query .= " WHERE {$params}";
    }

    $stmt = $this->conn->prepare($query);
    $stmt->execute();
    return $stmt;
  }
}

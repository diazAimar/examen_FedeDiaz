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

  public function dniExists()
  {
    $select_query = "SELECT dni FROM " . $this->table . " WHERE dni = :dni";
    $select_stmt = $this->conn->prepare($select_query);
    $select_stmt->bindParam(':dni', $this->dni);
    $select_stmt->execute();

    if ($select_stmt->rowCount() > 0) {
      return true;
    }
    return false;
  }

  public function create()
  {
    $insert_query = "INSERT INTO " . $this->table . ' SET name = :name, surname = :surname, dni = :dni, age = :age, gender = :gender';

    $insert_stmt = $this->conn->prepare($insert_query);

    $insert_stmt->bindParam(':name', $this->name);
    $insert_stmt->bindParam(':surname', $this->surname);
    $insert_stmt->bindParam(':dni', $this->dni);
    $insert_stmt->bindParam(':age', $this->age);
    $insert_stmt->bindParam(':gender', $this->gender);

    if ($insert_stmt->execute()) {
      return true;
    }

    return false;
  }
}

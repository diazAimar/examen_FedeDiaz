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

  /* Read users */
  public function read($params = "")
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

  /* Read single user by id */
  public function readSingleById()
  {
    $select_query = "SELECT * FROM " . $this->table . " WHERE id = :id";
    $select_stmt = $this->conn->prepare($select_query);
    $select_stmt->bindParam(':id', $this->id);
    $select_stmt->execute();

    $row = $select_stmt->fetch(PDO::FETCH_ASSOC);
    if (!$row) {
      return false;
    }
    $this->name = $row['name'];
    $this->surname = $row['surname'];
    $this->dni = $row['dni'];
    $this->gender = $row['gender'];
    $this->age = $row['age'];

    if ($select_stmt->rowCount() > 0) {
      return true;
    }
    return false;
  }

  /* Create user */
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

  /* Update user */
  public function update()
  {
    $update_query = "UPDATE " . $this->table . ' 
      SET 
        name = :name,
        surname = :surname,
        dni = :dni,
        age = :age,
        gender = :gender
      WHERE
        id = :id';

    $update_stmt = $this->conn->prepare($update_query);

    $update_stmt->bindParam(':name', $this->name);
    $update_stmt->bindParam(':surname', $this->surname);
    $update_stmt->bindParam(':dni', $this->dni);
    $update_stmt->bindParam(':age', $this->age);
    $update_stmt->bindParam(':gender', $this->gender);
    $update_stmt->bindParam(':id', $this->id);

    if ($update_stmt->execute()) {
      return true;
    }

    return false;
  }

  /* Delete user */
  public function delete()
  {
    $delete_query = "DELETE FROM " . $this->table . ' WHERE id=:id';

    $delete_stmt = $this->conn->prepare($delete_query);
    $delete_stmt->bindParam(':id', $this->id);

    if ($delete_stmt->execute()) {
      return true;
    }

    return false;
  }

  /* Check if dni is already used */
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
}

<?php

class Modality
{
  private $conn;
  private $table = 'modalities';

  public $id;
  public $description;
  public $created_at;
  public $updated_at;

  public function __construct($db)
  {
    $this->conn = $db;
  }

  /* Read modalities */
  public function read()
  {
    $query = 'SELECT
                *
              FROM 
                ' . $this->table;

    $stmt = $this->conn->prepare($query);

    $stmt->execute();

    return $stmt;
  }

  /* Read single modality by id */
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
    $this->description = $row['description'];

    if ($select_stmt->rowCount() > 0) {
      return true;
    }
    return false;
  }
}

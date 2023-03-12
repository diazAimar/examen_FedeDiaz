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
}

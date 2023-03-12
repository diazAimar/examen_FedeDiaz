<?php

class Course
{
  private $conn;
  private $table = 'courses';

  public $id;
  public $modality_id;
  public $modality_description;
  public $legajo;
  public $name;
  public $description;
  public $created_at;
  public $updated_at;

  public function __construct($db)
  {
    $this->conn = $db;
  }

  /* Read courses */
  public function read()
  {
    $query = 'SELECT
                m.description as modality_description,
                c.id,
                c.modality_id, 
                c.legajo, 
                c.name, 
                c.description, 
                c.created_at
              FROM 
                ' . $this->table . ' c
              LEFT JOIN
                modalities m ON c.modality_id = m.id
              ORDER BY
                c.created_at DESC';

    $stmt = $this->conn->prepare($query);

    $stmt->execute();

    return $stmt;
  }
}

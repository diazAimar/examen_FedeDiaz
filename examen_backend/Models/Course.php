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

  /* Create course */
  public function create()
  {
    $insert_query = 'INSERT INTO ' . $this->table . ' SET legajo = :legajo, name = :name, description = :description, modality_id = :modality_id';


    $insert_stmt = $this->conn->prepare($insert_query);

    $insert_stmt->bindParam(':legajo', $this->legajo);
    $insert_stmt->bindParam(':name', $this->name);
    $insert_stmt->bindParam(':description', $this->description);
    $insert_stmt->bindParam(':modality_id', $this->modality_id);
    if ($insert_stmt->execute()) {
      return true;
    }

    return false;
  }

  /* Check if legajo is already used */
  public function legajoExists($legajo = '')
  {
    $select_query = 'SELECT legajo FROM ' . $this->table . ' WHERE legajo = :legajo ';
    $legajo != '' ? $select_query .= ' AND id != ' . $legajo : '';
    $select_stmt = $this->conn->prepare($select_query);
    $select_stmt->bindParam(':legajo', $this->legajo);
    $select_stmt->execute();

    if ($select_stmt->rowCount() > 0) {
      return true;
    }
    return false;
  }

  /* Check if name is already used */
  public function nameExists($name = '')
  {
    $select_query = 'SELECT name FROM ' . $this->table . ' WHERE name = :name ';
    $name != '' ? $select_query .= ' AND id != ' . $name : '';
    $select_stmt = $this->conn->prepare($select_query);
    $select_stmt->bindParam(':name', $this->name);
    $select_stmt->execute();

    if ($select_stmt->rowCount() > 0) {
      return true;
    }
    return false;
  }
}

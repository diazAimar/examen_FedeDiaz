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

  /* Read single course by id */
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
    $this->legajo = $row['legajo'];
    $this->name = $row['name'];
    $this->description = $row['description'];
    $this->modality_id = $row['modality_id'];

    if ($select_stmt->rowCount() > 0) {
      return true;
    }
    return false;
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

  /* Update course */
  public function update()
  {
    $update_query = 'UPDATE ' . $this->table . ' 
    SET 
      legajo = :legajo,
      name = :name,
      description = :description,
      modality_id = :modality_id
    WHERE
      id = :id ';

    $update_stmt = $this->conn->prepare($update_query);
    $update_stmt->bindParam(':legajo', $this->legajo);
    $update_stmt->bindParam(':name', $this->name);
    $update_stmt->bindParam(':description', $this->description);
    $update_stmt->bindParam(':modality_id', $this->modality_id);
    $update_stmt->bindParam(':id', $this->id);

    if ($update_stmt->execute()) {
      return true;
    }

    return false;
  }

  /* Delete course */
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

  /* Check if legajo is already used */
  public function legajoExists($course_id = -1)
  {
    $select_query = "SELECT legajo FROM " . $this->table . " WHERE legajo = :legajo ";
    $course_id != -1 ? $select_query .= ' AND id != ' . $course_id : '';
    $select_stmt = $this->conn->prepare($select_query);
    $select_stmt->bindParam(':legajo', $this->legajo);
    $select_stmt->execute();
    // echo ($select_stmt->rowCount());
    if ($select_stmt->rowCount() > 0) {
      return true;
    }
    return false;
  }

  /* Check if name is already used */
  public function nameExists($course_id = -1)
  {
    $select_query = 'SELECT name FROM ' . $this->table . ' WHERE name = :name ';
    $course_id != '' ? $select_query .= ' AND id != ' . $course_id : '';
    $select_stmt = $this->conn->prepare($select_query);
    $select_stmt->bindParam(':name', $this->name);
    $select_stmt->execute();

    if ($select_stmt->rowCount() > 0) {
      return true;
    }
    return false;
  }
}

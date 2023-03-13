<?php

class Inscription
{
  private $conn;
  private $table = 'inscriptions';

  public $id;
  public $user_id;
  public $user_name;
  public $user_surname;
  public $course_id;
  public $course_name;
  public $course_legajo;
  public $course_modality_id;
  public $created_at;
  public $updated_at;

  public function __construct($db)
  {
    $this->conn = $db;
  }

  /* Read inscriptions */
  public function read()
  {
    $select_query = 'SELECT
                      i.user_id, 
                      u.name as user_name,
                      u.surname as user_surname,
                      i.course_id, 
                      c.name as course_name,
                      c.legajo as course_legajo,
                      c.modality_id as course_modality_id
                    FROM 
                      ' . $this->table . ' i
                    LEFT JOIN
                      users u ON i.user_id = u.id
                    LEFT JOIN
                      courses c ON i.course_id = c.id
                    ORDER BY
                      c.created_at DESC';

    $stmt = $this->conn->prepare($select_query);

    $stmt->execute();

    return $stmt;
  }

  /* Create inscription */
  public function create()
  {
    $insert_query = 'INSERT INTO ' . $this->table . ' SET course_id = :course_id, user_id = :user_id';


    $insert_stmt = $this->conn->prepare($insert_query);

    $insert_stmt->bindParam(':course_id', $this->course_id);
    $insert_stmt->bindParam(':user_id', $this->user_id);
    if ($insert_stmt->execute()) {
      return true;
    }

    return false;
  }

  /* Check if user is already enrolled in another course with the same modality */
  public function checkUserInscriptions($course_id = -1)
  {
    $get_course_modality = 'SELECT modality_id FROM courses WHERE id = :course_id';
    $stmt = $this->conn->prepare($get_course_modality);
    $stmt->bindParam(':course_id', $this->course_id);

    if ($stmt->execute() && $stmt->rowCount() > 0) {
      while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $this->course_modality_id = $row["modality_id"];
      }
    } else {
      return false;
    }

    $select_query = 'SELECT * FROM inscriptions WHERE user_id = :user_id AND course_id IN  (SELECT id FROM courses WHERE modality_id = :modality_id);';
    $select_stmt = $this->conn->prepare($select_query);
    $select_stmt->bindParam(':user_id', $this->user_id);
    $select_stmt->bindParam(':modality_id', $this->course_modality_id);
    $select_stmt->execute();
    if ($select_stmt->rowCount() > 0) {
      return true;
    }
    return false;
  }
}

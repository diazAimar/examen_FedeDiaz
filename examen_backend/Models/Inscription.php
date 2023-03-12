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
  public $created_at;
  public $updated_at;

  public function __construct($db)
  {
    $this->conn = $db;
  }

  /* Read inscriptions */
  public function read()
  {
    $query = 'SELECT
                i.user_id, 
                u.name as user_name,
                u.surname as user_surname,
                i.course_id, 
                c.name as course_name,
                c.legajo as course_legajo
              FROM 
                ' . $this->table . ' i
              LEFT JOIN
                users u ON i.user_id = u.id
              LEFT JOIN
                courses c ON i.course_id = c.id
              ORDER BY
                c.created_at DESC';

    $stmt = $this->conn->prepare($query);

    $stmt->execute();

    return $stmt;
  }
}

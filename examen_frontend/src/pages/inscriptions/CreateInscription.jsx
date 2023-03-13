import { useState, useEffect } from 'react';

import CreateInscriptionForm from '../../components/forms/CreateInscriptionForm';

import apiInstance from '../../instance';

export default function CreateInscription() {
  const [courses, setCourses] = useState(null);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      let result = null;
      result = await apiInstance.get('/courses/read.php');
      setCourses(result.data.courses);
    };

    const fetchUsers = async () => {
      let result = null;
      result = await apiInstance.get('/users/read.php');
      setUsers(result.data.users);
    };
    fetchCourses();
    fetchUsers();
  }, []);

  return (
    <div className="">
      <h2 className="mb-4 text-center">Create Inscription</h2>
      <CreateInscriptionForm courses={courses} users={users} />
    </div>
  );
}

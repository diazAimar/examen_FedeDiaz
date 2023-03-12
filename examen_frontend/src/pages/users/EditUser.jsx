import { useState, useEffect } from 'react';

import { useParams, useNavigate } from 'react-router-dom';

import EditUserForm from '../../components/forms/EditUserForm';

import apiInstance from '../../instance';

export default function EditUser() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserById = async () => {
      let result = null;
      result = await apiInstance.get(`/users/read_single_by_id.php?uid=${params.uid}`);
      if (result?.data.error === false) {
        setUser(result.data.user);
        setIsLoading(false);
      } else {
        navigate('/users');
      }
    };
    fetchUserById();
  }, []);

  return (
    <div className="">
      {!isLoading && user !== null ? (
        <div>
          <h2 className="mb-4 text-center">Edit User</h2>
          <EditUserForm user={user} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

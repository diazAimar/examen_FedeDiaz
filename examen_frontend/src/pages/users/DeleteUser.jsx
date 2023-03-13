import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';

import { toast } from 'react-toastify';

import apiInstance from '../../instance';

export default function DeleteUser() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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
        console.log(result.data.message);
        navigate('/users');
      }
    };
    fetchUserById();
  }, []);

  const deleteUser = async () => {
    const result = await apiInstance.delete(
      'http://localhost/examen_backend/api/users/delete.php',
      {
        data: {
          id: user.id,
        },
      }
    );
    console.log(result);
    if (result?.data.error === false) {
      toast.success(result.data.message + ' Navigating to dashboard.');
      setTimeout(() => {
        navigate('/users');
      }, 1500);
    } else if (result?.data.error === true) {
      toast.error(result.data.message);
    }
  };

  return (
    <div className="">
      {!isLoading && user !== null ? (
        <div className="w-1/3 mx-auto">
          <h2 className="py-2 px-4 bg-red-700 text-[2rem] text-white font-bold rounded-t-[.5rem]">
            Delete Confirmation
          </h2>
          <div className="bg-red-50">
            <div className="p-4 flex flex-col gap-2">
              <p>You are about to delete the user:</p>
              <Link to={`/users/edit/${user.id}`} className="link text-blue-500">
                {user.name} {user.surname} (id {user.id})
              </Link>
              <p>All asociated data will also be deleted.</p>
              <p>
                Are you sure? <span className="font-bold"> You can't undo this.</span>
              </p>
              <button
                className="btn btn-error w-1/2 capitalize"
                onClick={() => {
                  deleteUser();
                }}
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

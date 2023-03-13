import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { toast } from 'react-toastify';

import apiInstance from '../../instance';

export default function DeleteInscription() {
  const [inscription, setInscription] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserById = async () => {
      let result = null;
      result = await apiInstance.get(`/inscriptions/read_single_by_id.php?iid=${params.iid}`);
      if (result?.data.error === false) {
        setInscription(result.data.inscription);
        setIsLoading(false);
      } else {
        console.log(result.data.message);
        navigate('/inscriptions');
      }
    };
    fetchUserById();
  }, []);

  const deleteInscription = async () => {
    const result = await apiInstance.delete(
      'http://localhost/examen_backend/api/inscriptions/delete.php',
      {
        data: {
          id: inscription.id,
        },
      }
    );
    if (result?.data.error === false) {
      toast.success(result.data.message + ' Navigating to dashboard.');
      setTimeout(() => {
        navigate('/inscriptions');
      }, 1000);
    } else if (result?.data.error === true) {
      toast.error(result.data.message);
    }
  };

  return (
    <div className="">
      {!isLoading && inscription !== null ? (
        <div className="w-1/3 mx-auto">
          <h2 className="py-2 px-4 bg-red-700 text-[2rem] text-white font-bold rounded-t-[.5rem]">
            Delete Confirmation
          </h2>
          <div className="bg-red-50">
            <div className="p-4 flex flex-col gap-2">
              <p>You are about to delete the inscription:</p>
              <Link to={`/inscriptions/edit/${inscription.id}`} className="link text-blue-500">
                {inscription.name} {inscription.surname} (id {inscription.id})
              </Link>
              <p>All asociated data (inscriptions) will also be deleted.</p>
              <p>
                Are you sure? <span className="font-bold"> You can't undo this.</span>
              </p>
              <button
                className="btn btn-error w-1/2 capitalize"
                onClick={() => {
                  deleteInscription();
                }}
              >
                Delete Inscription
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

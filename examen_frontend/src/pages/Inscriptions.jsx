import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import apiInstance from '../instance';

export default function Inscriptions() {
  const [isLoading, setIsLoading] = useState(null);
  const [inscriptions, setInscriptions] = useState(null);

  useEffect(() => {
    const fetchInscriptions = async () => {
      let result = null;
      result = await apiInstance.get('/inscriptions/read.php');
      const inscriptions = result.data.inscriptions;
      setInscriptions(inscriptions);
      setIsLoading(false);
    };
    fetchInscriptions();
  }, []);

  return (
    <div className="">
      <div className="mb-8">
        <Link to="/inscriptions/create" className="btn capitalize">
          Enroll User to Course
        </Link>
        {isLoading ? (
          <p>Loading</p>
        ) : inscriptions ? (
          <div className="mt-5">
            <h3>Inscriptions:</h3>
            <div className="">
              {inscriptions.map((inscription) => {
                return (
                  <div className="flex flex-col mb-4">
                    <p key={inscription.id} className="text-[1.2rem]">
                      {inscription.course_name}{' '}
                      <Link to={`/inscriptions/delete/${inscription.id}`} className="mt-2 inline">
                        ❌
                      </Link>
                    </p>
                    <p>User: {inscription.user_name} </p>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <p>No inscriptions</p>
        )}
      </div>
    </div>
  );
}

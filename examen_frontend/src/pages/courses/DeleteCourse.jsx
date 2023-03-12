import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { toast } from 'react-toastify';

import apiInstance from '../../instance';

export default function DeleteCourse() {
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserById = async () => {
      let result = null;
      result = await apiInstance.get(`/courses/read_single_by_id.php?cid=${params.cid}`);
      if (result?.data.error === false) {
        setCourse(result.data.course);
        setIsLoading(false);
      } else {
        console.log(result.data.message);
        navigate('/courses');
      }
    };
    fetchUserById();
  }, []);

  const deleteCourse = async () => {
    console.log('fire delete');
    const result = await apiInstance.delete(
      'http://localhost/examen_backend/api/courses/delete.php',
      {
        data: {
          id: course.id,
        },
      }
    );
    console.log(result);
    if (result?.data.error === false) {
      toast.success(result.data.message + ' Navigating to dashboard.');
      setTimeout(() => {
        navigate('/courses');
      }, 1500);
    } else if (result?.data.error === true) {
      toast.error(result.data.message);
    }
  };

  return (
    <div className="">
      {!isLoading && course !== null ? (
        <div className="w-1/3 mx-auto">
          <h2 className="py-2 px-4 bg-red-700 text-[2rem] text-white font-bold rounded-t-[.5rem]">
            Delete Confirmation
          </h2>
          <div className="bg-red-50">
            <div className="p-4 flex flex-col gap-2">
              <p>You are about to delete the course:</p>
              <Link to={`/courses/edit/${course.id}`} className="link text-blue-500">
                {course.name} {course.surname} (id {course.id})
              </Link>
              <p>All asociated data (inscriptions) will also be deleted.</p>
              <p>
                Are you sure? <span className="font-bold"> You can't undo this.</span>
              </p>
              <button
                className="btn btn-error w-1/2 capitalize"
                onClick={() => {
                  deleteCourse();
                }}
              >
                Delete Course
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

import { useState, useEffect } from 'react';

import { useParams, useNavigate } from 'react-router-dom';

import EditCourseForm from '../../components/forms/EditCourseForm';

import apiInstance from '../../instance';

export default function EditCourse() {
  const [isLoading, setIsLoading] = useState(true);
  const [course, setCourse] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseById = async () => {
      let result = null;
      result = await apiInstance.get(`/courses/read_single_by_id.php?cid=${params.cid}`);
      if (result?.data.error === false) {
        setCourse(result.data.course);
        setIsLoading(false);
      } else {
        navigate('/Courses');
      }
    };
    fetchCourseById();
  }, []);

  return (
    <div className="">
      {!isLoading && course !== null ? (
        <div>
          <h2 className="mb-4 text-center">Edit Course</h2>
          <EditCourseForm course={course} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

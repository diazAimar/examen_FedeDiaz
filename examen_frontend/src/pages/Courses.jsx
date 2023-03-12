import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import CourseCard from '../components/shared/CourseCard';

import Table from '../components/Table';

import apiInstance from '../instance';

export default function Courses() {
  const [isLoading, setIsLoading] = useState(true);
  const [individualCourses, setIndividualCourses] = useState(null);
  const [groupCourses, setGroupCourses] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      let result = null;
      result = await apiInstance.get('/courses/read.php');
      const courses = result.data.courses;
      let iCourses = [];
      let gCourses = [];
      courses.map((course) => {
        course.modality_id == 1 ? gCourses.push(course) : iCourses.push(course);
      });
      setIndividualCourses(iCourses);
      setGroupCourses(gCourses);
      setIsLoading(false);
    };
    fetchUsers();
  }, []);

  return (
    <div className="">
      <div className="mb-8">
        <Link to="/courses/create" className="btn capitalize">
          Create Course
        </Link>
      </div>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <div className="flex justify-around">
          <div className="flex flex-col gap-y-8">
            {individualCourses.map((course) => {
              return <CourseCard course={course} key={course.id} />;
            })}
          </div>
          <div className="flex flex-col gap-y-8">
            {groupCourses.map((course) => {
              return <CourseCard course={course} key={course.id} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}

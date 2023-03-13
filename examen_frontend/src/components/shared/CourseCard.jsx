import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import DisplayUsername from './DisplayUsername';

export default function CourseCard({ course, inscriptions = [] }) {
  const [men, setMen] = useState(0);
  const [women, setWomen] = useState(0);
  const [minors, setMinors] = useState([]);
  const [elders, setElders] = useState([]);
  const [courseInscriptions, setCourseInscriptions] = useState(null);

  const getAndSetCourseMen = () => {
    setMen(
      inscriptions.filter(
        (inscription) => inscription.course_id === course.id && inscription.user_gender === 'M'
      )
    );
  };

  const getAndSetCourseWomen = () => {
    setWomen(
      inscriptions.filter(
        (inscription) => inscription.course_id === course.id && inscription.user_gender === 'F'
      )
    );
  };

  const getAndSetAges = () => {
    setMinors(
      inscriptions.filter(
        (inscription) => inscription.course_id === course.id && inscription.user_age < 18
      )
    );
    setElders(
      inscriptions.filter(
        (inscription) => inscription.course_id === course.id && inscription.user_age >= 18
      )
    );
  };

  useEffect(() => {
    if (inscriptions?.length > 0) {
      setCourseInscriptions(
        inscriptions.filter((inscription) => inscription.course_id === course.id)
      );
      getAndSetCourseMen();
      getAndSetCourseWomen();
      getAndSetAges();
    }
  }, []);

  return (
    <div className="w-full border-2 border-t-0 border-lapis-lazuli rounded-[.5rem]">
      <div className="text-primary-white bg-lapis-lazuli border-0 py-2 px-4 text-[rem] rounded-t-[.5rem] z-10 flex justify-between">
        {course.modality_description}
        <div>
          <Link to={`/courses/edit/${course.id}`} className="text-right">
            📝
          </Link>

          <Link to={`/courses/delete/${course.id}`} className="text-right">
            ❌
          </Link>
        </div>
      </div>
      <ul>
        <li>
          <span className="font-bold">Course: </span> {course.name}
        </li>
        <li>
          <span className="font-bold">Enrolled men / Enrolled women: </span> {men.length} /{' '}
          {women.length}
        </li>
        <li>
          <span className="font-bold">Enrolled minors / Enrolled adults: </span> {minors.length} /{' '}
          {elders.length}
        </li>
      </ul>
      <div className="mt-5 flex">
        <p>Enrolled users: &nbsp;</p>
        {courseInscriptions &&
          courseInscriptions
            .filter((inscription) => inscription.course_id === course.id)
            .map((inscription, i) => {
              return (
                <div>
                  <div key={inscription.id}>
                    <DisplayUsername delay={i * 1000}>{inscription.user_name}</DisplayUsername>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}

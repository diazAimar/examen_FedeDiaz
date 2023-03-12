import { Link } from 'react-router-dom';

export default function CourseCard({ course }) {
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
          <span className="font-bold">Enrolled men / Enrolled women: </span> X / Y
        </li>
        <li>
          <span className="font-bold">Enrolled minors / Enrolled adults: </span> X / Y
        </li>
      </ul>
    </div>
  );
}

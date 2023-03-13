import { Link } from 'react-router-dom';

export default function Inscriptions() {
  return (
    <div className="">
      <div className="mb-8">
        <Link to="/inscriptions/create" className="btn capitalize">
          Enroll User to Course
        </Link>
      </div>
    </div>
  );
}

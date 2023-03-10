import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className="border-b-2 border-primary-black mb-8">
      <div className="navbar p-0 text-neutral-content container_xl flex justify-between">
        <div>
          <Link to="/" className="btn bg-primary-black hover:bg-slate-600 border-0 capitalize">
            Home
          </Link>
        </div>
        <div className="flex gap-x-4">
          <Link
            to="/courses"
            className="btn bg-primary-black hover:bg-slate-600 border-0 capitalize"
          >
            Courses
          </Link>
          <Link to="/users" className="btn bg-primary-black hover:bg-slate-600 border-0 capitalize">
            Users
          </Link>
          <Link
            to="/inscriptions"
            className="btn bg-primary-black hover:bg-slate-600 border-0 capitalize"
          >
            Inscriptions
          </Link>
          <Link
            to="/api_users"
            className="btn bg-primary-black hover:bg-slate-600 border-0 capitalize"
          >
            Recent connected users
          </Link>
        </div>
      </div>
    </div>
  );
}

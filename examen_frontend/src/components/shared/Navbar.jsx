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
        <div>
          <div className="dropdown dropdown-hover">
            <label
              tabIndex={0}
              className="btn bg-primary-black hover:bg-slate-600 border-0 capitalize"
            >
              Courses
            </label>
            <ul
              tabIndex={0}
              className="text-primary-black transition-none dropdown-content menu p-2 shadow bg-base-100 rounded-box"
            >
              <li>
                <Link to="/courses/individual" className="hover:bg-slate-600 hover:text-white ">
                  Individual
                </Link>
              </li>
              <li>
                <Link to="/courses/group" className="hover:bg-slate-600 hover:text-white ">
                  Group
                </Link>
              </li>
            </ul>
          </div>
          <Link
            to="/users"
            className="btn bg-primary-black hover:bg-slate-600 border-0 capitalize mx-4"
          >
            Users
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

import { Link } from 'react-router-dom';
import '../styles/Table.css';

export default function DaisyUITable({ users, search, fromdb = false }) {
  return (
    <div className="h-[680px]">
      <div className="table_container">
        <table className="w-full text-left rounded-t-[.5rem] rounded-b-[.5rem] overflow-hidden">
          <thead>
            <tr className="bg-lapis-lazuli text-primary-white">
              <th>uid</th>
              <th>Name</th>
              <th>Surname</th>
              <th>DNI</th>
              <th className="hidden lg:table-cell py-[1rem] px-[1.5rem]">Age</th>
              <th className="hidden lg:table-cell">Gender</th>
              <th className={fromdb ? 'table-cell' : 'hidden'}>Edit</th>
              <th className={fromdb ? 'table-cell' : 'hidden'}>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users
                .filter((user) => {
                  return search.toLowerCase() === ''
                    ? user
                    : user.surname.toLowerCase().includes(search.toLowerCase());
                })
                .map((user) => {
                  return (
                    <tr key={user.dni}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.surname ? user.surname : '-'}</td>
                      <td>{user.dni}</td>
                      <td className="hidden lg:table-cell">{user.age}</td>
                      <td className="hidden lg:table-cell">{user.gender}</td>
                      <td className={fromdb ? 'table-cell' : 'hidden'}>
                        <Link to={`/users/edit/${user.id}`}>📝</Link>
                      </td>
                      <td className={fromdb ? 'table-cell' : 'hidden'}>
                        <Link to={`/users/delete/${user.id}`}>❌</Link>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

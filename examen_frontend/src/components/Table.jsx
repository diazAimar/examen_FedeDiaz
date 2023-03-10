import '../styles/Table.css';

export default function DaisyUITable({ users, search }) {
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
            </tr>
          </thead>
          <tbody>
            {users &&
              users
                .filter((user) => {
                  return search.toLowerCase() === ''
                    ? user
                    : user.apellido.toLowerCase().includes(search.toLowerCase());
                })
                .map((user) => {
                  return (
                    <tr key={user.dni}>
                      <td>{user.id}</td>
                      <td>{user.nombre}</td>
                      <td>{user.apellido ? user.apellido : '-'}</td>
                      <td>{user.dni}</td>
                      <td className="hidden lg:table-cell">{user.edad}</td>
                      <td className="hidden lg:table-cell">{user.genero.value}</td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
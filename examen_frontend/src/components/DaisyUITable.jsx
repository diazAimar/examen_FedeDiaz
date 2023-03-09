export default function DaisyUITable({ users }) {
  return (
    <div className="h-[680px] overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>uid</th>
            <th>Name</th>
            <th>Surname</th>
            <th>DNI</th>
            <th className="hidden lg:table-cell">Age</th>
            <th className="hidden lg:table-cell">Gender</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => {
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
  );
}

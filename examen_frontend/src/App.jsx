import { useState, useEffect } from 'react';

import axios from 'axios';

import './App.css';
import DaisyUITable from './components/DaisyUITable';

const apiUrl = 'https://weblogin.muninqn.gov.ar/api/Examen';

const getUserNameSurnameAndAge = (razonSocial, fechaNacimiento) => {
  let userObj = {};
  const userSurname = razonSocial.substring(0, razonSocial.indexOf(','));
  const userName = razonSocial.substring(razonSocial.indexOf(',')).substring(2);
  const userAge = new Date().getFullYear() - fechaNacimiento.substring(0, 4);
  userObj['nombre'] = userName;
  userObj['apellido'] = userSurname;
  userObj['edad'] = userAge;
  return userObj;
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      let result = null;
      result = await axios
        .get(apiUrl)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          console.log(err);
          return;
        });

      if (result && result.status === 200) {
        let filteredUsers = result.data.value.map(
          ({ domicilio, codigoPostal, razonSocial, fechaNacimiento, ...user }) => {
            const userObj = getUserNameSurnameAndAge(razonSocial, fechaNacimiento);
            const userDto = { ...user, ...userObj };
            return userDto;
          }
        );
        setUsers(filteredUsers);
      }
      setIsLoading(false);
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2 className="mb-4">Users Table</h2>
      <div className="divider"></div>
      {isLoading ? (
        <p>Loading</p>
      ) : users ? (
        <DaisyUITable users={users} />
      ) : (
        <p>There are no users registered.</p>
      )}
    </div>
  );
}

import { useState, useEffect } from 'react';

import axios from 'axios';

import Table from '../components/Table.jsx';

const apiUrl = 'https://weblogin.muninqn.gov.ar/api/Examen';

const getUserNameSurnameAndAge = (razonSocial, fechaNacimiento) => {
  let userObj = {};
  const userSurname = razonSocial.substring(0, razonSocial.indexOf(','));
  const userName = razonSocial.substring(razonSocial.indexOf(',')).substring(2);
  const userAge = new Date().getFullYear() - fechaNacimiento.substring(0, 4);
  userObj['name'] = userName;
  userObj['surname'] = userSurname;
  userObj['age'] = userAge;
  return userObj;
};

const formatUserObj = (userObj) => {
  userObj['gender'] = userObj['genero']['value'];
  delete userObj['genero'];
  return userObj;
};

export default function APIUsers() {
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
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
            let userDto = { ...user, ...userObj };
            userDto = formatUserObj(userDto);
            return userDto;
          }
        );
        setUsers(filteredUsers.slice(0, 10));
      }
      setIsLoading(false);
    };

    fetchUsers();
  }, []);
  return (
    <div className="">
      <h2 className="mb-8 border-b-2 border-[#777]">Users Table</h2>
      {isLoading ? (
        <p>Loading</p>
      ) : users ? (
        <div>
          <form>
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search user by Surname"
              className="input input-bordered mb-4"
            />
          </form>
          <Table users={users} search={search} />
        </div>
      ) : (
        <p>There are no users registered.</p>
      )}
    </div>
  );
}

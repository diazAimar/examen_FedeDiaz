import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import Table from '../components/Table';

import apiInstance from '../instance';

export default function Users() {
  const [isLoading, setIsLoading] = useState(true);
  const [dbUsers, setDbUsers] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      let result = null;
      result = await apiInstance.get('/users/read.php');
      setDbUsers(result.data.users);
      setIsLoading(false);
    };
    fetchUsers();
  }, []);

  return (
    <div className="">
      <div className="mb-8">
        <Link to="/users/create" className="btn capitalize">
          Create User
        </Link>
      </div>
      {isLoading ? (
        <p>Loading</p>
      ) : dbUsers ? (
        <div>
          <form>
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search user by Surname"
              className="input input-bordered mb-4"
            />
          </form>
          <Table users={dbUsers} search={search} fromdb={true} />
        </div>
      ) : (
        <p>There are no users registered.</p>
      )}
    </div>
  );
}

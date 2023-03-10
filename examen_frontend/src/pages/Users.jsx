import { useState, useEffect } from 'react';

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
      setDbUsers(result.data.data);
      setIsLoading(false);
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <div className="mb-4">
        <div className="btn">Create User</div>
        <div className="btn mx-4">Edit User</div>
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
          <Table users={dbUsers} search={search} />
        </div>
      ) : (
        <p>There are no users registered.</p>
      )}
    </div>
  );
}

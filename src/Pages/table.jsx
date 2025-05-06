import { useState } from "react";
import { getUsers } from "../Adapters/users.adapter";
import { useEffect } from "react";

const TableUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const users = await getUsers();
    console.log(users, "users");
    setUsers(users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>TableUsers</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableUsers;

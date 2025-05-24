import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

import { fetchAllUser } from "../services/UserService";

const TableUsers = (props) => {
  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    // call apis
    getUsers();
  }, []);

  const getUsers = async () => {
    let res = await fetchAllUser();
    console.log("🚀 ~ getUsers ~ res:", res);

    if (res && res.data && res.data) {
      setListUsers(res.data);
    }
  };
  console.log(listUsers);
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((user) => {
              return (
                <tr key={`users-${user.id}`}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
};

export default TableUsers;

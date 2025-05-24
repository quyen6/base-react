import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import ModalAddNew from "./ModalAddNew";
import { fetchAllUser } from "../services/UserService";

const TableUsers = (props) => {
  const [listUsers, setListUsers] = useState([]);
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

  const handleClose = () => {
    setIsShowModalAddNew(false);
  };

  const handleUpdateTable = (user) => {
    setListUsers([...listUsers, user]);
  };

  useEffect(() => {
    // call apis
    getUsers();
  }, []);

  const getUsers = async () => {
    let res = await fetchAllUser();

    if (res && res.data) {
      // setTotalUsers(res.total);
      // setTotalPages(res.total_pages);
      setListUsers(res.data);
    }
  };

  return (
    <>
      <div className="my-3 add-new ">
        <span>
          <h4>List Users :</h4>
        </span>
        <button
          className="btn btn btn-success"
          onClick={() => setIsShowModalAddNew(true)}
        >
          Add new users
        </button>
      </div>
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
            listUsers.map((user, index) => {
              return (
                <tr key={`users-${index}`}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>

      <ModalAddNew
        show={isShowModalAddNew}
        handleClose={handleClose}
        handleUpdateTable={handleUpdateTable}
      />
    </>
  );
};

export default TableUsers;

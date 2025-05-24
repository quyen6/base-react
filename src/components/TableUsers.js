import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import _ from "lodash";

import { fetchAllUser } from "../services/UserService";
import ModalAddNew from "./ModalAddNew";
import ModalEditUser from "./ModalEditUser";

const TableUsers = (props) => {
  const [listUsers, setListUsers] = useState([]);

  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

  const [isShowModalEditUser, setIsShowModalEditUser] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({});

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

  const handleClose = () => {
    setIsShowModalAddNew(false);
    setIsShowModalEditUser(false);
  };

  const handleUpdateTable = (user) => {
    setListUsers([...listUsers, user]);
  };

  const handleEditUser = (user) => {
    setIsShowModalEditUser(true);
    setDataUserEdit(user);
  };

  const handleEditUserFromModal = (user) => {
    let cloneListUsers = _.cloneDeep(listUsers); // lodash chia làm 2 địa chỉ bộ nhớ khác nhau
    let index = listUsers.findIndex((item) => item.id === user.id);
    cloneListUsers[index].name = user.name;
    cloneListUsers[index].email = user.email;

    setListUsers(cloneListUsers);
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
            <th>Actions</th>
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
                  <td className="actions-btn">
                    <Button
                      variant="warning"
                      onClick={() => handleEditUser(user)}
                    >
                      Edit
                    </Button>
                    <Button variant="danger">Delete</Button>
                  </td>
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
      <ModalEditUser
        show={isShowModalEditUser}
        handleClose={handleClose}
        dataUserEdit={dataUserEdit}
        handleEditUserFromModal={handleEditUserFromModal}
      />
    </>
  );
};

export default TableUsers;

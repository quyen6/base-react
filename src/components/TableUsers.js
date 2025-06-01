import { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import _ from "lodash";
import { CSVLink } from "react-csv";
import Papa from "papaparse";
import { toast } from "react-toastify";

import { fetchAllUser } from "../services/UserService";
import ModalAddNew from "./ModalAddNew";
import ModalEditUser from "./ModalEditUser";
import ModalConfirm from "./ModalConfirm";

const TableUsers = (props) => {
  const [listUsers, setListUsers] = useState([]);

  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

  const [isShowModalEditUser, setIsShowModalEditUser] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({});

  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataUserDelete, setDataUserDelete] = useState({});

  const [setSortBy] = useState("asc");
  const [setSortField] = useState("id");

  const [dataExport, setDataExport] = useState([]);

  // Search
  // const [searchWord, setSearchWord] = useState("");

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
    setIsShowModalDelete(false);
  };
  // Add new user
  const handleUpdateTable = (user) => {
    setListUsers([...listUsers, user]);
  };

  // Update user
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

  //  Delete user
  const handleDeleteUser = (user) => {
    setIsShowModalDelete(true);
    setDataUserDelete(user);
  };
  const handleDeleteUserFromModal = (user) => {
    let cloneListUsers = _.cloneDeep(listUsers); // lodash chia làm 2 địa chỉ bộ nhớ khác nhau
    cloneListUsers = cloneListUsers.filter((item) => item.id !== user.id);
    setListUsers(cloneListUsers);
  };

  // Sort
  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);

    let cloneListUsers = _.cloneDeep(listUsers); // lodash chia làm 2 địa chỉ bộ nhớ khác nhau
    cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy]);
    console.log("🚀 ~ handleSort ~ cloneListUsers:", cloneListUsers);

    setListUsers(cloneListUsers);
  };

  // Search
  const handleSearch = _.debounce((e) => {
    let term = e.target.value;
    if (term) {
      let cloneListUsers = _.cloneDeep(listUsers); // lodash chia làm 2 địa chỉ bộ nhớ khác nhau
      cloneListUsers = cloneListUsers.filter((item) =>
        item.name.toLowerCase().includes(term)
      );
      setListUsers(cloneListUsers);
    } else {
      // input not word
      getUsers();
    }
  }, 500);

  // Export file csv
  const getUsersExport = (event, done) => {
    if (listUsers && listUsers.length > 0) {
      const headers = ["ID", "Email", "First Name", "Last Name"];
      const body = listUsers.map((user) => [
        user.id,
        user.email,
        user.name,
        user.username,
      ]);
      const result = [headers, ...body];

      setDataExport(result);
      done();
    }
  };
  // const getUsersExport = (event, done) => {
  //   let result = [];
  //   if (listUsers && listUsers.length > 0) {
  //     result.push(["ID", "Email", "First Name", "Last Name"]);
  //     listUsers.map((item) => {
  //       let arr = [];
  //       arr[0] = item.id;
  //       arr[1] = item.email;
  //       arr[2] = item.name;
  //       arr[3] = item.username;
  //       result.push(arr);
  //     });
  //     setDataExport(result);
  //     done();
  //   }
  // };

  // Import file csv
  const handleImportCSV = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (file.type !== "text/csv") {
        toast.error("Ony accept csv files...");
        return;
      }
      // Parse local CSV File
      Papa.parse(file, {
        // header: true,
        complete: function (results) {
          let rawCSV = results.data;
          if (rawCSV.length > 0) {
            if (rawCSV[0] && rawCSV[0].length === 3) {
              if (
                rawCSV[0][0] !== "email" ||
                rawCSV[0][1] !== "first_name" ||
                rawCSV[0][2] !== "last_name"
              ) {
                toast.error("Wrong format CSV file!");
              } else {
                let result = [];
                rawCSV.forEach((item, index) => {
                  if (index > 0 && item.length === 3) {
                    let obj = {};
                    obj.email = item[0];
                    obj.name = item[1];
                    obj.username = item[2];
                    result.push(obj);
                  }
                });
                setListUsers(result);
              }
            } else {
              toast.error("Wrong format Header CSV file!");
            }
          } else {
            toast.error("Not found data on CSV file!");
          }
        },
      });
    }
  };

  return (
    <>
      <div className="my-3 header-content ">
        <span>
          <h4>List Users :</h4>
        </span>
        <div className="roles-btn d-flex ">
          <label htmlFor="import" className="btn btn-secondary item-role">
            <i className="fa-solid fa-cloud-arrow-up"></i> Import
          </label>

          <input
            type="file"
            id="import"
            hidden
            onChange={(e) => handleImportCSV(e)}
          />
          <CSVLink
            className="btn btn-primary mx-2 item-role   "
            filename={"users.csv"}
            target="_blank"
            data={dataExport}
            asyncOnClick={true}
            onClick={getUsersExport}
          >
            <i className="fa-solid fa-cloud-arrow-down"></i>Export
          </CSVLink>

          <button
            className="btn btn btn-success item-role  "
            onClick={() => setIsShowModalAddNew(true)}
          >
            <i className="fa-solid fa-circle-plus "></i>Add new
          </button>
        </div>
      </div>
      {/* // Search input  */}
      <div className="col-md-4 mb-3">
        <input
          // value={searchWord}
          className="form-control "
          placeholder="Search user by name..."
          onChange={(e) => handleSearch(e)}
        />
      </div>
      {/* // Option Sort in mobile */}
      <div className="col-md-4 mb-3 sort-option-mobile  ">
        <Form.Select
          aria-label="Default select example"
          onChange={(e) => {
            const [order, sortBy] = e.target.value.split("-");
            handleSort(order, sortBy);
          }}
        >
          <option value="asc-id">Sort ID from Low to High</option>
          <option value="desc-id">Sort ID from High to Low</option>
          <option value="asc-name">Sort First Name from A to Z</option>
          <option value="desc-name">Sort First Name from Z to A</option>
        </Form.Select>
      </div>

      <div style={{ overflowX: "auto" }}>
        <Table striped bordered hover className="table-users">
          <thead className="header-table">
            <tr>
              <th>
                ID{" "}
                <span className="sort-id  float-end ">
                  <i
                    className="fa-solid fa-arrow-up sort-icon "
                    onClick={() => handleSort("asc", "id")}
                  ></i>

                  <i
                    className="fa-solid fa-arrow-down sort-icon"
                    onClick={() => {
                      handleSort("desc", "id");
                    }}
                  ></i>
                </span>
              </th>
              <th>Email</th>
              <th>
                First Name{" "}
                <span className="sort-name-icons  float-end">
                  <i
                    className="fa-solid fa-arrow-down-a-z sort-icon "
                    onClick={() => handleSort("asc", "name")}
                  ></i>{" "}
                  <i
                    className="fa-solid fa-arrow-down-z-a sort-icon"
                    onClick={() => handleSort("desc", "name")}
                  ></i>
                </span>
              </th>
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
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteUser(user)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
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
      <ModalConfirm
        show={isShowModalDelete}
        handleClose={handleClose}
        dataUserDelete={dataUserDelete}
        handleDeleteUserFromModal={handleDeleteUserFromModal}
      />
    </>
  );
};

export default TableUsers;

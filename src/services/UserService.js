import axios from "./customize-axios"; // import instance (changed name from instance to axios ) from file customize-axios.js

const fetchAllUser = () => {
  return axios.get("users");
};

const postCreateUser = (name, email) => {
  return axios.post("users", { name, email });
};

const putUpdateUser = (name, email, id) => {
  return axios.put(`users/${id}`, { name, email });
};
const deleteUser = (id) => {
  return axios.delete(`users/${id}`);
};

export { fetchAllUser, postCreateUser, putUpdateUser, deleteUser };

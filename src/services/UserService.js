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

export { fetchAllUser, postCreateUser, putUpdateUser };

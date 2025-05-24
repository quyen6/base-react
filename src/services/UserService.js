import axios from "./customize-axios"; // import instance (changed name from instance to axios ) from file customize-axios.js

const fetchAllUser = () => {
  return axios.get("/api/users");
};

export { fetchAllUser };

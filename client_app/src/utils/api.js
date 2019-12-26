import axios from "axios";
export default () => {
  return axios.create({
    baseURL: `http://localhost:8888/api/`,
    responseType: "json",
    timeout: 10000
  });
};

import axios from "axios";

const apiInstance = axios.create({
  baseURL: "https://dummyjson.com/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});


export default apiInstance;

import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
if (!BASE_URL) throw new Error("Failed to configure API proxy");

axios.defaults.baseURL = BASE_URL;

export const api = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

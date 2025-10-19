import axios from "axios";

export const BASE_URL = "https://gallery-backend-1-l713.onrender.com";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
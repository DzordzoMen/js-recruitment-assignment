import axios from 'axios';

const Api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  headers: {
    Accept: 'application/json'
  }
})

export default Api;

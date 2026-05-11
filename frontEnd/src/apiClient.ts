import axios from "axios"

export const API_URL = "https://swiftdrop-kuor.onrender.com/app/v1"; // backend url

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  async (config) =>{
    const token = localStorage.getItem('userToken');

    if(token){
      config.headers.Authorization = `Bearer ${token}`
      console.log(token)
    }

    return config
  },
  (error) => Promise.reject(error) 
)

export default apiClient;
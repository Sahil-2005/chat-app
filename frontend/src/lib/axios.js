// import axios from "axios";

// export const axiosInstance = axios.create({
//     baseURL: import.meta.env.MODE === "development" ? 'http://localhost:5001/api' : "/api",
//     withCredentials: true,
// })



// export const axiosInstance = axios.create({
//     baseURL: import.meta.env.MODE === "development" 
//         ? 'http://localhost:5001/api' 
//         : 'https://chat-app-1-uxbk.onrender.com/api', // Update this line
//     withCredentials: true,
// });


import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
  withCredentials: true,
});

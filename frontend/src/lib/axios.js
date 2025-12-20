import axios from "axios";

export const axiosInstance = axios.create({
    // baseURL: import.meta.env.MODE === "development" ? 'http://localhost:5001/api' : "https://chat-app-1-p24q.onrender.com/api",
    baseURL: "https://chat-app-1-p24q.onrender.com/api",
    withCredentials: true,
})

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken"); // or from your auth store
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Add token to header if it exists
    }
    return config;
});

// export const axiosInstance = axios.create({
//     baseURL: import.meta.env.MODE === "development" 
//         ? 'http://localhost:5001/api' 
//         : 'https://chat-app-1-uxbk.onrender.com/api', // Update this line
//     withCredentials: true,
// });


// import axios from "axios";

// export const axiosInstance = axios.create({
//   baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
//   withCredentials: true,
//   headers: {
//     'Content-Type': 'application/json',
//   }
// });

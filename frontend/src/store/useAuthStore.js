// import { create } from "zustand";
// import { axiosInstance } from "../lib/axios.js";
// import toast from "react-hot-toast";
// import axios from "axios";
// import { io } from "socket.io-client";

// // const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "https://chat-app-1-p24q.onrender.com";
// const BASE_URL = "https://chat-app-1-p24q.onrender.com";
// // const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// export const useAuthStore = create((set, get) => ({
//     authUser: null,
//     isSigningUp: false,
//     isLoggingIn: false,
//     isUpdatingProfile: false,
//     onlineUsers: [],
//     socket: null,

//     isCheckingAuth: true,

//     checkAuth: async() => {
//         try {
//             const res = await axiosInstance.get('/auth/check', {
//                 withCredentials: true,
//             })
//             // console.log(res.data)

//             set({authUser: res.data});

//             get().connectSocket();
//         } catch (error) {
//             console.log("Error in checkAuth: ", error);
//             set( {authUser: null} );
//         } finally {
//             set( {isCheckingAuth: false} );
//         }
//     },

//     signup: async (data) => {

//         console.log(data);

//         set( {isSigningUp: true} );

//         try {
//             const res = await axiosInstance.post('/auth/signup', data)            
//             set( {authUser: res.data})
//             toast.success("Account created successfully");
//             get().connectSocket();

//         } catch (error) {
//             toast.error(error.response.data.message);
//         } finally {
//             set( { isSigningUp: false } )
//         }
//     },
    
//     logout: async () => {
//         set( { isLoggingIn: true } )
//         try {
//             await axiosInstance.post('/auth/logout');
//             set( {authUser: null} );
//             toast.success("Logged out successfully");
//             get().disConnectSocket();
//         } catch (error) {
//             toast.error(error.response.data.message);
//         } finally {
//             set( { isLoggingIn: false } )
//         }
//     }, 
    
//     login: async (data) => {
//         set( { isLoggingIn: true } )
//         try {
//             const res = await axiosInstance.post('/auth/login', data)
//             set( {authUser: res.data})
//             toast.success("LogedIn successfully");

//             get().connectSocket();
//         } catch (error) {
//             toast.error(error.response.data.message);
//         } finally {
//             set( { isLoggingIn: false } )
//         }
//     },

//     updateProfile: async(data) => {
//         set ({ isUpdatingProfile: true});

//         try {
//             const res = await axiosInstance.put("/auth/update-profile", data);
//             console.log(data);
//             set( {authUser: res.data} );
//             toast.success("Profile update successfully");
//         } catch (error) {
//             console.log("Error in update profile", error);
//             toast.error(error.response.data.message);
//         } finally {
//             set( { isUpdatingProfile: false} )
//         }
//     },

//     connectSocket: () => {
//         const {authUser} = get();

//         if(!authUser || get().socket?.connected) return;

//         const socket = io(BASE_URL, {
//             query: {userId: authUser._id}
//         });
//         socket.connect();
        
//         set({socket: socket});

//         socket.on("getOnlineUsers", (userIds) => {
//             set({onlineUsers: userIds})
//         })
//     },
    
//     disConnectSocket: () => {
//         if(get().socket?.connected) get().socket.disconnect();
//     }

// }))



import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = "https://chat-app-1-p24q.onrender.com";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      get().disConnectSocket();
      set({ authUser: null, onlineUsers: [] });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser, socket } = get();

    if (!authUser?._id || socket) return;

    const newSocket = io(BASE_URL, {
      withCredentials: true,
      query: {
        userId: authUser._id,
      },
      transports: ["websocket"], // avoids polling CORS issues
    });

    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id);
    });

    newSocket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });

    newSocket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    set({ socket: newSocket });
  },

  disConnectSocket: () => {
    const socket = get().socket;
    if (socket) {
      socket.off();
      socket.disconnect();
      set({ socket: null });
    }
  },
}));

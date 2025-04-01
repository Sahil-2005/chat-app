import React from "react";
import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/HomePage";
import SignuPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import SettingPage from "./pages/SettingPage";
import ProfilePage from "./pages/ProfilePage"; 
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader, LogIn } from "lucide-react";
import toast, {Toaster} from 'react-hot-toast';
import { useThemeStore } from "./store/useThemeStore";


const App = () => {

  const {authUser, checkAuth, isCheckingAuth, onlineUsers} = useAuthStore()

  const {theme} = useThemeStore();


  useEffect(() => {
    checkAuth();
  }, [checkAuth])

  console.log("online users", onlineUsers);


  if(isCheckingAuth && !authUser) return (
  // if(true) return (
    <div className="flex items-center justify-center h-screen">
      <Loader className = "size-10 animate-spin"/>
    </div>
  )
  
  
  return (
    <div data-theme = {theme}>
      <Navbar/>

      

      <Routes>
        <Route path='/' element={authUser ? <Homepage/> : <Navigate to='/login'/>}/>
        <Route path='/signup' element={!authUser ? <SignuPage/> : <Navigate to='/'/>}/>
        <Route path='/login' element={!authUser ? <LoginPage/> : <Navigate to='/'/>}/>
        <Route path='/settings' element={<SettingPage/>}/>
        <Route path='/profile' element={authUser ? <ProfilePage/> : <Navigate to='/login'/>}/>
      </Routes>

      <Toaster/>
    </div> 
  );
};

export default App;

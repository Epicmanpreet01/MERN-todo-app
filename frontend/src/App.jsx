import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import { ToastContainer } from 'react-toastify';

import Navbar from './components/common/Navbar.jsx';
import HomePage from './pages/home/HomePage.jsx';
import LoginPage from "./pages/auth/LogIn/LoginPage.jsx";
import SignupPage from "./pages/auth/SignUp/SignUpPage.jsx";
import ProfilePage from "./pages/profile/ProfilePage.jsx";
import ProfileBannerDoodle from "./components/svgs/PlaceholderBanner.jsx";
import { Bounce } from "react-toastify";
import useAuthUserQuery from "./hooks/queries/AuthUser.js";
import LoadingSpinner from "./components/common/LoadingSpinner.jsx";
import { useState } from "react";
function App() {

  const [mode,setMode] = useState('all');

  const location = useLocation();

  const hidenavbar = location.pathname === '/login' || location.pathname === '/signup';

  const { data:authUser, isLoading  } = useAuthUserQuery();

  if(isLoading) {
    return <div className='h-screen flex justify-center items-center'><LoadingSpinner className="size-lg" /></div>
  }

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background doodle */}
      <ProfileBannerDoodle className="absolute top-50 left-0.5 w-full text-base-content/50 -z-10" />

      {/* Main Content */}
      <div className="relative z-10">
        {!hidenavbar && <Navbar setMode={setMode} mode={mode} />}
        <Routes>
          <Route path="/profile" element={authUser? <ProfilePage /> : <Navigate to={'/login'} />} />
          <Route path="/" element={<HomePage mode={mode} setMode={setMode} />} />
          <Route path="/login" element={!authUser? <LoginPage /> : <Navigate to={'/'} />} />
          <Route path="/signup" element={!authUser? <SignupPage /> : <Navigate to={'/'} />} />
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Bounce}
          className={'z-[9999] fixed'}
          />
      </div>
    </div>
  );
}

export default App

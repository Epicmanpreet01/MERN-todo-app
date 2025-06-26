import { Routes, Route } from "react-router-dom"
import { ToastContainer } from 'react-toastify';

import Navbar from './components/common/Navbar.jsx';
import HomePage from './pages/home/HomePage.jsx';
import LoginPage from "./pages/auth/LogIn/LoginPage.jsx";
import SignupPage from "./pages/auth/SignUp/SignUpPage.jsx";
import ProfilePage from "./pages/profile/ProfilePage.jsx";
import ProfileBannerDoodle from "./components/svgs/PlaceholderBanner.jsx";

function App() {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background doodle */}
      <ProfileBannerDoodle className="absolute top-50 left-0.5 w-full text-base-content/50 -z-10" />

      {/* Main Content */}
      <div className="relative z-10">
        <Navbar />
        <Routes>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/:mode" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
        <ToastContainer />
      </div>
    </div>
  );
}

export default App

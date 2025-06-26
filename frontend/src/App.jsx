import { Routes, Route } from "react-router-dom"
import { ToastContainer } from 'react-toastify';

import Navbar from './components/common/Navbar.jsx';
import HomePage from './pages/home/HomePage.jsx';
import LoginPage from "./pages/auth/LogIn/LoginPage.jsx";
import SignupPage from "./pages/auth/SignUp/SignUpPage.jsx";

function App() {

  return (
    <div className="h-screen">
      <Navbar />
      <Routes>
        <Route path="/:mode" element={<HomePage />}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />}/>
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "./components/mainpage/Main";
import Navbar from "./components/navbar/Navbar";
import LogInModal from "./components/Modal/LoginModal";
import SignUp from "./components/signup/SignUp";
import ProfileCreate from "./components/signup/ProfileCreate";
import Dashboard from "./components/dashboard/DashboardPage";
import ProfileDashboard from "./components/dashboard/ProfileShow";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<LogInModal />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profileform" element={<ProfileCreate />} />
          <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<ProfileDashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

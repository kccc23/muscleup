import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "./components/mainpage/Main";
import Navbar from "./components/navbar/Navbar";
import LogInModal from "./components/Modal/LoginModal";
import SignUp from "./components/signup/SignUp";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Main/>} />
          <Route path='/login' element={<LogInModal />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

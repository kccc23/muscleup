import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "./components/mainpage/Main";
import Navbar from "./components/navbar/Navbar";
import LogInModal from "./components/Modal/LoginModal";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Main/>} />
          <Route path='/login' element={<LogInModal />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "./components/mainpage/Main";
import Navbar from "./components/navbar/Navbar";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

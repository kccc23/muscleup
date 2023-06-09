import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "./components/mainpage/Main";
import Navbar from "./components/navbar/Navbar";
import SignUp from "./components/signup/SignUp";
import ProfileCreate from "./components/signup/ProfileCreate";
import Dashboard from "./components/dashboard/DashboardPage";
import ProfileDashboard from "./components/dashboard/ProfileShow";
import TrainerList from "./components/trainer/TrainerList";
import TrainerForm from "./components/trainer/TrainerForm";


function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");

  return (
    <BrowserRouter basename={basename}>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profileform" element={<ProfileCreate />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<ProfileDashboard />} />
          <Route path="/trainers">
            <Route index element={<TrainerList />} />
            <Route path="/trainers/new" element={<TrainerForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

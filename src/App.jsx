import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./Components/Loginpage/Login";
import Signup from "./Components/Signuppage/Signup";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/Login" />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;

import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Loginpage/Login";
import Signup from "./Components/Signuppage/Signup";
import Homepage from "./Components/Homepage/Homepage";
import Cart from "./Components/Cartpage/Cart";
import About from "./Components/About/About";
import Success from "./Reusable/Success/Success";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/Login" />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/Homepage" element={<Homepage />} />
      <Route path="/Cart" element={<Cart />} />
      <Route path="/About" element={<About />} />
      <Route path="/success" element={<Success />} />
    </Routes>
  );
}

export default App;

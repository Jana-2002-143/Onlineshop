import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./Components/Loginpage/Login";
import Signup from "./Components/Signuppage/Signup";
import Homepage from "./Components/Homepage/Homepage";
import Dresses from "./Components/Dresses/Dresses";
import Watches from "./Components/Watches/Watches";
import Productspage from "./Reusable/Products/Productspage";
import Phones from "./Components/Phones/Phones";
import Laptops from "./Components/Laptops/Laptops";
import Order from "./Components/Orderpage/Order";
import About from "./Components/About/About";
import { useState } from "react";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/Login" />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Homepage" element={ <Homepage />}/>
        <Route path="/Productspage/:category" element={<Productspage />} />
        <Route path="/Dresses" element={<Dresses />} />
        <Route path="/Watches" element={<Watches />} />
        <Route path="/Phones" element={<Phones />} />
        <Route path="/Laptops" element={<Laptops />} />
        <Route path="/Order" element={<Order />} />
        <Route path="/About" element={<About />} />
      </Routes>
    </>
  );
}

export default App;

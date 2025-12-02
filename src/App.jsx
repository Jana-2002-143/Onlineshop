import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./Components/Loginpage/Login";
import Signup from "./Components/Signuppage/Signup";
import Homepage from "./Components/Homepage/Homepage";
import Dresses from "./Components/Dresses/Dresses";
import Watches from "./Components/Watches/Watches";
import Productspage from "./Reusable/Products/Productspage";
import Phones from "./Components/Phones/Phones";
import Laptaps from "./Components/Laptaps/Laptaps";
import Order from "./Components/Orderpage/Order";
import About from "./Components/About/About";
import { useState } from "react";
import ProtectedRoute from "./Security/ProductedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/Login" />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Homepage" element={ <ProtectedRoute><Homepage /></ProtectedRoute>}/>
        <Route path="/Productspage/:category" element={<ProtectedRoute><Productspage /></ProtectedRoute>} />
        <Route path="/Dresses" element={<ProtectedRoute><Dresses /></ProtectedRoute>} />
        <Route path="/Watches" element={<ProtectedRoute><Watches /></ProtectedRoute>} />
        <Route path="/Phones" element={<ProtectedRoute><Phones /></ProtectedRoute>} />
        <Route path="/Laptaps" element={<ProtectedRoute><Laptaps /></ProtectedRoute>} />
        <Route path="/Order" element={<ProtectedRoute><Order /></ProtectedRoute>} />
        <Route path="/About" element={<ProtectedRoute><About /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default App;

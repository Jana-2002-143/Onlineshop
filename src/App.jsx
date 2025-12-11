import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Loginpage/Login";
import Signup from "./Components/Signuppage/Signup";
import Homepage from "./Components/Homepage/Homepage";
import Cart from "./Components/Cartpage/Cart";
import Order from "./Components/Order/Order";
import About from "./Components/About/About";
import Forget from "./Service/Forget";
import Success from "./Reusable/Success/Success";
import PrivateRoute from "./Service/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/Login" />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Forget" element={<Forget />} />
      <Route path="/Signup" element={<Signup />} />
      <Route
        path="/Homepage"
        element={
          <PrivateRoute>
            <Homepage />
          </PrivateRoute>
        }
      />

      <Route
        path="/Cart"
        element={
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        }
      />

      <Route
        path="/Order"
        element={
          <PrivateRoute>
            <Order />
          </PrivateRoute>
        }
      />

      <Route
        path="/About"
        element={
          <PrivateRoute>
            <About />
          </PrivateRoute>
        }
      />
      <Route
        path="/success"
        element={
          <PrivateRoute>
            <Success />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;

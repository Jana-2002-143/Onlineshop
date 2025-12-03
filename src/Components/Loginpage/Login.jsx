import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [loadingIndex, setLoadingIndex] = useState(null);

  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const navigate = useNavigate();

  const handleUsername = (e) => {
    setUsernameValue(e.target.value);
    setUsernameError(e.target.value.trim() === "");
  };

  const handlePassword = (e) => {
    setPasswordValue(e.target.value);
    setPasswordError(e.target.value.trim() === "");
  };

  const handleLogin = async (e) => {
    setLoadingIndex(true);
    e.preventDefault();

    let valid = true;

    if (!usernameValue.trim()) {
      setUsernameError(true);
      valid = false;
    }
    if (!passwordValue.trim()) {
      setPasswordError(true);
      valid = false;
    }

    if (!valid) return;

    try {
      const response = await fetch(
        "https://onlineshop-backend-vvjx.onrender.com/api/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: usernameValue,
            password: passwordValue,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();

        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        localStorage.setItem("email", data.email);
        localStorage.setItem("phone", data.phone);

        alert("Login Successful!");
        navigate("/Homepage");
      } else {
        alert("Invalid Username or Password");
      }
    } catch (error) {
      alert("Cannot reach backend.");
    } finally {
      setLoadingIndex(null);
    }
  };

  return (
    <div className="loginform">
      <h1>Welcome To Buy Product</h1>

      <div className="Logincontainer">
        <form onSubmit={handleLogin}>
          <div className="inputGroup">
            <label htmlFor="Userinput">User Name</label>
            <input
              type="text"
              placeholder="User Name"
              id="Userinput"
              onChange={handleUsername}
            />
            {usernameError && (
              <p className="inputempty">Please enter the name</p>
            )}
          </div>

          <div className="inputGroup">
            <label htmlFor="Userinput1">Password</label>
            <input
              type="password"
              placeholder="Password"
              id="Userinput1"
              onChange={handlePassword}
            />
            {passwordError && (
              <p className="inputempty">Please enter the Password</p>
            )}
          </div>

          <button disabled={loadingIndex}>
            {loadingIndex ? "Login..." : "Login"}
          </button>

          <Link to="/Signup" className="otherpage">
            New User
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;

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

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoadingIndex(true);

    let valid = true;

    if (!usernameValue.trim()) {
      setUsernameError(true);
      valid = false;
    }
    if (!passwordValue.trim()) {
      setPasswordError(true);
      valid = false;
    }

    if (!valid) {
      setLoadingIndex(false);
      return;
    }

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
        localStorage.setItem("phone", data.phoneno);

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
          <label>User Name</label>
          <input
            type="text"
            placeholder="User Name"
            onChange={(e) => {
              setUsernameValue(e.target.value);
              setUsernameError(false);
            }}
          />
          {usernameError && <p className="inputempty">Please enter username</p>}

          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPasswordValue(e.target.value);
              setPasswordError(false);
            }}
          />
          {passwordError && <p className="inputempty">Please enter password</p>}

          <button disabled={loadingIndex}>
            {loadingIndex ? "Login..." : "Login"}
          </button>

          <div className="login-extra">
            Do You Have Already Account?
            <Link to="/Signup" className="otherpage">
              New User
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

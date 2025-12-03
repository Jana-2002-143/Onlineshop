import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [loading, setLoading] = useState(false);

  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
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

    setLoading(true);

    try {
      const response = await fetch(
        "https://onlineshop-backend-vvjx.onrender.com/api/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: usernameValue.trim(),
            password: passwordValue.trim(),
          }),
        }
      );

      if (!response.ok) {
        const text = await response.text();
        alert(text || "Invalid Username or Password");
      } else {
        const data = await response.json();
        localStorage.setItem("username", data.username);
        localStorage.setItem("email", data.email);
        localStorage.setItem("phone", data.phoneno);

        alert("Login Successful!");
        navigate("/Homepage");
      }
    } catch (err) {
      alert("Cannot reach backend. Please try again later.");
    } finally {
      setLoading(false);
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
            value={usernameValue}
            onChange={(e) => {
              setUsernameValue(e.target.value);
              setUsernameError(false);
            }}
          />
          {usernameError && (
            <p className="inputempty">Please enter username</p>
          )}

          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={passwordValue}
            onChange={(e) => {
              setPasswordValue(e.target.value);
              setPasswordError(false);
            }}
          />
          {passwordError && (
            <p className="inputempty">Please enter password</p>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="login-extra">
            New User?{" "}
            <Link to="/Signup" className="otherpage">
              Signup Here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

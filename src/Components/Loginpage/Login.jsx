import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";

function Login() {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [eye, setEye] = useState(false);
  const [forget, setForget] = useState(false);

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    let valid = true;
    if (!emailValue.trim()) {
      setEmailError(true);
      valid = false;
    }
    if (!passwordValue.trim()) {
      setPasswordError(true);
      valid = false;
    }
    if (!valid) return;

    setLoading(true);

    try {
      const response = await fetch("https://onlineproduct-backend.onrender.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: emailValue.trim(),
          password: passwordValue.trim(),
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setForget(true);
        alert(data.message || "Invalid Username or Password");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("email", emailValue);

      alert("Login Successful!");
      navigate("/Homepage");

    } catch (err) {
      alert("Cannot reach backend. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginform">
      <h1>Welcome Back 👋</h1>
      <p>Login to start managing your products</p>

      <div className="Logincontainer">
        <form onSubmit={handleLogin}>
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter UserName"
            value={emailValue}
            onChange={(e) => {
              setEmailValue(e.target.value);
              setEmailError(false);
            }}
          />
          {emailError && <p className="inputempty">Please enter email</p>}

          <label>Password</label>
          <div className="password-wrapper">
            <input
              type={eye ? "text" : "password"}
              value={passwordValue}
              onChange={(e) => {
                setPasswordValue(e.target.value);
                setPasswordError(false);
              }}
              placeholder="Password"
            />
            <span onClick={() => setEye(!eye)}>
              {eye ? <IoEyeSharp /> : <FaEyeSlash />}
            </span>
          </div>
          {passwordError && <p className="inputempty">Please enter password</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          {forget && (
            <Link to="/Forget" className="forget-password">
              Forgot Password?
            </Link>
          )}

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

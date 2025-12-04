import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";

function Login() {
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [eye, SetEye] = useState(false);

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
        "https://productbackend-oi15.onrender.com/api/login",
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
      <h1>Welcome Back 👋</h1>
      <div><p>Today is new Day,But it is your day.Login in to Start managing your Products</p></div>
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
                      <span onClick={() => SetEye(!eye)}>
                        {eye ? <IoEyeSharp /> : <FaEyeSlash />}
                      </span>
                    </div>
                    {passwordError && (
                      <p className="inputempty">Please enter your password</p>
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

import { useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";

function Signup() {
  const navigate = useNavigate();

  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [rePasswordValue, setRePasswordValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [eye, SetEye] = useState(false);

  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [rePasswordError, setRePasswordError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const showhandle = (e) => {
    SetEye(true);
  };
  const signupbtn = async (e) => {
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
    if (!rePasswordValue.trim()) {
      setRePasswordError(true);
      valid = false;
    }
    if (!emailValue.trim()) {
      setEmailError(true);
      valid = false;
    }
    if (!phoneValue.trim()) {
      setPhoneError(true);
      valid = false;
    }

    if (!valid) {
      alert("All fields are required");
      return;
    }

    if (passwordValue !== rePasswordValue) {
      alert("Passwords do not match");
      return;
    }

    if (!/^\d{10}$/.test(phoneValue)) {
      alert("Phone must be exactly 10 digits");
      return;
    }

    setLoading(true);

    const datalist = {
      username: usernameValue.trim(),
      password: passwordValue.trim(),
      email: emailValue.trim(),
      phoneno: phoneValue.trim(),
    };

    try {
      const response = await fetch(
        "https://productbackend-oi15.onrender.com/api/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(datalist),
        }
      );

      if (response.ok) {
        const data = await response.json();

        localStorage.setItem("username", data.username);
        localStorage.setItem("email", data.email);
        localStorage.setItem("phone", data.phoneno);

        alert("Account Created Successfully");
        navigate("/Login");
      } else {
        const errorMsg = await response.text();
        alert("Signup Failed: " + errorMsg);
      }
    } catch (error) {
      alert("Server not reachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginform">
      <h3>Register</h3>
      <h1>Getting Started</h1>
      <p>Seems You are new here,Let's set up your Profile</p>

      <div className="Signupcontainer">
        <form onSubmit={signupbtn}>
          <label>Full Name</label>
          <input
            type="text"
            value={usernameValue}
            onChange={(e) => {
              setUsernameValue(e.target.value);
              setUsernameError(false);
            }}
            placeholder="User Name"
          />
          {usernameError && (
            <p className="inputempty">Please enter your username</p>
          )}
          <label>Email</label>
          <input
            type="email"
            value={emailValue}
            onChange={(e) => {
              setEmailValue(e.target.value);
              setEmailError(false);
            }}
            placeholder="Email"
          />
          {emailError && <p className="inputempty">Please enter your email</p>}

          <label>Phone Number</label>
          <input
            type="text"
            value={phoneValue}
            maxLength="10"
            onChange={(e) => {
              setPhoneValue(e.target.value);
              setPhoneError(false);
            }}
            placeholder="Phone Number"
          />
          {phoneError && (
            <p className="inputempty">Please enter your phone number</p>
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

          <label>Re-enter Password</label>
          <input
            type={eye ? "text" : "password"}
            value={rePasswordValue}
            onChange={(e) => {
              setRePasswordValue(e.target.value);
              setRePasswordError(false);
            }}
            placeholder="Retype Password"
          />
          {rePasswordError && (
            <p className="inputempty">Please re-enter your password</p>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Signup"}
          </button>
          <div>
            Already hane an Account?<Link to="/Login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;

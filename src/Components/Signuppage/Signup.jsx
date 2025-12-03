import { useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [rePasswordValue, setRePasswordValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [loadingIndex, setLoadingIndex] = useState(null);

  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [rePasswordError, setRePasswordError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const signupbtn = async (e) => {
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
      setLoadingIndex(false);
      return;
    }

    if (passwordValue !== rePasswordValue) {
      alert("Passwords do not match");
      setLoadingIndex(false);
      return;
    }

    if (!/^\d{10}$/.test(phoneValue)) {
      alert("Phone must be exactly 10 digits");
      setLoadingIndex(false);
      return;
    }

    const datalist = {
      username: usernameValue,
      password: passwordValue,
      email: emailValue,
      phoneno: phoneValue,
    };

    try {
      const response = await fetch(
        "https://onlineshop-backend-vvjx.onrender.com/api/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(datalist),
        }
      );

      if (response.ok) {
        const data = await response.json();

        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        localStorage.setItem("useremail", data.email);
        localStorage.setItem("userphoneno", data.phoneno);

        alert("Account Created Successfully");
        navigate("/Login");
      } else {
        const errorMsg = await response.text();
        alert("Signup Failed: " + errorMsg);
      }
    } catch (error) {
      alert("Server not reachable");
    } finally {
      setLoadingIndex(null);
    }
  };

  return (
    <div className="loginform">
      <h1>Welcome to Purchase First Product</h1>

      <div className="Signupcontainer">
        <form onSubmit={signupbtn}>
          <label>UserName</label>
          <input
            type="text"
            onChange={(e) => {
              setUsernameValue(e.target.value);
              setUsernameError(e.target.value === "");
            }}
            placeholder="User Name"
          />
          {usernameError && (
            <p className="inputempty">Please Enter Your UserName</p>
          )}

          <label>Password</label>
          <input
            type="password"
            onChange={(e) => {
              setPasswordValue(e.target.value);
              setPasswordError(e.target.value === "");
            }}
            placeholder="Password"
          />
          {passwordError && (
            <p className="inputempty">Please Enter Your Password</p>
          )}

          <label>Re Password</label>
          <input
            type="password"
            onChange={(e) => {
              setRePasswordValue(e.target.value);
              setRePasswordError(e.target.value === "");
            }}
            placeholder="Retype Password"
          />
          {rePasswordError && (
            <p className="inputempty">Please Enter Re-Password</p>
          )}

          <label>Phone Number</label>
          <input
            type="text"
            maxLength="10"
            onChange={(e) => {
              setPhoneValue(e.target.value);
              setPhoneError(e.target.value === "");
            }}
            placeholder="Phone Number"
          />
          {phoneError && (
            <p className="inputempty">Please Enter Your Phone Number</p>
          )}

          <label>Email</label>
          <input
            type="email"
            onChange={(e) => {
              setEmailValue(e.target.value);
              setEmailError(e.target.value === "");
            }}
            placeholder="Email"
          />
          {emailError && <p className="inputempty">Please Enter Your Email</p>}

          <button disabled={loadingIndex}>
            {loadingIndex ? "Signup..." : "Signup"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;

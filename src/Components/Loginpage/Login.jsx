import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [uservalue, setUservalue] = useState("");
  const [user, setUser] = useState(false);
  const [userpassvalue, setUserpassvalue] = useState("");
  const [userpass, setUserpass] = useState(false);
  const navigate = useNavigate();

  const username = (e) => {
    setUservalue(e.target.value);
    setUser(e.target.value === "");
  };

  const userpassword = (e) => {
    setUserpassvalue(e.target.value);
    setUserpass(e.target.value === "");
  };

  const funloginbtn = async (e) => {
    e.preventDefault();

    if (uservalue === "") setUser(true);
    if (userpassvalue === "") setUserpass(true);

    try {
      const response = await fetch(
        "https://onlineshop-backend-vvjx.onrender.com/api/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: uservalue, password: userpassvalue }),
        }
      );

      if (response.ok) {
        alert("Login Successful!");
        navigate("/Homepage");
      } else {
        alert("Invalid Username or Password");
      }
    } catch (error) {
      alert("Cannot reach backend.");
    }
  };

  return (
    <>
      <div className="loginform">
        <h1>Welcome To Buy Product</h1>

        <div className="Logincontainer">
          <form onSubmit={funloginbtn}>
            <div className="inputGroup">
              <label htmlFor="Userinput">User Name</label>
              <input
                type="text"
                placeholder="User Name"
                id="Userinput"
                onChange={username}
              />
              {user && <p className="inputempty">Please enter the name</p>}
            </div>

            <div className="inputGroup">
              <label htmlFor="Userinput1">Password</label>
              <input
                type="password"
                placeholder="Password"
                id="Userinput1"
                onChange={userpassword}
              />
              {userpass && (
                <p className="inputempty">Please enter the Password</p>
              )}
            </div>

            <button>Login</button>

            <Link to="/Signup" className="otherpage">
              New User
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;

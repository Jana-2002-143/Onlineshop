import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [uservalue, setUservalue] = useState("");
  const [user, setUser] = useState(false);
  const [userpassvalue, setUserpassvalue] = useState("");
  const [userpass, setUserpass] = useState(false);

  const username = (e) => {
    setUservalue(e.target.value);
    if (e.target.value === "") {
      setUser(true);
    } else {
      setUser(false);
    }
  };
  const userpassword = (e) => {
    setUserpassvalue(e.target.value);
    if (e.target.value === "") {
      setUserpass(true);
    } else {
      setUserpass(false);
    }
  };
  const funloginbtn = async (e) => {
    e.preventDefault();
    if (uservalue == "") setUser(true);
    if (userpassvalue == "") setUserpass(true);

    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify({Name:uservalue,Password:userpassvalue}),
      });
      if (response.ok) {
        const data = await response.json();

        alert("Login Successful!");
      } else {
        alert("Invalid Username or Password");
      }
    } catch (error) {
      alert("Cannot reach backend.");
    }
  };

  return (
    <>
      <h1>Welcome To Buy Product</h1>
      <div className="Logincontainer">
        <form action="onSubmit" onSubmit={funloginbtn}>
          <div>
            <label htmlFor="Userinput">User Name</label>
            <input
              type="text"
              placeholder="User Name"
              id="Userinput"
              onChange={username}
            />
            {user && <p className="inputempty">Please enter the name</p>}
          </div>
          <div>
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
    </>
  );
}
export default Login;

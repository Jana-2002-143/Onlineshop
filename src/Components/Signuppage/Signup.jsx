import { useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [uservalue, setUservalue] = useState("");
  const [user, setUser] = useState(false);

  const [userpassvalue, setUserpassvalue] = useState("");
  const [userpass, setUserpass] = useState(false);

  const [userrepassvalue, setUserrepassvalue] = useState("");
  const [userrepass, setUserrepass] = useState(false);

  const [userphonevalue, setUserphonevalue] = useState("");
  const [userphone, setUserphone] = useState(false);

  const [useremailvalue, setUseremailvalue] = useState("");
  const [useremail, setUseremail] = useState(false);

  const username = (e) => {
    setUservalue(e.target.value);
    setUser(e.target.value === "");
  };

  const userpassword = (e) => {
    setUserpassvalue(e.target.value);
    setUserpass(e.target.value === "");
  };

  const userrepassword = (e) => {
    setUserrepassvalue(e.target.value);
    setUserrepass(e.target.value === "");
  };

  const userphoneno = (e) => {
    setUserphonevalue(e.target.value);
    setUserphone(e.target.value === "");
  };

  const useremailid = (e) => {
    setUseremailvalue(e.target.value);
    setUseremail(e.target.value === "");
  };

  const signupbtn = async (e) => {
    e.preventDefault();

    if (uservalue === "") setUser(true);
    if (userpassvalue === "") setUserpass(true);
    if (userrepassvalue === "") setUserrepass(true);
    if (useremailvalue === "") setUseremail(true);
    if (userphonevalue === "") setUserphone(true);

    if (
      !uservalue ||
      !userpassvalue ||
      !userrepassvalue ||
      !useremailvalue ||
      !userphonevalue
    ) {
      alert("All fields are required");
      return;
    }

    if (userpassvalue !== userrepassvalue) {
      alert("Passwords do not match");
      return;
    }

    if (!/^\d+$/.test(userphonevalue)) {
      alert("Phone must contain only numbers");
      return;
    }

    if (userphonevalue.length !== 10) {
      alert("Phone must be exactly 10 digits");
      return;
    }

    const datalist = {
      name: uservalue,
      password: userpassvalue,
      email: useremailvalue,
      phoneno: userphonevalue,
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

        localStorage.setItem("username", data.name);
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
    }
  };

  return (
    <>
      <h1>Welcome to Purchase first Product</h1>

      <div className="Signupcontainer">
        <form onSubmit={signupbtn}>
          <label>UserName</label>
          <input type="text" onChange={username} placeholder="User Name" />
          {user && <p className="inputempty">Please Enter Your UserName</p>}

          <label>Password</label>
          <input type="password" onChange={userpassword} placeholder="Password" />
          {userpass && <p className="inputempty">Please Enter Your Password</p>}

          <label>Re Password</label>
          <input
            type="password"
            onChange={userrepassword}
            placeholder="Retype Password"
          />
          {userrepass && <p className="inputempty">Please Enter Re-Password</p>}

          <label>Phone Number</label>
          <input
            type="number"
            onChange={userphoneno}
            placeholder="Phone Number"
          />
          {userphone && (
            <p className="inputempty">Please Enter Your Phone Number</p>
          )}

          <label>Email</label>
          <input type="email" onChange={useremailid} placeholder="Email" />
          {useremail && <p className="inputempty">Please Enter Your Email</p>}

          <button>Signup</button>
        </form>
      </div>
    </>
  );
}

export default Signup;

import { useState } from "react";
import "./Signup.css";
import { Await } from "react-router-dom";

function Signup() {
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
    if (e.target.value === "") {
      setUser(true);
    }
    else{
      setUser(false);
    }
  };
  const userpassword = (e) => {
    setUserpassvalue(e.target.value);
    if (e.target.value === "") {
      setUserpass(true);
    }
    else{
      setUserpass(false);
    }
  };
  const userrepassword = (e) => {
    setUserrepassvalue(e.target.value);
    if (e.target.value === "") {
      setUserrepass(true);
    }
    else{
      setUserrepass(false);
    }
  };
  const userphoneno = (e) => {
    setUserphonevalue(e.target.value);
    if (e.target.value === "") {
      setUserphone(true);
    }
    else{
      setUserphone(false);
    }
  };
  const useremailid = (e) => {
    setUseremailvalue(e.target.value);
    if (e.target.value === "") {
      setUseremail(true);
    }
    else{
      setUseremail(false);
    }
  };

  const signupbtn = async (e) => {
    e.preventDefault();
    if (uservalue == "") setUser(true);
    if (userpassvalue == "") setUserpass(true);
    if (userrepassvalue == "") setUserrepass(true);
    if (useremailvalue == "") setUseremail(true);
    if (userphonevalue == "") setUserphone(true);
    else if (!/^\d+$/.test(userphonevalue)) {
      return "Phone must contain only numbers";
    } else if (userphonevalue.length !== 10) {
     return "Phone must be exactly 10 digits";
    }

    const datalist={
      username:uservalue,
      userpassword:userpassvalue,
      useremail:useremailvalue,
      userphoneno:userphonevalue
    }

    try {
      const response=await fetch("https://onlineshop-backend-vvjx.onrender.com/api/signup",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(datalist),
      });

      if(response.ok){
        const data=await res.json();
        localStorage.setItem("username",data.username);
        localStorage.setItem("useremail",data.useremail);
        localStorage.setItem("userphoneno",data.userphoneno);

        alert("Account Created");
      }else {
        const errorMsg = await res.text();
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
        <form action="onSubmit" onSubmit={signupbtn}>
          <label htmlFor="userinput1">UserName</label>
          <input type="text" onChange={username} placeholder="User Name" id="userinput1" />
          {user && <p className="inputempty">Please Enter Your UserName</p>}
          <label htmlFor="userinput2">Password</label>
          <input type="password" onChange={userpassword} placeholder="Pasword" id="userinput2" />
          {userpass && <p className="inputempty">Please Enter Your Password</p>}
          <label htmlFor="userinput3">Re Password</label>
          <input type="password" onChange={userrepassword} placeholder=" Retype Password" id="userinput3" />
          {userrepass && (
            <p className="inputempty">Please Enter Your Password</p>
          )}
          <label htmlFor="userinput4">Phoneno</label>
          <input type="number" onChange={userphoneno} placeholder="Phone Number" id="userinput4"/>
          {userphone && (
            <p className="inputempty">Please Enter your Phone number</p>
          )}
          <label htmlFor="userinput5">Email</label>
          <input type="Email" onChange={useremailid} placeholder="Email" id="userinput5" />
          {useremail && <p className="inputempty">Please Enter Your Email</p>}
          <button>Signup</button>
        </form>
      </div>
    </>
  );
}
export default Signup;

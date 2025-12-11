import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Forget.css";

export default function Forget() {
  const [stage, setStage] = useState("email");
  const [email, setEmail] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [gologin,setGologin]=useState(false)
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const navigate=useNavigate();
  const gooo=()=>{
    navigate("/Login");
  }

  async function sendOtp() {
    if (!email) {
      setMsg("Enter a valid email");
      return;
    }
    if (!email.includes("@")) {
      setMsg("Enter a valid email address");
      return;
    }
    setLoading(true);
    setMsg("");
    try {
      const res = await fetch("https://onlineproduct-backend.onrender.com/api/forget", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStage("otp");
        setMsg("OTP sent to your email. Check your inbox.");
      } else {
        setMsg(data.message || "Failed to send OTP");
      }
    } catch (err) {
      setMsg("Cannot reach server");
    } finally {
      setLoading(false);
    }
  }
  async function verifyOtp() {
    if (!otpValue) {
      setMsg("Enter OTP");
      return;
    }
    setLoading(true);
    setMsg("");
    try {
      const res = await fetch("https://onlineproduct-backend.onrender.com/api/verifyotp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpValue }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStage("reset");
        setMsg("OTP verified. Enter a new password.");
      } else {
        setMsg(data.message || "Invalid or expired OTP");
      }
    } catch (err) {
      setMsg("Cannot reach server");
    } finally {
      setLoading(false);
    }
  }

  async function resetPassword() {
    if (!password || password !== confirm) {
      setMsg("Passwords must match and not be empty");
      return;
    }
    setLoading(true);
    setMsg("");
    try {
      const res = await fetch("https://onlineproduct-backend.onrender.com/api/resetpassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStage("done");
        setMsg("Password updated. You can now login.");
        setGologin(true);
      } else {
        setMsg(data.message || "Unable to update password");
      }
    } catch (err) {
      setMsg("Cannot reach server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="forget-container">
      {stage === "email" && (
        <>
          <h1>Forgot Your Password?</h1>
          <p>
            Enter your registered email to receive a verification code and reset
            your password.
          </p>

          <h3>Verify Email</h3>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="button" onClick={sendOtp} disabled={loading}>
            {loading ? "Sending..." : "Verify"}
          </button>
        </>
      )}
      {stage === "otp" && (
        <>
          <h1>Verify OTP</h1>
          <p>We sent a 6-digit code to {email}. Enter it below.</p>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otpValue}
            onChange={(e) => setOtpValue(e.target.value)}
            maxLength={6}
          />
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={verifyOtp} disabled={loading}>
              {loading ? "Verifying..." : "Submit"}
            </button>
            <button
              onClick={() => {
                setStage("email");
                setMsg("");
              }}
            >
              Back
            </button>
          </div>
        </>
      )}
      {stage === "reset" && (
        <>
          <h3>Reset Password</h3>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          <button onClick={resetPassword} disabled={loading}>
            {loading ? "Updating..." : "Update Password"}
          </button>

        </>
      )}
      {stage === "done" && (
        <>
          <h2>Password Updated</h2>
          <p>{msg}</p>
          {gologin && <button type="button" onClick={gooo}>Login</button>}
        </>
      )}
      {msg && <div className="msg">{msg}</div>}
    </div>
  );
}

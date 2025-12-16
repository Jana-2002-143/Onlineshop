import "./Success.css";
import { useNavigate } from "react-router-dom";

function Success() {
  const navigate=useNavigate();
  return (
    <div className="success-wrapper">
      <div className="success-card">
        <h1>🎉 Payment Successful!</h1>
        <p>Your order has been placed successfully.</p>

        <button
          className="home-btn"
          onClick={() => (navigate("/Homepage"))}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}

export default Success;

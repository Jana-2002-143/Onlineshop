import "./Success.css";

function Success() {
  return (
    <div className="success-wrapper">
      <div className="success-card">
        <h1>🎉 Payment Successful!</h1>
        <p>Your order has been placed successfully.</p>

        <button
          className="home-btn"
          onClick={() => (window.location.href = "/Homepage")}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}

export default Success;

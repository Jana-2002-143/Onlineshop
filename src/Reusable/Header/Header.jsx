import { useNavigate } from "react-router-dom";
import "./Header.css";
import { useState } from "react";

function Header() {
  const products = ["Dresses", "Watches", "Phones", "Laptops"];
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();

  const handleSelect = (e) => {
    const value = e.target.value;
    navigate(`/Productspage/${value}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("useremail");
    localStorage.removeItem("userphoneno");
    navigate("/Login");
  };

  const cancelLogout = () => setShowLogoutConfirm(false);

  return (
    <>
      <header className="headercontainer">
        <h1 className="logo">Online Shopping</h1>

        <nav className="navsection">
          <p onClick={() => navigate("/Homepage")}>Home</p>

          <select onChange={handleSelect} defaultValue="">
            <option value="" disabled>
              Products
            </option>
            {products.map((product) => (
              <option key={product} value={product}>
                {product}
              </option>
            ))}
          </select>

          <p onClick={() => navigate("/order")}>Orders</p>
          <p onClick={() => navigate("/About")}>About</p>
          <button onClick={() => setShowLogoutConfirm(true)}>Logout</button>

          {showLogoutConfirm && (
            <div className="logout-confirm">
              <p>Are you sure you want to logout?</p>
              <div className="logout-buttons">
                <button onClick={handleLogout}>Yes</button>
                <button onClick={cancelLogout}>No</button>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
}

export default Header;

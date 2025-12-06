import { useNavigate } from "react-router-dom";
import "./Header.css";
import { useState, useEffect } from "react";

function Header() {
  const [switchName, setSwitchName] = useState(false);
  const [orderHistory, setOrderHistory] = useState(null);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setSwitchName(false);
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setSwitchName(true);
    }
  }, [darkMode]);

  const btnHome = () => navigate("/Homepage");
  const btnCart = () => navigate("/Cart");
  const btnAbout = () => navigate("/About");

  const history = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("", {
        method: "GET",
      });
      const data = await response.json();
      console.log(data);
      setOrderHistory(data);
      navigate("/Order",{ state: { orders: data } });
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <>
      <div className="headerContainer">
        <div className="logo">
          Online<span>Shopping</span>
        </div>
        <nav className="navMenu">
          <p onClick={btnHome}>Home</p>
          <p onClick={btnCart}>Cart</p>
          <p onClick={history}>Order</p>
          <p onClick={btnAbout}>About Us</p>

          <div className="toggleContainer">
            <label htmlFor="Switch" className="modeLabel">
              {darkMode ? "🌙 DarkMode" : "☀️ LightMode"}
            </label>

            <label className="switch">
              <input
                id="Switch"
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              <span className="slider"></span>
            </label>
          </div>
        </nav>
        <div className="menuIcon" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>
      </div>

      {menuOpen && (
        <div className="mobileMenu">
          <p onClick={btnHome}>Home</p>
          <p onClick={btnOrder}>Cart</p>
          <p onClick={btnAbout}>About Us</p>
          <div className="toggleContainer">
            <label htmlFor="Switch" className="modeLabel">
              {darkMode ? "🌙 DarkMode" : "☀️ LightMode"}
            </label>

            <label className="switch">
              <input
                id="Switch"
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;

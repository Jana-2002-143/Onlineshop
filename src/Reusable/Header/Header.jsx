import { useNavigate } from "react-router-dom";
import "./Header.css";
import { useState, useEffect } from "react";

function Header() {
  const products = ["Dresses", "Watches", "Phones", "Laptops"];
  const [switchName, setSwitchName] = useState(false);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSelect = (e) => {
    const category = e.target.value.toLowerCase();
    navigate(`/Productspage/${category}`);
    setMenuOpen(false);
  };

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
  const btnOrder = () => navigate("/Order");
  const btnAbout = () => navigate("/About");

  return (
    <>
      <div className="headerContainer">
        <div className="logo">
          Online<span>Shopping</span>
        </div>
        <nav className="navMenu">
          <p onClick={btnHome}>Home</p>
          <select onChange={handleSelect}>
            <option value="">Select Category</option>
            {products.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
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
        </nav>
        <div className="menuIcon" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>
      </div>

      {menuOpen && (
        <div className="mobileMenu">
          <p onClick={btnHome}>Home</p>

          <select onChange={handleSelect}>
            <option value="">Select Category</option>
            {products.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <p onClick={btnOrder}>Cart</p>
          <p onClick={btnAbout}>About Us</p>

          {/* ADD THIS → toggle visible in mobile */}
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

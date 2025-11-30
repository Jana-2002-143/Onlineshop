import { useNavigate } from "react-router-dom";
import "./Header.css";
import {useState} from 'react'

function Header() {
  const products = ["Dresses", "Watches", "Phones", "Laptaps"];
 const navigate=useNavigate();
 const handleSelect = (e) => {
    const value = e.target.value;
    navigate(`/Productspage/${value}`);
  };

  return (
    <>
    <header className="headercontainer">
      <h1 className="logo">Online Shopping</h1>

      <nav className="navsection">
         <p onClick={() => navigate("/Homepage")}>
          Home
        </p>

        
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

        <p onClick={()=>navigate("/order")}>Orders</p>
        <p>About</p>
      </nav>
    </header>
    </>
  );
}

export default Header;

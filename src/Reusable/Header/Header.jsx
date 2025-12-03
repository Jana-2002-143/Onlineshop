import { useNavigate } from "react-router-dom";

function Header() {
  const products = ["Dresses", "Watches", "Phones", "Laptops"];
  const navigate = useNavigate();

  const handleSelect = (e) => {
    const category = e.target.value;
    navigate(`/${category}`); 
  };

  return (
    <select onChange={handleSelect}>
      {products.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}

export default Header;

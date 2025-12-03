import { useState } from "react";
import Header from "../../Reusable/Header/Header";
import Searchinput from "../../Reusable/Search/Searchinput";
import Order from "../Orderpage/Order";
import "./Dresses.css";
import { useNavigate } from "react-router-dom";

function Dresses({ searchText = "", sort = "" }) {
  const [loadingIndex, setLoadingIndex] = useState(null);

  const dresses = [
    {
      item: "Silhouette Evening Gown",
      money: "₹1400",
      url: "https://cdn.dummyjson.com/product-images/womens-dresses/black-women's-gown/2.webp",
    },
    {
      item: "Royal Lehenga",
      money: "₹1200",
      url: "https://cdn.dummyjson.com/product-images/womens-dresses/corset-leather-with-skirt/3.webp",
    },
    {
      item: "Black Lehenga",
      money: "₹1500",
      url: "https://cdn.dummyjson.com/product-images/womens-dresses/corset-with-black-skirt/2.webp",
    },
    {
      item: "Evening Dress",
      money: "₹900",
      url: "https://cdn.dummyjson.com/product-images/womens-dresses/dress-pea/1.webp",
    },
    {
      item: "Women Casual Dress",
      money: "₹700",
      url: "https://cdn.dummyjson.com/product-images/womens-dresses/marni-red-&-black-suit/1.webp",
    },

    {
      item: "Men Dress Shirt",
      money: "₹450",
      url: "https://cdn.dummyjson.com/product-images/mens-shirts/men-check-shirt/1.webp",
    },
    {
      item: "Men T-Shirt",
      money: "₹350",
      url: "https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/1.webp",
    },
    {
      item: "Men Jacket",
      money: "₹2200",
      url: "https://cdn.dummyjson.com/product-images/mens-shirts/gigabyte-aorus-men-tshirt/2.webp",
    },
    {
      item: "Brown Blazer",
      money: "₹1800",
      url: "https://cdn.dummyjson.com/product-images/mens-shirts/man-plaid-shirt/2.webp",
    },
    {
      item: "Men Casual Shirt",
      money: "₹650",
      url: "https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/2.webp",
    },
  ];
  const navigate = useNavigate();

  const filtered = dresses.filter((d) => {
    return d.item.toLowerCase().includes(searchText.toLowerCase());
  });
  const sorting = [...filtered].sort((a, b) => {
    const priceA = Number(a.money.replace("₹", ""));
    const priceB = Number(b.money.replace("₹", ""));

    if (sort === "asc") return priceA - priceB;
    if (sort === "desc") return priceB - priceA;
    return 0;
  });
  const purchase = async (item, index) => {
    setLoadingIndex(index);
    const data = {
      productsname: item.item,
      price: item.money,
      url: item.url,
      debited: "Gpay",
    };
    try {
      const response = await fetch(
        "https://onlineshop-backend-vvjx.onrender.com/api/dresses",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      console.log("Order saved:", result);
      alert("Add Successfully");
    } catch (error) {
      alert("Backend not reach");
    }finally {
    setLoadingIndex(null);
  }
  };

  return (
    <>
      <div className="productscontainer">
        {sorting.map((item, index) => (
          <div className="oneitem" key={index}>
            <div className="imgcontainer">
              <img src={item.url} alt={item.item} />
            </div>
            <h1 className="producttitle">{item.item}</h1>
            <p className="price">{item.money}</p>
            <button
              type="button"
              onClick={() => {
                purchase(item, index);
              }}
            >
              {loadingIndex === index ? "Adding..." : "AddCart"}
            </button>
          </div>
        ))}

        {filtered.length === 0 && <p className="filter">No products found.</p>}
      </div>
    </>
  );
}
export default Dresses;

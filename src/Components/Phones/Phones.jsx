import { useState } from "react";
import Header from "../../Reusable/Header/Header";
import Searchinput from "../../Reusable/Search/Searchinput";
import Order from "../Orderpage/Order";
import { useNavigate } from "react-router-dom";

function Phones({ searchText = "", sort = "" }) {
  const [loadingIndex, setLoadingIndex] = useState(null);
  const phones = [
    {
      item: "Oppo K1",
      money: "₹17999",
      url: "https://cdn.dummyjson.com/product-images/smartphones/oppo-k1/1.webp",
    },
    {
      item: "Realme C35",
      money: "₹12999",
      url: "https://cdn.dummyjson.com/product-images/smartphones/realme-c35/1.webp",
    },
    {
      item: "Realme X",
      money: "₹15999",
      url: "https://cdn.dummyjson.com/product-images/smartphones/realme-x/1.webp",
    },
    {
      item: "Realme XT",
      money: "₹14999",
      url: "https://cdn.dummyjson.com/product-images/smartphones/realme-xt/1.webp",
    },
    {
      item: "Samsung Galaxy S7",
      money: "₹22999",
      url: "https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s7/1.webp",
    },
    {
      item: "Samsung Galaxy S8",
      money: "₹18999",
      url: "https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s8/1.webp",
    },
    {
      item: "Samsung Galaxy S10",
      money: "₹32999",
      url: "https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s10/1.webp",
    },
    {
      item: "Vivo S1",
      money: "₹16999",
      url: "https://cdn.dummyjson.com/product-images/smartphones/vivo-s1/1.webp",
    },
    {
      item: "Vivo V9",
      money: "₹19999",
      url: "https://cdn.dummyjson.com/product-images/smartphones/vivo-v9/1.webp",
    },
    {
      item: "Vivo X21",
      money: "₹21999",
      url: "https://cdn.dummyjson.com/product-images/smartphones/vivo-x21/1.webp",
    },
  ];
  const navigate = useNavigate();

  const filtered = phones.filter((d) => {
    return d.item.toLowerCase().includes(searchText.toLowerCase());
  });
  const sorting = [...filtered].sort((a, b) => {
    const priceA = Number(a.money.replace("₹", ""));
    const priceB = Number(b.money.replace("₹", ""));

    if (sort === "asc") return priceA - priceB;
    if (sort === "desc") return priceB - priceA;
    return 0;
  });
  const purchase = async (item,index) => {
    setLoadingIndex(index);
    const data = {
      productsname: item.item,
      price: item.money,
      url: item.url,
      debited: "Gpay",
    };
    try {
      const response = await fetch(
        "https://onlineshop-backend-vvjx.onrender.com/api/phones",
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
              href="#"
              onClick={() => {
                purchase(item,index);
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
export default Phones;

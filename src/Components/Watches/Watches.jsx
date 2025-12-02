import { useState } from "react";
import Header from "../../Reusable/Header/Header";
import Searchinput from "../../Reusable/Search/Searchinput";
import Products from "../../Reusable/Products/Productspage";
import Order from "../Orderpage/Order";
import { useNavigate } from "react-router-dom";

function Watches({ searchText = "", sort = "" }) {
  const [buyingIndex, setBuyingIndex] = useState(null);
  const watches = [
    {
      item: "Brown Leather Belt Watch",
      money: "₹6400",
      url: "https://cdn.dummyjson.com/product-images/mens-watches/brown-leather-belt-watch/1.webp",
    },
    {
      item: "Longines Master Collection",
      money: "₹11800",
      url: "https://cdn.dummyjson.com/product-images/mens-watches/longines-master-collection/1.webp",
    },
    {
      item: "Rolex Cellini Date Black Dial",
      money: "₹9200",
      url: "https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-date-black-dial/1.webp",
    },
    {
      item: "Rolex Cellini Moonphase",
      money: "₹13700",
      url: "https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-moonphase/1.webp",
    },
    {
      item: "Rolex Datejust Silver",
      money: "₹8900",
      url: "https://cdn.dummyjson.com/product-images/mens-watches/rolex-datejust/1.webp",
    },
    {
      item: "Rolex Submariner Watch",
      money: "₹14900",
      url: "https://cdn.dummyjson.com/product-images/mens-watches/rolex-submariner-watch/1.webp",
    },
    {
      item: "Brown Luxury Chronograph",
      money: "₹7600",
      url: "https://cdn.dummyjson.com/product-images/mens-watches/brown-leather-belt-watch/2.webp",
    },
    {
      item: "Longines White Dial Premium",
      money: "₹15400",
      url: "https://cdn.dummyjson.com/product-images/mens-watches/longines-master-collection/2.webp",
    },
    {
      item: "Rolex Datejust Gold Edition",
      money: "₹17900",
      url: "https://cdn.dummyjson.com/product-images/mens-watches/rolex-datejust/2.webp",
    },
    {
      item: "Rolex Submariner Premium",
      money: "₹16200",
      url: "https://cdn.dummyjson.com/product-images/mens-watches/rolex-submariner-watch/2.webp",
    },
  ];
  const navigate=useNavigate();

  const filtered = watches.filter((w) => {
    return w.item.toLowerCase().includes(searchText.toLowerCase().trim());
  });
  const sorting = [...filtered].sort((a, b) => {
    const priceA = Number(a.money.replace("₹", ""));
    const priceB = Number(b.money.replace("₹", ""));

    if (sort === "asc") return priceA - priceB;
    if (sort === "desc") return priceB - priceA;
    return 0;
  });
  const purchase = (index) => {
    setBuyingIndex(index);
  };
  const Orderedgpay = async (watches) => {
    const data = {
      productname: watches.item,
      price: watches.money,
      url: watches.url,
      debited: "Gpay",
    };
    try {
      const response = await fetch(
        "https://onlineshop-backend-vvjx.onrender.com/api/watches",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      console.log("Order saved:", result);
      alert("Ordered Successfully at Gpay");
      navigate("/order", { state: result });
    } catch (error) {
      alert("Backend not reach");
    }
  };
  const Orderedphonepay = async (watches) => {
    const data = {
      productname: watches.item,
      price: watches.money,
      url: watches.url,
      debited: "Phonepay",
    };
    try {
      const response = await fetch("https://onlineshop-backend-vvjx.onrender.com/api/watches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log("Order saved:", result);
      alert("Ordered Successfully at Phonepay");
      navigate("/order", { state: result });
    } catch (error) {
      alert("Backend not reach");
    }
  };
  return (
    <>
      <div className="productscontainer">
        {sorting.map((watches, index) => (
          <div className="oneitem" key={index}>
            <div className="imgcontainer">
              <img src={watches.url} alt={watches.item} />
            </div>
            <h1 className="producttitle">{watches.item}</h1>
            <p className="price">{watches.money}</p>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                purchase(index);
              }}
            >
              buy
            </a>
            {buyingIndex === index && (
              <div className="paymentoptions">
                <button
                  type="button"
                  className="gpay-btn"
                  onClick={() => {
                    Orderedgpay(watches);
                  }}
                >
                  GPay
                </button>
                <button
                  type="button"
                  className="gpay-btn"
                  onClick={() => {
                    Orderedphonepay(watches);
                  }}
                >
                  PhonePay
                </button>
              </div>
            )}
          </div>
        ))}

        {filtered.length === 0 && <p className="filter">No products found.</p>}
      </div>
    </>
  );
}
export default Watches;

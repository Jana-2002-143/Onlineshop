import { useState } from "react";
import Header from "../../Reusable/Header/Header";
import Searchinput from "../../Reusable/Search/Searchinput";
import Products from "../../Reusable/Products/Productspage";
import Order from "../Orderpage/Order";

function Watches({ searchText = "" }) {
 const watches = [
  {
    item: "Brown Leather Belt Watch",
    money: "₹6400",
    url: "https://cdn.dummyjson.com/product-images/mens-watches/brown-leather-belt-watch/1.webp"
  },
  {
    item: "Longines Master Collection",
    money: "₹11800",
    url: "https://cdn.dummyjson.com/product-images/mens-watches/longines-master-collection/1.webp"
  },
  {
    item: "Rolex Cellini Date Black Dial",
    money: "₹9200",
    url: "https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-date-black-dial/1.webp"
  },
  {
    item: "Rolex Cellini Moonphase",
    money: "₹13700",
    url: "https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-moonphase/1.webp"
  },
  {
    item: "Rolex Datejust Silver",
    money: "₹8900",
    url: "https://cdn.dummyjson.com/product-images/mens-watches/rolex-datejust/1.webp"
  },
  {
    item: "Rolex Submariner Watch",
    money: "₹14900",
    url: "https://cdn.dummyjson.com/product-images/mens-watches/rolex-submariner-watch/1.webp"
  },
  {
    item: "Brown Luxury Chronograph",
    money: "₹7600",
    url: "https://cdn.dummyjson.com/product-images/mens-watches/brown-leather-belt-watch/2.webp"
  },
  {
    item: "Longines White Dial Premium",
    money: "₹15400",
    url: "https://cdn.dummyjson.com/product-images/mens-watches/longines-master-collection/2.webp"
  },
  {
    item: "Rolex Datejust Gold Edition",
    money: "₹17900",
    url: "https://cdn.dummyjson.com/product-images/mens-watches/rolex-datejust/2.webp"
  },
  {
    item: "Rolex Submariner Premium",
    money: "₹16200",
    url: "https://cdn.dummyjson.com/product-images/mens-watches/rolex-submariner-watch/2.webp"
  }
];


  const filtered = watches.filter((w) => {
    return w.item.toLowerCase().includes(searchText.toLowerCase().trim());
  });

  return (
    <>
    
      <div className="productscontainer">
        {filtered.map((watches, index) => (
          <div className="oneitem" key={index}>
            <div className="imgcontainer">
              <img src={watches.url} alt={watches.item} />
            </div>
            <h1 className="producttitle">{watches.item}</h1>
            <p className="price">{watches.money}</p>
          </div>
        ))}

        {filtered.length === 0 && <p className="filter">No products found.</p>}
      </div>
    </>
  );
}
export default Watches;

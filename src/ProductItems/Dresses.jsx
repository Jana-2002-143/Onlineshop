import { CgProductHunt } from "react-icons/cg";
import "./Dresses.css";

function Dresses({ searchText = "", sort = "" }) {
  const dresses = [
    {
      id: 1,
      item: "Silhouette Evening Gown",
      money: 1400,
      url: "https://cdn.dummyjson.com/product-images/womens-dresses/black-women's-gown/2.webp",
    },
    {
      id: 2,
      item: "Royal Lehenga",
      money: 1200,
      url: "https://cdn.dummyjson.com/product-images/womens-dresses/corset-leather-with-skirt/3.webp",
    },
    {
      id: 3,
      item: "Black Lehenga",
      money: 1500,
      url: "https://cdn.dummyjson.com/product-images/womens-dresses/corset-with-black-skirt/2.webp",
    },
    {
      id: 4,
      item: "Evening Dress",
      money: 900,
      url: "https://cdn.dummyjson.com/product-images/womens-dresses/dress-pea/1.webp",
    },
    {
      id: 5,
      item: "Women Casual Dress",
      money: 700,
      url: "https://cdn.dummyjson.com/product-images/womens-dresses/marni-red-&-black-suit/1.webp",
    },
    {
      id: 6,
      item: "Men Dress Shirt",
      money: 450,
      url: "https://cdn.dummyjson.com/product-images/mens-shirts/men-check-shirt/1.webp",
    },
    {
      id: 7,
      item: "Men T-Shirt",
      money: 350,
      url: "https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/1.webp",
    },
    {
      id: 8,
      item: "Men Jacket",
      money: 2200,
      url: "https://cdn.dummyjson.com/product-images/mens-shirts/gigabyte-aorus-men-tshirt/2.webp",
    },
    {
      id: 9,
      item: "Brown Blazer",
      money: 1800,
      url: "https://cdn.dummyjson.com/product-images/mens-shirts/man-plaid-shirt/2.webp",
    },
    {
      id: 10,
      item: "Men Casual Shirt",
      money: 650,
      url: "https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/2.webp",
    },
  ];
  const filteredDresses = dresses.filter((product) =>
    product.item.toLowerCase().includes(searchText.toLowerCase())
  );
  const sortedDresses = [...filteredDresses].sort((a, b) => {
    if (sort === "asc") return a.money - b.money;
    if (sort === "desc") return b.money - a.money;
    return 0;
  });
  const addOrder = (product) => {
    const orderItem = {
      name: product.item,
      price: product.money,
      image: product.url,
    };
    const existingCart = JSON.parse(localStorage.getItem("cart"))||[];
    existingCart.push(orderItem);
    localStorage.setItem("cart", JSON.stringify(existingCart));
    alert("Added to Cart!");
  };

  return (
    <div className="product-container">
      {sortedDresses.map((product) => (
        <div className="product-card" key={product.id}>
          <img src={product.url} alt={product.item} className="product-image" />
          <h3 className="product-name">{product.item}</h3>
          <p className="product-price">₹{product.money}</p>
          <button
            type="button"
            className="add-cart-btn"
            onClick={()=>addOrder(product)}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default Dresses;

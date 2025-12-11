function Phones({ searchText = "", sort = "" }) {
  const phones = [
    {
      id: 1,
      item: "Oppo K1",
      money: 17999,
      url: "https://cdn.dummyjson.com/product-images/smartphones/oppo-k1/1.webp",
    },
    {
      id: 2,
      item: "Realme C35",
      money: 12999,
      url: "https://cdn.dummyjson.com/product-images/smartphones/realme-c35/1.webp",
    },
    {
      id: 3,
      item: "Realme X",
      money: 15999,
      url: "https://cdn.dummyjson.com/product-images/smartphones/realme-x/1.webp",
    },
    {
      id: 4,
      item: "Realme XT",
      money: 14999,
      url: "https://cdn.dummyjson.com/product-images/smartphones/realme-xt/1.webp",
    },
    {
      id: 5,
      item: "Samsung Galaxy S7",
      money: 22999,
      url: "https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s7/1.webp",
    },
    {
      id: 6,
      item: "Samsung Galaxy S8",
      money: 18999,
      url: "https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s8/1.webp",
    },
    {
      id: 7,
      item: "Samsung Galaxy S10",
      money: 32999,
      url: "https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s10/1.webp",
    },
    {
      id: 8,
      item: "Vivo S1",
      money:16999,
      url: "https://cdn.dummyjson.com/product-images/smartphones/vivo-s1/1.webp",
    },
    {
      id: 9,
      item: "Vivo V9",
      money: 19999,
      url: "https://cdn.dummyjson.com/product-images/smartphones/vivo-v9/1.webp",
    },
    {
      id: 10,
      item: "Vivo X21",
      money: 21999,
      url: "https://cdn.dummyjson.com/product-images/smartphones/vivo-x21/1.webp",
    },
  ];
  const filteredPhones = phones.filter((product) =>
    product.item.toLowerCase().includes(searchText.toLowerCase())
  );
  const sortedPhones = [...filteredPhones].sort((a, b) => {
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
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    existingCart.push(orderItem);
    localStorage.setItem("cart", JSON.stringify(existingCart));
    alert("Added to Cart!");
  };
  return (
    <div className="product-container">
      {sortedPhones.map((product) => (
        <div className="product-card" key={product.id}>
          <img src={product.url} alt={product.item} className="product-image" />
          <h3 className="product-name">{product.item}</h3>
          <p className="product-price">₹{product.money}</p>
          <button
            type="button"
            className="add-cart-btn"
            onClick={() => addOrder(product)}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default Phones;

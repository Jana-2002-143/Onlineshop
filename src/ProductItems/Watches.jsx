function Watches({ searchText = "", sort = "" }) {
  const watches = [
    {
      id: 1,
      item: "Brown Leather Belt Watch",
      money: 6400,
      url: "https://cdn.dummyjson.com/product-images/mens-watches/brown-leather-belt-watch/1.webp",
    },
    {
      id: 2,
      item: "Longines Master Collection",
      money: 11800,
      url: "https://cdn.dummyjson.com/product-images/mens-watches/longines-master-collection/1.webp",
    },
    {
      id: 3,
      item: "Rolex Cellini Date Black Dial",
      money: 9200,
      url: "https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-date-black-dial/1.webp",
    },
    {
      id: 4,
      item: "Rolex Cellini Moonphase",
      money: 13700,
      url: "https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-moonphase/1.webp",
    },
    {
      id: 5,
      item: "Rolex Datejust Silver",
      money: 8900,
      url: "https://cdn.dummyjson.com/product-images/mens-watches/rolex-datejust/1.webp",
    },
    {
      id: 6,
      item: "Rolex Submariner Watch",
      money: 14900,
      url: "https://cdn.dummyjson.com/product-images/mens-watches/rolex-submariner-watch/1.webp",
    },
    {
      id: 7,
      item: "Brown Luxury Chronograph",
      money: 7600,
      url: "https://cdn.dummyjson.com/product-images/mens-watches/brown-leather-belt-watch/2.webp",
    },
    {
      id: 8,
      item: "Longines White Dial Premium",
      money: 15400,
      url: "https://cdn.dummyjson.com/product-images/mens-watches/longines-master-collection/2.webp",
    },
    {
      id: 9,
      item: "Rolex Datejust Gold Edition",
      money: 17900,
      url: "https://cdn.dummyjson.com/product-images/mens-watches/rolex-datejust/2.webp",
    },
    {
      id: 10,
      item: "Rolex Submariner Premium",
      money: 16200,
      url: "https://cdn.dummyjson.com/product-images/mens-watches/rolex-submariner-watch/2.webp",
    },
  ];
  const filteredWatches = watches.filter((product) =>
    product.item.toLowerCase().includes(searchText.toLowerCase())
  );
  const sortedWatches = [...filteredWatches].sort((a, b) => {
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
      {sortedWatches.map((product) => (
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

export default Watches;

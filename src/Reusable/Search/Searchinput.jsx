import "./Searchinput.css";

function Searchinput({ onSearch, onSort, onCategoryChange, selectedCategory }) {
  const products = ["Dresses", "Watches", "Phones", "Laptops"];

  const handleSelect = (e) => {
    const category = e.target.value;
    onCategoryChange(category);
  };

  return (
    <div className="searchcontainer">
      <input type="search" placeholder="Search Products" onChange={onSearch} />
      <select
        className="categorybox"
        value={selectedCategory}
        onChange={handleSelect}
      >
        <option value="">All Products</option>
        {products.map((item) => (
          <option key={item} value={item.toLowerCase()}>
            {item}
          </option>
        ))}
      </select>

      <select className="sortbox" onChange={onSort}>
        <option value="">Sort</option>
        <option value="asc">Low to High</option>
        <option value="desc">High to Low</option>
      </select>
    </div>
  );
}

export default Searchinput;

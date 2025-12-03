import "./Searchinput.css";

function Searchinput({ onSearch, onSort }) {
  return (
    <div className="searchcontainer">
      <input
        type="search"
        placeholder="Search Products"
        onChange={onSearch}
      />
      <select className="sortbox" onChange={onSort}>
        <option value="">Sort</option>
        <option value="asc">Low to High</option>
        <option value="desc">High to Low</option>
      </select>
    </div>
  );
}

export default Searchinput;

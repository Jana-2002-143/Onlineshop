import "./Searchinput.css";

function Searchinput({ onSearch,sort }) {

  return (
    <div className="searchcontainer">
      <input
        type="search"
        placeholder="Products"
        onChange={onSearch}
      />
       <select className="sortbox" onChange={sort}>
        <option value="">Sort</option>
        <option value="asc">Low to High</option>
        <option value="desc">High to Low</option>
      </select>
    </div>
  );
}

export default Searchinput;

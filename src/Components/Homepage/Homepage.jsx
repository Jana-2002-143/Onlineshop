import Header from "../../Reusable/Header/Header";
import Searchinput from "../../Reusable/Search/Searchinput";
import "./Homepage.css";
import Productspage from "../Products/Productspage";
import { useState } from "react";

function Homepage() {
  const [searchText, setSearchText] = useState("");
  const [sort, setSort] = useState("");

  return (
    <div className="homecontainer">
      <Header />
      <Searchinput
        onSearch={(e) => setSearchText(e.target.value)}
        onSort={(e) => setSort(e.target.value)}
      />
      <Dresses searchText={searchText} sort={sort} />
      <Watches searchText={searchText} sort={sort} />
      <Phones searchText={searchText} sort={sort} />
      <Laptops searchText={searchText} sort={sort} />
    </div>
  );
}

export default Homepage;

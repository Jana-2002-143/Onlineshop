import Header from "../../Reusable/Header/Header";
import Searchinput from "../../Reusable/Search/Searchinput";
import Dresses from "../Dresses/Dresses";
import Watches from "../Watches/Watches";
import Phones from "../Phones/Phones";
import Laptops from "../Laptops/Laptops";
import Order from "../Orderpage/Order";
import About from "../About/About";
import "./Homepage.css";
import { useState } from "react";

function Homepage() {
  const [searchText, setSearchText] = useState("");
  const [sort, setSort] = useState("");

  return (
    <>
      <div className="homecontainer">
        <Header />
        <Searchinput
          onSearch={(e) => setSearchText(e.target.value)}
          sort={(e) => setSort(e.target.value)}
        />
        <Dresses searchText={searchText} sort={sort}/>
        <Watches searchText={searchText} sort={sort}/>
        <Phones searchText={searchText} sort={sort}/>
        <Laptops searchText={searchText} sort={sort}/>
      </div>
    </>
  );
}
export default Homepage;

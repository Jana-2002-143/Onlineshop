import { Routes, Route, useParams } from "react-router-dom";
import Header from "../Header/Header";
import Searchinput from "../Search/Searchinput";
import Dresses from "../../Components/Dresses/Dresses";
import Watches from "../../Components/Watches/Watches";
import Phones from "../../Components/Phones/Phones";
import Laptops from "../../Components/Laptops/Laptops";
import Order from "../../Components/Orderpage/Order";
import { useState } from "react";

function Productspage({selectedItem=""}) {
  const [searchText, setSearchText] = useState("");
  const [sort, setSort] = useState("");
  const { category } = useParams();
  const ordersss=<Order selectedItem={selectedItem}/>

  return (
    <>
      <Header />
      <Searchinput
        onSearch={(e) => setSearchText(e.target.value)}
        sort={(e) => setSort(e.target.value)}
      />

      {category === "Dresses" && (
        <Dresses searchText={searchText} sort={sort} />
      )}
      {category === "Watches" && (
        <Watches searchText={searchText} sort={sort} />
      )}
      {category === "Phones" && (
        <Phones searchText={searchText} sort={sort} />
      )}
      {category === "Laptaps" && (
        <Laptaps searchText={searchText} sort={sort}/>
      )}
    </>
  );
}

export default Productspage;

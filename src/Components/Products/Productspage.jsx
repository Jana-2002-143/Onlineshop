import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../Reusable/Header/Header";
import Searchinput from "../../Reusable/Search/Searchinput";
import Dresses from "../../ProductItems/Dresses";
import Phones from "../../ProductItems/Phones";
import Laptops from "../../ProductItems/Laptops";
import Watches from "../../ProductItems/Watches";

function Productspage() {
  const { category } = useParams(); 
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [sort, setSort] = useState("");
  const [currentCategory, setCurrentCategory] = useState(category);
  useEffect(() => {
    setCurrentCategory(category);
  }, [category]);

  const renderCategory = () => {
    switch (currentCategory?.toLowerCase()) {
      case "dresses":
        return <Dresses searchText={searchText} sort={sort} />;
      case "phones":
        return <Phones searchText={searchText} sort={sort} />;
      case "laptops":
        return <Laptops searchText={searchText} sort={sort} />;
      case "watches":
        return <Watches searchText={searchText} sort={sort} />;
      default:
        return <p>Please select a category from the header</p>;
    }
  };

  return (
    <>
      <Header />
      <Searchinput
        onSearch={(e) => setSearchText(e.target.value)}
        onSort={(e) => setSort(e.target.value)}
      />
      <div className="productspage-container">{renderCategory()}</div>
    </>
  );
}

export default Productspage;

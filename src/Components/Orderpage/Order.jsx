import Dresses from "../Dresses/Dresses";
import Header from "../../Reusable/Header/Header";
import Watches from "../Watches/Watches";
import Phones from "../Phones/Phones";
import Laptaps from "../Laptaps/Laptaps";

function Order({ selectedItem = {} }) {
  
  if (!selectedItem) return <div><Header /><br/><p>No Orders Available</p></div>;
  return (
    <>
    <Header />
    <div className="orderContainer">
      <h2>Order Summary</h2>
      <img src={selectedItem.url} alt={selectedItem.item} style={{ width: 120 }} />
      <p>{selectedItem.item}</p>
      <p>{selectedItem.money}</p>
      <button>Place Order</button>
    </div>
    </>
  );
}

export default Order;

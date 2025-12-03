import Header from "../../Reusable/Header/Header";
import { useLocation } from "react-router-dom";

function Order() {
  const location = useLocation();
  const selectedItem = location.state;

  if (!selectedItem) {
    return (
      <div>
        <Header />
        <br />
        <p>No Orders Available</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="orderContainer">
        <h2>Order Summary</h2>
        <img
          src={selectedItem.url}
          alt={selectedItem.productsname}
          style={{ width: 120 }}
        />

        <p>{selectedItem.productsname}</p>
        <p>{selectedItem.price}</p>
        <p>{selectedItem.debited}</p>
      </div>
    </>
  );
}

export default Order;

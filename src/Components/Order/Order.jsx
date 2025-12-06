import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Order() {
  const [ordersHistory, setOrdersHistory] = useState([orderHistory]);
  const location = useLocation();
useEffect(() => {
    if (location.state?.orders) {
      setOrdersHistory(location.state.orders);
    }
  
  }, [location.state]);
  return (
    <>
      return (
      <div>
        <button onClick={history}>Order History</button>

        <div className="history-container">
          {ordersHistory.map((order) => (
            <div key={order.id} className="history-card">
              <img src={order.image} alt={order.itemName} />
              <h3>{order.itemName}</h3>
              <p>₹{order.price}</p>
              <p>{order.date}</p>
            </div>
          ))}
        </div>
      </div>
      );
    </>
  );
}
export default Order;

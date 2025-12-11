import Header from "../../Reusable/Header/Header";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Order.css";

function Order() {
  const location = useLocation();
  const [ordersHistory, setOrdersHistory] = useState([]);

  useEffect(() => {
    console.log("Location state:", location.state);
    if (location.state?.orders) {
      setOrdersHistory(location.state.orders);
    }
  }, [location.state]);

  return (
    <div className="history-container">
      <Header />

      <div className="history-content">
        {ordersHistory.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div>
            <h1>Order History</h1>

            {ordersHistory.map((order) => (
              <div key={order.id} className="history-card">
                <img src={order.image} alt={order.itemName} />
                <div className="history-info">
                  <h3>{order.itemName}</h3>
                  <p>Quantity:{order.quantity}</p>
                  <p>Price:₹{order.price}</p>
                  <p>Date:{order.date}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Order;

function Order(orderHistory="") {
  const [ordersHistory, setOrdersHistory] = useState([orderHistory]);
  return (
    <>
      return (
      <div>
        <button onClick={history}>Load History</button>

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

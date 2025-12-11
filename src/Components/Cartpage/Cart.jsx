import Header from "../../Reusable/Header/Header";
import { useEffect, useState } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import "./Cart.css";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartWithUniqueIds = storedCart.map((item) => ({
      ...item,
      id: item.id ? item.id : Date.now() + Math.random(),
      quantity: item.quantity || 1,
    }));
    setCartItems(cartWithUniqueIds);
  }, []);

  const updateCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  const onIncrement = (id) => {
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updated);
  };

  const onDecrement = (id) => {
    const updated = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
        : item
    );
    updateCart(updated);
  };

  const deleteCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    updateCart(updatedCart);
  };

  const paymentOption = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const buyerName = localStorage.getItem("username");
  const buyerEmail = localStorage.getItem("email");
  const stt = new Date();
  const day = String(stt.getDate()).padStart(2, "0");
  const month = String(stt.getMonth()).padStart(2, "0");
  const year = String(stt.getFullYear());
  const hours = String(stt.getHours()).padStart(2, "0");
  const minutes = String(stt.getMinutes()).padStart(2, "0");
  const seconds = String(stt.getSeconds()).padStart(2, "0");
  const localdate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

  const handlePayment = async (method) => {
    if (!selectedItem) return;
    const data = {
      buyerName,
      buyerEmail,
      itemName: selectedItem.name,
      quantity: selectedItem.quantity,
      date: localdate,
      price: parseInt(selectedItem.price, 10) * selectedItem.quantity,
      image: selectedItem.image,
      debited: method,
    };

    try {
      const response = await fetch(
        "https://productbackend-oi15.onrender.com/api/order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const updatedCart = cartItems.filter((c) => c.id !== selectedItem.id);
        updateCart(updatedCart);
        window.location.href = "/success";
      } else {
        const errorMsg = await response.text();
        alert("Payment Failed: " + errorMsg);
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("Network Error: Could not connect to server");
    }
  };

  return (
    <>
      <Header />
      <div className="orderContainer">
        <h2>Order Summary</h2>
        {cartItems.length === 0 ? (
          <p>No Orders Available</p>
        ) : (
          cartItems.map((item, index) => (
            <div key={`${item.id}${index}`} className="orderItem">
              <img src={item.image} alt={item.name} style={{ width: 120 }} />
              <p>{item.name}</p>
              <p>₹ {item.price}</p>
              <div className="counter-container">
                <button
                  onClick={() => onDecrement(item.id)}
                  type="button"
                  className="countdown"
                >
                  -
                </button>
                <p className="counter-number">{item.quantity}</p>
                <button
                  onClick={() => onIncrement(item.id)}
                  type="button"
                  className="countdown"
                >
                  +
                </button>
                <RiDeleteBin6Fill
                  className="delete-icon"
                  onClick={() => deleteCart(item.id)}
                />
              </div>
              <button
                type="button"
                className="buyproduct"
                onClick={() => paymentOption(item)}
              >
                Buy
              </button>
            </div>
          ))
        )}
        {showModal && selectedItem && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h3>Select Payment</h3>
              <p className="pay-option" onClick={() => handlePayment("Gpay")}>
                GPay
              </p>
              <p
                className="pay-option"
                onClick={() => handlePayment("Phonepay")}
              >
                PhonePe
              </p>
              <button className="close-btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;

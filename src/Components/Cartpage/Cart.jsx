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
    const cartWithQty = storedCart.map((item) => ({
      ...item,
      quantity: item.quantity || 1,
    }));
    setCartItems(cartWithQty);
  }, []);

  const onIncrement = (id) => {
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updated);
  };

  const onDecrement = (id) => {
    const updated = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
        : item
    );
    setCartItems(updated);
  };
  const deleteCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  const paymentOption = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const buyer = localStorage.getItem("username");
  const buyeraccount = localStorage.getItem("email");
  const onGpay = async (e) => {
    e.preventDefault();
    if (!selectedItem) return;
    const data = {
      buyerName: buyer,
      buyerEmail: buyeraccount,
      itemName: selectedItem.name,
      price: selectedItem.price,
      image: selectedItem.image,
      debited: "Gpay",
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
        console.log("Successfull");
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
  const onPhonepay = async (e) => {
    e.preventDefault();
    if (!selectedItem) return;
    const data = {
      buyerName: buyer,
      buyerEmail: buyeraccount,
      itemName: selectedItem.name,
      price: selectedItem.price,
      image: selectedItem.image,
      debited: "Phonepay",
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
          cartItems.map((item) => (
            <div key={item.id} className="orderItem">
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
              <div>
                <button
                  type="button"
                  className="buyproduct"
                  onClick={() => paymentOption(item)}
                >
                  Buy
                </button>
                {showModal && (
                  <div className="modal-overlay">
                    <div className="modal-box">
                      <h3>Select Payment</h3>

                      <p className="pay-option" onClick={onGpay}>
                        GPay
                      </p>
                      <p className="pay-option" onClick={onPhonepay}>
                        PhonePe
                      </p>

                      <button className="close-btn" onClick={closeModal}>
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Cart;

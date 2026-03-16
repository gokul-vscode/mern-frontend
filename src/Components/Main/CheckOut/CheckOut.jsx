import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./CheckOut.css";

// Render Backend Live API Link
const API_ORDER_URL = "https://mern-backend-yqlo.onrender.com/api/orders/create";

function Checkout() {
  const cartItems = useSelector((state) => state.cart.cartItems);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.productPrice * item.quantity,
    0
  );

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, []);

  const placeOrder = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to place an order");
      return;
    }

    if (!address) {
      alert("Please enter your shipping address");
      return;
    }

    try {
      const res = await fetch(API_ORDER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          products: cartItems,
          totalAmount,
          address,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Order placed successfully! 🎉");
        // Order success aanathum cart-ai clear panna logic inga add pannalam
        window.location.href = "/"; 
      } else {
        alert(data.message || "Failed to place order");
      }
    } catch (error) {
      console.log("Order Error:", error);
      alert("Server error while placing order.");
    }
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>

      <div className="checkout-container">
        {/* LEFT SIDE: Cart Summary */}
        <div className="checkout-products">
          <h3>Your Cart</h3>
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div className="checkout-item" key={item.id}>
                <img src={item.image} alt={item.productName} />
                <div>
                  <h4>{item.productName}</h4>
                  <p>₹{item.productPrice}</p>
                  <p>Qty: {item.quantity}</p>
                </div>
                <p>₹{item.productPrice * item.quantity}</p>
              </div>
            ))
          )}
        </div>

        {/* RIGHT SIDE: Shipping Form */}
        <div className="checkout-form">
          <h3>Shipping Details</h3>

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <textarea
            placeholder="Complete Shipping Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows="4"
          />

          <div className="checkout-total">
            <h3>Total Amount: ₹{totalAmount}</h3>
          </div>

          <button 
            onClick={placeOrder} 
            disabled={cartItems.length === 0}
            className="place-order-btn"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
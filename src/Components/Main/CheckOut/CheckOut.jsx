import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./CheckOut.css";

function Checkout() {

  const cartItems = useSelector(state => state.cart.cartItems);

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [address,setAddress] = useState("");

  const totalAmount = cartItems.reduce(
    (acc,item)=>acc + item.productPrice * item.quantity,0
  );

  useEffect(()=>{

    const user = JSON.parse(localStorage.getItem("user"));

    if(user){
      setName(user.name);
      setEmail(user.email);
    }

  },[])

  const placeOrder = async () => {

    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/orders/create",{

      method:"POST",

      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
      },

      body:JSON.stringify({
        products:cartItems,
        totalAmount,
        address
      })

    });

    const data = await res.json();

    alert(data.message);

  }

  return(

    <div className="checkout-page">

      <h2>Checkout</h2>

      <div className="checkout-container">

        {/* LEFT SIDE */}

        <div className="checkout-products">

          <h3>Your Cart</h3>

          {cartItems.map(item=>(
            <div className="checkout-item" key={item.id}>

              <img src={item.image} alt="" />

              <div>
                <h4>{item.productName}</h4>
                <p>₹{item.productPrice}</p>
                <p>Qty: {item.quantity}</p>
              </div>

              <p>
                ₹{item.productPrice * item.quantity}
              </p>

            </div>
          ))}

        </div>


        {/* RIGHT SIDE */}

        <div className="checkout-form">

          <h3>Shipping Details</h3>

          <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          />

          <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          />

          <textarea
          placeholder="Address"
          value={address}
          onChange={(e)=>setAddress(e.target.value)}
          />

          <h3>Total: ₹{totalAmount}</h3>

          <button onClick={placeOrder}>
            Place Order
          </button>

        </div>

      </div>

    </div>

  )

}

export default Checkout;
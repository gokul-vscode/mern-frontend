import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../CartSlice/CartSlice";

import "./ProductDetails.css";

// Render Backend Live API Link
const API_URL = "https://mern-backend-yqlo.onrender.com/api/products";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [color, setColor] = useState("Black");
  const [showImage, setShowImage] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    // Localhost:5000-ku bathila live link use panniyachu
    fetch(`${API_URL}/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.log("Error fetching product details:", err));
  }, [id]);

  if (!product) {
    return <h2 className="pd-loading">Loading...</h2>;
  }

  const increase = () => setQty(qty + 1);

  const decrease = () => {
    if (qty > 1) setQty(qty - 1);
  };

  return (
    <div className="pd-container">
      <div className="pd-card">
        {/* IMAGE SECTION */}
        <div className="pd-image-section">
          <img
            src={product.image}
            alt={product.productName}
            onClick={() => setShowImage(true)}
            className="pd-main-img"
            style={{ cursor: "zoom-in" }}
          />
          <p className="pd-zoom-text">Click image to zoom</p>
        </div>

        {/* DETAILS SECTION */}
        <div className="pd-details">
          <h1 className="pd-title">{product.productName}</h1>

          <p className="pd-description">
            {product.description || "Premium quality shoes with stylish design and comfortable fit."}
          </p>

          <h2 className="pd-price">₹{product.productPrice}</h2>

          {/* COLOR SELECTION */}
          <div className="pd-color-section">
            <h4>Select Color</h4>
            <div className="pd-color-options">
              <span
                className={`pd-color-circle pd-black ${color === "Black" ? "pd-active" : ""}`}
                onClick={() => setColor("Black")}
              ></span>
              <span
                className={`pd-color-circle pd-red ${color === "Red" ? "pd-active" : ""}`}
                onClick={() => setColor("Red")}
              ></span>
              <span
                className={`pd-color-circle pd-blue ${color === "Blue" ? "pd-active" : ""}`}
                onClick={() => setColor("Blue")}
              ></span>
            </div>
          </div>

          {/* QUANTITY SECTION */}
          <div className="pd-qty-section">
            <h4>Quantity</h4>
            <div className="pd-qty-box">
              <button onClick={decrease}>-</button>
              <span>{qty}</span>
              <button onClick={increase}>+</button>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="pd-buttons">
            <button
              className="pd-cart-btn"
              onClick={() => {
                dispatch(
                  addToCart({
                    id: product._id,
                    productName: product.productName,
                    productPrice: product.productPrice,
                    image: product.image,
                    quantity: qty, // Quantity-ahyum cart-ku anupuvom
                  })
                );
                alert(`${product.productName} added to cart!`);
              }}
            >
              Add To Cart
            </button>

            <button className="pd-buy-btn">Buy Now</button>
          </div>
        </div>
      </div>

      {/* IMAGE ZOOM MODAL */}
      {showImage && (
        <div className="pd-modal" onClick={() => setShowImage(false)}>
          <span className="pd-close">✕</span>
          <img src={product.image} alt="zoom" className="pd-zoom-img" />
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
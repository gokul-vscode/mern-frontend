import React, { useState, useEffect } from "react";
import "./Banner.css";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../../CartSlice/CartSlice";
import { useDispatch } from "react-redux";
function Banner() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [activeBrand, setActiveBrand] = useState("");

  const navigate = useNavigate();
useEffect(() => {
    // Localhost link-ku bathila Render link-ai podunga
    fetch("https://mern-backend-yqlo.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        if (data.length > 0) {
          setActiveBrand(data[0].category);
        }
      })
      .catch((err) => console.log("Error fetching products:", err));
  }, []);

  const brands = [...new Set(products.map((p) => p.category))];

  // Only category filter
  const filteredProducts = products.filter(
    (p) => p.category === activeBrand
  );

  return (
    <section className="brand-tabs" id="products">
      <div className="tabs">
        {brands.map((brand) => (
          <button
            key={brand}
            className={activeBrand === brand ? "tab active" : "tab"}
            onClick={() => setActiveBrand(brand)}
          >
            {brand}
          </button>
        ))}
      </div>
      <div className="tab-content">

  {filteredProducts.map((product) => (

    <div
      key={product._id}
      className="brand-card"
    >

      <img
        src={product.image}
        alt={product.productName}
        onClick={() => navigate(`/product/${product._id}`)}
      />

      <h3 onClick={() => navigate(`/product/${product._id}`)}>
        {product.productName}
      </h3>

      <p>{product.description}</p>

      <h4>₹{product.productPrice}</h4>

      <FaShoppingCart
        className="cart-icon"
        onClick={() => {
          dispatch(
            addToCart({
              id: product._id,
              productName: product.productName,
              productPrice: product.productPrice,
              image: product.image,
            })
          );
        }}
      />

    </div>

  ))}

</div>
    </section>
  );
}

export default Banner;
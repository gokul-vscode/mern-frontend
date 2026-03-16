import React, { useEffect, useState } from "react";
import "./Products.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart as addToCartRedux } from "../../../CartSlice/CartSlice";

// Unga Render Backend Live Link
const API_BASE_URL = "https://mern-backend-yqlo.onrender.com/api";

function Products() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 1. Fetching Products from Atlas via Render
  useEffect(() => {
    fetch(`${API_BASE_URL}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log("Error fetching products:", err));
  }, []);

  // unique categories logic
  const categories = [...new Set(products.map((p) => p.category))];

  const handleAddToCart = async (product) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/auth");
      return;
    }

    try {
      // 2. Add to Cart Live API Call
      const response = await fetch(`${API_BASE_URL}/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product._id,
        }),
      });

      if (response.ok) {
        dispatch(
          addToCartRedux({
            id: product._id,
            productName: product.productName,
            productPrice: product.productPrice,
            image: product.image,
          })
        );
        alert(`${product.productName} added to cart!`);
      } else {
        alert("Failed to add to cart. Please try again.");
      }
    } catch (error) {
      console.log("Cart Error:", error);
    }
  };

  return (
    <section className="products-page">
      <h2>Shop Shoes</h2>

      {categories.map((category) => (
        <div className="category-section" key={category}>
          <h3 className="category-title">{category}</h3>

          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={20}
            slidesPerView={4}
            breakpoints={{
              320: { slidesPerView: 1 },
              600: { slidesPerView: 2 },
              900: { slidesPerView: 3 },
              1200: { slidesPerView: 4 },
            }}
          >
            {products
              .filter((p) => p.category === category)
              .map((product) => (
                <SwiperSlide key={product._id}>
                  <div className="product-card">
                    <img
                      src={product.image}
                      alt={product.productName}
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(`/product/${product._id}`)}
                    />

                    <h4
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(`/product/${product._id}`)}
                    >
                      {product.productName}
                    </h4>

                    <p className="price">₹{product.productPrice}</p>

                    <button onClick={() => handleAddToCart(product)}>
                      Add to Cart
                    </button>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      ))}
    </section>
  );
}

export default Products;
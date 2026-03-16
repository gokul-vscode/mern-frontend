import React, { useEffect, useState } from "react";
import "./Products.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart as addToCartRedux } from "../../../CartSlice/CartSlice";

function Products() {

  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.log(err));
  }, []);

  // unique categories
  const categories = [...new Set(products.map(p => p.category))];


  const handleAddToCart = async (product) => {

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/auth");
      return;
    }

    try {

      await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          productId: product._id
        })
      });

      dispatch(
        addToCartRedux({
          id: product._id,
          productName: product.productName,
          productPrice: product.productPrice,
          image: product.image
        })
      );

    } catch (error) {
      console.log(error);
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
              1200: { slidesPerView: 4 }
            }}
          >

            {products
              .filter(p => p.category === category)
              .map(product => (

                <SwiperSlide key={product._id}>

                  <div className="product-card">

                    <img
                      src={product.image}
                      alt={product.productName}
                      onClick={() => navigate(`/product/${product._id}`)}
                    />

                    <h4 onClick={() => navigate(`/product/${product._id}`)}>
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
import React, { useState } from "react";
import { useEffect } from "react";
import "./Navbar.css";
import { FaSearch, FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { incrementQty, decrementQty, removeFromCart } from "../CartSlice/CartSlice";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";



const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);


  const cartItems = useSelector(state => state.cart.cartItems);
  const dispatch = useDispatch();
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.productPrice * item.quantity,
    0
  );

  //username
  useEffect(() => {

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

  }, []);

  //logout
  const handleLogout = () => {

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    window.location.reload();

  };


  // Backend Cart Load panna useEffect add pannanum
  // Navbar la page load aagumbothu cart fetch panna vendum.
  const fetchCart = async () => {

    const token = localStorage.getItem("token");

    if (!token) return;

    const res = await fetch("http://localhost:5000/api/cart", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();

    console.log(data);

  };
  useEffect(() => {

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    fetchCart();

  }, []);




  //search products
  const [products, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {

    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data));

  }, []);

  const handleSearch = (e) => {

    const value = e.target.value;

    setSearchValue(value);

    if (value === "") {
      setFilteredProducts([]);
      return;
    }

    const results = products.filter(p =>
      p.productName.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredProducts(results);

  };
  return (
    <header className="navbar">

      <div className="logo">Shoe-Mart</div>

      <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
        <a href="#">Home</a>
        <a href="#products">Products</a>
        <a href="#contact">Contacts</a>
      </nav>

      <div className="nav-icons">
        {showSearch && (
          <input
            type="text"
            className="search-box"
            placeholder="Search products..."
            value={searchValue}
            onChange={handleSearch}
          />
        )}
        <div className="icon" onClick={() => setShowSearch(!showSearch)}><FaSearch /></div>
        {showSearch && filteredProducts.length > 0 && (

          <div className="search-results">

            {filteredProducts.map(product => (

              <div
                className="search-item"
                key={product._id}
                onClick={() => navigate(`/product/${product._id}`)}
              >

                <img src={product.image} alt="" />

                <span>{product.productName}</span>

              </div>

            ))}

          </div>

        )}

        <div className="icon cart" onClick={() => setOpenCart(true)}>
          <FaShoppingCart />
          <span className="cart-count">{cartItems.length}</span>
        </div>

        {/* CART DRAWER */}

        <div className={`cart-drawer ${openCart ? "active" : ""}`}>

          <div className="cart-header">
            <h2>Your Cart</h2>
            <button onClick={() => setOpenCart(false)}>✕</button>
          </div>

          <div className="cart-items">

            {cartItems.map((item) => (

              <div className="cart-item" key={item.id}>

                <img src={item.image} alt="" />

                <div className="cart-details">

                  <h4>{item.productName}</h4>

                  <p>₹{item.productPrice}</p>

                  {/* QTY */}

                  <div className="qty-box">

                    <button onClick={() => dispatch(decrementQty(item.id))}>-</button>

                    <span>{item.quantity}</span>

                    <button onClick={() => dispatch(incrementQty(item.id))}>+</button>

                  </div>

                  {/* PRODUCT TOTAL */}

                  <p className="item-total">
                    Total: ₹{item.productPrice * item.quantity}
                  </p>

                </div>

                {/* REMOVE ICON */}

                <FaTrash
                  className="remove-icon"
                  onClick={() => dispatch(removeFromCart(item.id))}
                />

              </div>

            ))}

          </div>

          {/* WHOLE TOTAL */}

          <div className="cart-footer">

            <h3>Total: ₹ {totalAmount}</h3>

            <button className="checkout-btn" onClick={() => navigate("/checkout")}>
              Checkout
            </button>

          </div>

        </div>


        <div className="user-section">

          {user ? (

            <div className="user-info">

              <span className="username">{user.name}</span>

              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>

            </div>

          ) : (

            <div className="icon" onClick={() => navigate("/auth")}>
              <FaUser />
            </div>

          )}

        </div>
      </div>

      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

    </header>
  );
};

export default Navbar;
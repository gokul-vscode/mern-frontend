import React, { useState, useEffect } from "react";
import "./Navbar.css";
import {
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
  FaTrash
} from "react-icons/fa";
import {
  incrementQty,
  decrementQty,
  removeFromCart
} from "../CartSlice/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [user, setUser] = useState(null);

  const [products, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.productPrice * item.quantity,
    0
  );

  // 🔹 USER LOAD
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // 🔹 FETCH PRODUCTS
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setProducts(data);
        else if (Array.isArray(data.products)) setProducts(data.products);
        else setProducts([]);
      })
      .catch((err) => console.log(err));
  }, []);

  // 🔍 SEARCH FUNCTION
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchValue(value);

    if (!value) {
      setFilteredProducts([]);
      return;
    }

    const results = products.filter((p) => {
      return (
        p.productName?.toLowerCase().includes(value) ||
        p.name?.toLowerCase().includes(value) ||
        p.brand?.toLowerCase().includes(value) ||
        p.category?.toLowerCase().includes(value)
      );
    });

    setFilteredProducts(results);
  };

  // 🔹 LOGOUT
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <header className="navbar">
      <div className="logo">Shoe-Mart</div>

      <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
        <a href="/">Home</a>
        <a href="#products">Products</a>
        <a href="#contact">Contact</a>
      </nav>

      <div className="nav-icons">
        {/* 🔍 SEARCH */}
        <div className="search-container">
          {showSearch && (
            <input
              type="text"
              className="search-box"
              placeholder="Search products..."
              value={searchValue}
              onChange={handleSearch}
            />
          )}

          <div className="icon" onClick={() => setShowSearch(!showSearch)}>
            <FaSearch />
          </div>

          {showSearch && searchValue && (
            <div className="search-results">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div
                    className="search-item"
                    key={product._id}
                    onClick={() => navigate(`/product/${product._id}`)}
                  >
                    <img src={product.image} alt="" />
                    <span>{product.productName}</span>
                  </div>
                ))
              ) : (
                <p>No products found</p>
              )}
            </div>
          )}
        </div>

        {/* 🛒 CART */}
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

                  <div className="qty-box">
                    <button onClick={() => dispatch(decrementQty(item.id))}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => dispatch(incrementQty(item.id))}>+</button>
                  </div>

                  <p className="item-total">
                    ₹{item.productPrice * item.quantity}
                  </p>
                </div>

                <FaTrash
                  className="remove-icon"
                  onClick={() => dispatch(removeFromCart(item.id))}
                />
              </div>
            ))}
          </div>

          <div className="cart-footer">
            <h3>Total: ₹ {totalAmount}</h3>
            <button onClick={() => navigate("/checkout")} className="checkout-btn">
              Checkout
            </button>
          </div>
        </div>

        {/* 👤 USER */}
        <div className="user-section">
          {user ? (
            <>
              <span className="username">{user.name}</span>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <div className="icon" onClick={() => navigate("/auth")}>
              <FaUser />
            </div>
          )}
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </header>
  );
};

export default Navbar;
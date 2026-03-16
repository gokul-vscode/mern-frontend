import React, { useState } from "react";
import "./Auth.css";

// Render Backend URL
const API_AUTH_URL = "https://mern-backend-yqlo.onrender.com/api/auth";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Live URL logic
    const url = isLogin
      ? `${API_AUTH_URL}/login`
      : `${API_AUTH_URL}/signup`;

    const bodyData = isLogin
      ? { email, password }
      : { name, email, password };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });

      const data = await res.json();

      // Check for success status (Res 200 or 201)
      if (res.ok) {
        alert(data.message || "Success");

        // LOGIN SUCCESS logic
        if (isLogin && data.token) {
          // 1. Save user info (JSON string-ah mathi store pannanum)
          localStorage.setItem("user", JSON.stringify(data.user));

          // 2. Save token (Cart functionality-ku ithu thaan romba mukkiyam)
          localStorage.setItem("token", data.token);

          // 3. Redirect to Home
          window.location.href = "/";
        } else {
          // Signup success aanathum login page-ku mathuvaum
          setIsLogin(true);
        }
      } else {
        alert(data.message || "Something went wrong!");
      }

      // Reset form fields
      setName("");
      setEmail("");
      setPassword("");

    } catch (error) {
      console.log("Auth Error:", error);
      alert("Server error. Please check your connection.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        <p className="toggle-text">
          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}
          <span onClick={() => setIsLogin(!isLogin)} style={{ cursor: "pointer", color: "#007bff" }}>
            {isLogin ? " Sign Up" : " Login"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Auth;
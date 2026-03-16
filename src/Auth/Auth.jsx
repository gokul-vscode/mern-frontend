import React, { useState } from "react";
import "./Auth.css";

function Auth() {

  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    const url = isLogin
      ? "http://localhost:5000/api/auth/login"
      : "http://localhost:5000/api/auth/signup";

    const bodyData = isLogin
      ? { email, password }
      : { name, email, password };

    try {

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bodyData)
      });

      const data = await res.json();

      alert(data.message || "Success");

      // LOGIN SUCCESS
      if (isLogin && data.user) {

        // ✅ Save user
        localStorage.setItem("user", JSON.stringify(data.user));

        // ✅ Save token (IMPORTANT for cart)
        localStorage.setItem("token", data.token);
        localStorage.setItem("token", data.token);   // ADD THIS

        window.location.href = "/";
      }

      setName("");
      setEmail("");
      setPassword("");

    } catch (error) {

      console.log(error);
      alert("Server error");

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

          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? " Sign Up" : " Login"}
          </span>

        </p>

      </div>

    </div>

  );

}

export default Auth;
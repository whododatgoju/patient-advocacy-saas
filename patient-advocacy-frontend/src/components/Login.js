// src/components/Login.js
import React, { useState } from "react";
import { loginUser, registerUser } from "../firebaseAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await loginUser(email, password);
      alert("Successfully logged in!");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleRegister = async () => {
    try {
      await registerUser(email, password);
      alert("User registered!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Login or Register</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br /><br />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Login;

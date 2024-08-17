import React from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
export default function HomePage() {
  return (
    <div className="home-container">
      <img src={Logo} className="home-logo"></img>
      <h1 className="home-title">Welcome to the Cryptography System</h1>
      <p className="home-description">
        Select a cipher to encode or decode your messages.
      </p>
      <Link to="/ciphers">
        <button className="home-button">Go to Cipher Selection</button>
      </Link>
    </div>
  );
}

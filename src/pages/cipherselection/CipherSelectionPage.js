import React from "react";
import { Link } from "react-router-dom";
import './CipherSelectionPage.css'; 
import Logo from "../../assets/images/logo.png";

export default function CipherSelectionPage() {
  const ciphers = [
    { name: "Ceasar Cipher", path: "/result?cipher=ceasar" },
    { name: "Vigenere Cipher", path: "/result?cipher=vigenere" },
    { name: "RSA Cipher", path: "/result?cipher=rsa" },
  ];

  return (
    <div className="cipher-container">
      <img src={Logo} alt="Logo" className="cipher-logo" />
      <h1 className="cipher-title">Select a Cipher</h1>
      <ul className="cipher-list">
        {ciphers.map((cipher, index) => (
          <li key={index} className="cipher-item">
            <Link to={cipher.path}>
              <button className="cipher-button">{cipher.name}</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
